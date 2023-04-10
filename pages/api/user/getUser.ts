import prisma from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);
  if (!session) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      email: true,
    },
  });
  return user;
}
