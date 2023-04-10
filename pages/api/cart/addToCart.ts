import prisma from "@/lib/prisma";
import { Cart } from "@/types/types";
import base64 from "base-64";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import getUser from "../user/getUser";

type Product = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  coverImage: string;
  discount: {
    discount: number;
  } | null;
};

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  userId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");
  try {
    const { productId, quantity } = JSON.parse(req.body);
    // check if user is authenticated
    const user = await getUser(req, res);
    if (!user) {
      const product = await prisma.products.findUnique({
        where: {
          id: productId,
        },
        select: {
          id: true,
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
      });
      const decodedCart = req.cookies.cart
        ? decodeURIComponent(base64.decode(req.cookies.cart))
        : null;
      const cartData: Cart = decodedCart ? JSON.parse(decodedCart) : [];
      const existingCartItem = cartData.find(
        (item) => item.product.name === product?.name
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        const cartItem: CartItem = {
          id: uuidv4(),
          product: product as Product,
          quantity,
          userId: "guest",
        };
        cartData.push(cartItem);
      }

      const encodedCartData = base64.encode(JSON.stringify(cartData));
      const cookie = serialize("cart", encodedCartData, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        secure: process.env.NODE_ENV === "production",
        encode: (encoded) => encodeURIComponent(encoded),
      });
      return res.status(200).setHeader("Set-Cookie", cookie).json(cartData);
    }
    // check if product exists in the cart and if it does update the quantity
    const cartItem = await prisma.cart.findFirst({
      where: {
        productId,
        userId: user.id,
      },
    });
    if (cartItem) {
      await prisma.cart.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + quantity,
        },
      });
    } else {
      // if product doesn't exist in the cart, create it
      await prisma.cart.create({
        data: {
          userId: user?.id,
          productId,
          quantity,
        },
      });
    }
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
    return res.status(500).json({ error });
  }
}
