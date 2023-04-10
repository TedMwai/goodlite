import prisma from "@/lib/prisma";
import { Cart } from "@/types/types";
import base64 from "base-64";
import { PAYMENT_STATUS } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import getUser from "../user/getUser";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }
  try {
    const user = await getUser(req, res);
    const { checkoutRequestID, userID } = JSON.parse(req.body);
    if (!checkoutRequestID || !userID) {
      return res
        .status(400)
        .json({ error: "checkoutRequestID and userID are required" });
    }
    const order = await prisma.orderDetails.findFirst({
      where: {
        checkoutRequestID,
        userId: userID,
      },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.paymentStatus === PAYMENT_STATUS.SUCCESS) {
      if (!user) {
        // get the cart from the cookie
        const decodedCart = req.cookies.cart
          ? decodeURIComponent(base64.decode(req.cookies.cart))
          : null;
        const cartData: Cart = decodedCart ? JSON.parse(decodedCart) : [];
        // add the cart items to the order items table
        await Promise.all(
          cartData.map(async (item) => {
            return await prisma.orderItems.create({
              data: {
                orderId: order.id,
                productId: item.product.id,
                quantity: item.quantity,
              },
            });
          })
        );
        // encode an empty string
        const encodedCartData = base64.encode("");
        // delete the cart cookie
        const cookie = serialize("cart", encodedCartData, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          maxAge: -1,
          secure: process.env.NODE_ENV === "production",
          encode: (encoded) => encodeURIComponent(encoded),
        });
        return res
          .status(200)
          .setHeader("Set-Cookie", cookie)
          .json({ msg: "Payment successful" });
      }
      const cart = await prisma.cart.deleteMany({
        where: {
          userId: userID,
        },
      });
      return res.status(200).json({ msg: "Payment successful", cart });
    } else if (order.paymentStatus === PAYMENT_STATUS.FAILED) {
      return res.status(200).json({ msg: "Payment failed" });
    } else {
      return res.status(200).json({ msg: "Payment pending" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
