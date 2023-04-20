import type { NextApiRequest, NextApiResponse } from "next";
import { resultBody } from "@/types/types";
import prisma from "@/lib/prisma";
import { PAYMENT_STATUS, ORDER_STATUS } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  if (req.method !== "POST") return res.status(405).end("Method not allowed");
  const requestBody: resultBody = req.body;
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
  await prisma.orderDetails.update({
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
  });
  return res.status(200).json({ msg: "Payment successful" });
}
