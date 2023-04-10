import prisma from "@/lib/prisma";
import { Cart } from "@/types/types";
import base64 from "base-64";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import getUser from "../user/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return res.status(405).end("Method not allowed");
  try {
    const { id, productId } = JSON.parse(req.body);
    // delete the cart item
    const user = await getUser(req, res);
    if (!user) {
      const decodedCart = req.cookies.cart
        ? decodeURIComponent(base64.decode(req.cookies.cart))
        : null;
      const cartData: Cart = decodedCart ? JSON.parse(decodedCart) : [];
      const updatedCart = cartData.filter(
        (item) => item.product.id !== productId
      );
      const encodedCartData = base64.encode(JSON.stringify(updatedCart));
      const cookie = serialize("cart", encodedCartData, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        secure: process.env.NODE_ENV === "production",
        encode: (encoded) => encodeURIComponent(encoded),
      });
      return res.status(200).setHeader("Set-Cookie", cookie).json(updatedCart);
    }
    const cartItem = await prisma.cart.findFirst({
      where: {
        id,
        AND: {
          userId: user?.id,
        },
      },
    });
    await prisma.cart.delete({
      where: {
        id: cartItem?.id,
      },
    });
    // return the updated cart
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
    console.log(error);
    return res.status(500).json({ error });
  }
}
