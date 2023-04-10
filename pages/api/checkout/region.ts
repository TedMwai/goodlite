import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getUser from "../user/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = JSON.parse(req.body);
  try {
    const region = await prisma.region.findUnique({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ shippingRegion: region?.name, shippingPrice: region?.amount });
  } catch (error: unknown) {
    res.status(500).json({ error });
  }
}
