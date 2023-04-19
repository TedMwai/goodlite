import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");
  const { searchQuery } = JSON.parse(req.body);
  try {
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
      include: {
        images: {
          select: {
            image: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        discount: {
          select: {
            discount: true,
          },
        },
      },
      take: 5,
    });
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}
