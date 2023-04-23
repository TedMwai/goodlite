import { accessToken, mpesaQuery } from "@/types/types";
import { myFetch } from "@/util/fetch";
import base64 from "base-64";
import { format } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      res.status(200).json({ message: "Payment successful" });
    } else {
      res.status(500).json({ message: "Payment failed" });
    }
    res.status(200).json({ name: "John Doe" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
