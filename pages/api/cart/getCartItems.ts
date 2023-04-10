import prisma from "@/lib/prisma";
import { Cart } from "@/types/types";
import base64 from "base-64";
import type { NextApiRequest, NextApiResponse } from "next";
import getUser from "../user/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end("Method not allowed");
  try {
    const user = await getUser(req, res);
    if (!user) {
      const decodedCart = req.cookies.cart
        ? decodeURIComponent(base64.decode(req.cookies.cart))
        : null;
      const cartData: Cart = decodedCart ? JSON.parse(decodedCart) : [];
      return res.status(200).json(cartData);
    }
    const cartItems = await prisma.cart.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        id: true,
        quantity: true,
        userId: true,
        product: {
          select: {
            name: true,
            categoryId: true,
            price: true,
            coverImage: true,
            discount: {
              select: {
                discount: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
