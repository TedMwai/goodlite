import prisma from "@/lib/prisma";
import { accessToken, mpesaQuery } from "@/types/types";
import { myFetch } from "@/util/fetch";
import { ORDER_STATUS, PAYMENT_STATUS } from "@prisma/client";
import base64 from "base-64";
import { format } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
const AWS = require("aws-sdk");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formatedDate = (inputDate: any) => {
    const date = new Date(inputDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return date;
  };
  if (req.method !== "POST") return res.status(405).end("Method not allowed");
  try {
    const { checkoutRequestID } = JSON.parse(req.body);
    const headers = `Basic ${base64.encode(
      process.env.MPESA_CONSUMER_KEY! + ":" + process.env.MPESA_CONSUMER_SECRET!
    )}`;
    const timeStamp = format(new Date(), "yyyyMMddhhmmss");
    const response = await myFetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        method: "GET",
        headers: {
          Authorization: headers,
        },
      }
    );
    const data: accessToken = await response.json();
    const body = {
      BusinessShortCode: 174379,
      Password: base64.encode(`174379${process.env.MPESA_PASSKEY}${timeStamp}`),
      Timestamp: timeStamp,
      CheckoutRequestID: checkoutRequestID,
    };
    const response2 = await myFetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access_token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const data2: mpesaQuery = await response2.json();
    if (data2.ResponseCode === "0") {
      const order = await prisma.orderDetails.update({
        where: {
          checkoutRequestID: checkoutRequestID,
        },
        data: {
          paymentStatus: PAYMENT_STATUS.SUCCESS,
          orderStatus: ORDER_STATUS.PROCESSING,
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
      res.status(200).json({ message: "Payment successful" });
      const subTotal = order.orderItems.map((item) => {
        return item.product.discount
          ? item.product.discount.discount * item.quantity
          : item.product.price * item.quantity;
      });
      const subTotalSum = subTotal.reduce((a, b) => a + b, 0);
      const totalPaid =
        subTotal.reduce((a, b) => a + b, 0) + order.region.amount;

      // get the order date
      const orderDate = formatedDate(order.createdAt);
      // create a delivery date which is 2 days from the order date
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(deliveryDate.getDate() + 2);
      const deliveryDateString = formatedDate(deliveryDate);

      const fullName = `${order.user.addresses[0].firstName} ${order.user.addresses[0].lastName}`;

      // Configure AWS SDK
      AWS.config.update({
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
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

      await prisma.cart.deleteMany({
        where: {
          userId: order.userId,
        },
      });
    } else {
      await prisma.orderDetails.update({
        where: {
          checkoutRequestID: checkoutRequestID,
        },
        data: {
          paymentStatus: PAYMENT_STATUS.FAILED,
          orderStatus: ORDER_STATUS.CANCELLED,
        },
      });
      return res.status(500).json({ message: "Payment failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
