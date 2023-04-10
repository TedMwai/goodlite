import prisma from "@/lib/prisma";
import { Addresses } from "@prisma/client";
import base64 from "base-64";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import getUser from "../user/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data } = JSON.parse(req.body);
    try {
      const user = await getUser(req, res);
      // store address in cookie if user is not logged in
      if (!user) {
        const address: Addresses = {
          id: uuidv4(),
          userId: uuidv4(),
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          apartment: data.apartment,
          city: data.town,
          postalCode: data.postCode ? data.postCode : null,
          phone: data.phone,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const encodedAddress = base64.encode(JSON.stringify(address));
        const cookie = serialize("address", encodedAddress, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          encode: (encoded) => encodeURIComponent(encoded),
        });
        return res
          .status(200)
          .setHeader("Set-Cookie", cookie)
          .json({ address });
      }
      // Check if user has an address
      const hasAddress = await prisma.addresses.findFirst({
        where: {
          userId: user?.id!,
        },
      });
      // If user has an address, update it
      if (hasAddress) {
        const address = await prisma.addresses.update({
          where: {
            id: hasAddress.id,
          },
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            apartment: data.apartment,
            city: data.town,
            postalCode: data.postCode ? data.postCode : null,
            phone: data.phone,
          },
        });
        return res.status(200).json({ address });
      }
      // If user doesn't have an address, create one
      const address = await prisma.addresses.create({
        data: {
          userId: user?.id!,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          apartment: data.apartment,
          city: data.town,
          postalCode: data.postCode ? data.postCode : null,
          phone: data.phone,
        },
      });
      return res.status(200).json({ address });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
