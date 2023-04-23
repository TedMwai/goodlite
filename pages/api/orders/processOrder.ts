import type { NextApiRequest, NextApiResponse } from "next";
import { resultBody } from "@/types/types";
import prisma from "@/lib/prisma";
import { PAYMENT_STATUS, ORDER_STATUS } from "@prisma/client";
const AWS = require("aws-sdk");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formatedDate = (inputDate: any) => {
      const date = new Date(inputDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      return date;
    };
    if (req.method !== "POST") return res.status(405).end("Method not allowed");
    const requestBody: resultBody = req.body;
    const totalPaid =
      requestBody.Body.stkCallback.CallbackMetadata.Item[0].Value;
    if (requestBody.Body.stkCallback.ResultCode !== 0) {
      await prisma.orderDetails.update({
        where: {
          checkoutRequestID: requestBody.Body.stkCallback.CheckoutRequestID,
        },
        data: {
          paymentStatus: PAYMENT_STATUS.FAILED,
          orderStatus: ORDER_STATUS.CANCELLED,
        },
      });
      return res.status(200).json({ msg: "Payment failed" });
    }
    const order = await prisma.orderDetails.update({
      where: {
        checkoutRequestID: requestBody.Body.stkCallback.CheckoutRequestID,
      },
      data: {
        total: requestBody.Body.stkCallback.CallbackMetadata.Item[0].Value,
        paymentId: requestBody.Body.stkCallback.CallbackMetadata.Item[1].Value,
        paymentStatus: PAYMENT_STATUS.SUCCESS,
        orderStatus: ORDER_STATUS.PROCESSING,
        phone: requestBody.Body.stkCallback.CallbackMetadata.Item[3].Value,
      },
      include: {
        user: {
          include: {
            addresses: true,
          },
        },
        orderItems: {
          include: {
            product: {
              include: {
                discount: {
                  select: {
                    discount: true,
                  },
                },
              },
            },
          },
        },
        region: {
          select: {
            amount: true,
          },
        },
      },
    });
    res.status(200).json({ msg: "Payment successful" });
    const subTotal = order.orderItems.map((item) => {
      return item.product.discount
        ? item.product.discount.discount * item.quantity
        : item.product.price * item.quantity;
    });
    const subTotalSum = subTotal.reduce((a, b) => a + b, 0);

    // get the order date
    const orderDate = formatedDate(order.createdAt);
    // create a delivery date which is 2 days from the order date
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    const deliveryDateString = formatedDate(deliveryDate);

    const fullName = `${order.user.addresses[0].firstName} ${order.user.addresses[0].lastName}`;

    // Configure AWS SDK
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "eu-north-1",
    });

    // Create sendTemplatedEmail params
    const params = {
      Destination: {
        /* required */
        CcAddresses: [
          order.user.email,
          /* more items */
        ],
        ToAddresses: [
          order.user.email,
          /* more items */
        ],
      },
      Source: "actuallym33@gmail.com" /* required */,
      Template: "goodlite-order" /* required */,
      TemplateData: JSON.stringify({
        baseUrl: process.env.CURRENT_BASE_URL,
        profileIcon:
          "https://res.cloudinary.com/dilzw0uzs/image/upload/v1682176145/Profile_gwfzlp.svg",
        cartIcon:
          "https://res.cloudinary.com/dilzw0uzs/image/upload/v1682176145/Cart_ejn3zl.svg",
        wishlistIcon:
          "https://res.cloudinary.com/dilzw0uzs/image/upload/v1682176145/wishlist_uyznkh.svg",
        checkmark:
          "https://res.cloudinary.com/dilzw0uzs/image/upload/v1682176167/icons8-checkmark_kgssku.svg",
        orderDate: orderDate,
        deliveryDate: deliveryDateString,
        orderNumber: order.id,
        orderItems: order.orderItems.map((item) => {
          return {
            name: item.product.name,
            image: item.product.coverImage,
            quantity: item.quantity,
            price: item.product.discount
              ? item.product.discount.discount
              : item.product.price,
          };
        }),
        subtotal: subTotalSum,
        shipping: order.region.amount,
        total: totalPaid,
        name: fullName,
        apartment: order.user.addresses[0].apartment,
        address: order.user.addresses[0].address,
        city: order.user.addresses[0].city,
      }) /* required */,
      ReplyToAddresses: ["actuallym33@gmail.com"],
    };
    // Create the promise and SES service object
    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendTemplatedEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function (data: any) {
        console.log(data.MessageId);
      })
      .catch((err: any) => {
        console.error(err, err.stack);
      });

    // Delete the user's cart items
    await prisma.cart.deleteMany({
      where: {
        userId: order.userId,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
