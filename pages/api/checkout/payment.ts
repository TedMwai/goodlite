import prisma from "@/lib/prisma";
import { accessToken, responseBody } from "@/types/types";
import { ResponseError, myFetch } from "@/util/fetch";
import base64 from "base-64";
import { format } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import getUser from "../user/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");
  const { phone, total, regionId } = JSON.parse(req.body);
  const headers = `Basic ${base64.encode(
    process.env.MPESA_CONSUMER_KEY! + ":" + process.env.MPESA_CONSUMER_SECRET!
  )}`;
  const timeStamp = format(new Date(), "yyyyMMddhhmmss");
  try {
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
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: parseInt(phone),
      PartyB: 174379,
      PhoneNumber: parseInt(phone),
      CallBackURL:
        `${process.env.SAFARICOM_CALLBACK_URL}/api/orders/processOrder`,
      AccountReference: "Goodlite",
      TransactionDesc: "Testing M-Pesa",
    };
    try {
      const user = await getUser(req, res);
      const response2 = await myFetch(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.access_token}`,
          },
          body: JSON.stringify(body),
        }
      );
      const data2: responseBody = await response2.json();
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            name: "Guest",
          },
        });
        const newOrder = await prisma.orderDetails.create({
          data: {
            userId: newUser.id,
            total,
            paymentId: "Mpesa",
            regionId,
            checkoutRequestID: data2.CheckoutRequestID,
            phone: parseInt(phone),
          },
        });
        return res.status(200).json({
          userID: newUser.id,
          checkoutRequestID: newOrder.checkoutRequestID,
        });
      }
      const newOrder = await prisma.orderDetails.create({
        data: {
          userId: user.id,
          total,
          paymentId: "Mpesa",
          regionId,
          checkoutRequestID: data2.CheckoutRequestID,
          phone: parseInt(phone),
        },
      });
      const cartItems = await prisma.cart.findMany({
        where: {
          userId: user.id,
        },
      });
      const orderItems = cartItems.map((item) => {
        return {
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        };
      });
      await prisma.orderItems.createMany({
        data: orderItems,
      });
      return res.status(200).json({
        userID: user.id,
        checkoutRequestID: newOrder.checkoutRequestID,
      });
    } catch (error: unknown) {
      if (error instanceof ResponseError) {
        switch (error.response.status) {
          case 400:
            return res.status(400).json({ error });
          case 401:
            return res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        // This is a real error, not a ResponseError
        return res.status(500).json({ error: "An unknown error occured" });
      }
    }
  } catch (err: unknown) {
    if (err instanceof ResponseError) {
      switch (err.response.status) {
        case 400:
          return res.status(400).json({ error: "Bad request" });
        case 401:
          return res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      // This is a real error, not a ResponseError
      return res.status(500).json({ error: "An unknown error occured" });
    }
  }
}
