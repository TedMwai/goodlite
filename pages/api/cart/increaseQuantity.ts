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
  if (req.method !== "PUT") return res.status(405).end("Method not allowed");
  try {
    const { id, productId } = JSON.parse(req.body);
    // check if user is authenticated
    const user = await getUser(req, res);
    if (!user) {
      const decodedCart = req.cookies.cart
        ? decodeURIComponent(base64.decode(req.cookies.cart))
        : null;
      const cartData: Cart = decodedCart ? JSON.parse(decodedCart) : [];
      const existingCartItem = cartData.find(
        (item) => item.product.id === productId
      );
      if (existingCartItem) {
        const updatedCart = cartData.map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        const encodedCartData = base64.encode(JSON.stringify(updatedCart));
        const cookie = serialize("cart", encodedCartData, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          secure: process.env.NODE_ENV === "production",
          encode: (encoded) => encodeURIComponent(encoded),
        });
        return res
          .status(200)
          .setHeader("Set-Cookie", cookie)
          .json(updatedCart);
      }
    }
    const cartItem = await prisma.cart.findUnique({
      where: {
        id,
      },
    });
    // update the cart item
    await prisma.cart.update({
      where: {
        id,
      },
      data: {
        quantity: cartItem?.quantity! + 1,
      },
    });
    // get the updated cart
    const cart = await prisma.cart.findMany({
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
    // return the updated cart
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
