import Cart from "@/components/Cart";
import HtmlContent from "@/components/Description";
import MobileNav from "@/components/MobileNav";
import { useShop } from "@/context/context";
import prisma from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import {
  Addresses,
  Discount,
  OrderDetails,
  OrderItems,
  Region,
  User,
} from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

type Order = OrderDetails & {
  region: Region;
  user: User & {
    addresses: Addresses[];
  };
  orderItems: (OrderItems & {
    product: {
      name: string;
      coverImage: string;
      price: number;
      description: string;
      discount: Discount | null;
      productSlug: string;
    };
  })[];
};

type Props = {
  order: Order;
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const IndividualOrderDetails = ({ order }: Props) => {
  const { cartOpen, sideNav } = useShop();

  const date = (inputDate: any) => {
    const date = new Date(inputDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return date;
  };

  const getTotal = () => {
    let total = 0;
    order.orderItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };
  const total = getTotal();
  const getDiscount = () => {
    let discount = 0;
    order.orderItems.forEach((item) => {
      if (item.product.discount) {
        let discountedPrice =
          (item.product.price - item.product.discount.discount) * item.quantity;
        discount += discountedPrice;
      }
    });
    return discount;
  };
  const discount = getDiscount();
  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-12">
        <main className={montserrat.className}>
          <AnimatePresence>
            {cartOpen && <Cart />}
            {sideNav && <MobileNav />}
          </AnimatePresence>
          <div>
            <div className="max-w-4xl mx-auto">
              <div className="max-w-xl">
                <h1 className="font-semibold uppercase tracking-wide text-indigo-600">
                  Thank you!
                </h1>
                <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  It&apos;s on the way!
                </p>
                <p className="mt-2">
                  Your order #
                  <span className="font-semibold border-a-expand">
                    {order.id}
                  </span>{" "}
                  is being processed and will be with you soon.
                </p>
                <dl className="mt-6 font-medium">
                  <dt className="text-gray-900">Date placed:</dt>
                  <dd className="text-indigo-600 mt-2">
                    {date(order.createdAt)}
                  </dd>
                </dl>
              </div>
              <section
                aria-labelledby="order-heading"
                className="mt-10 border-t border-gray-400"
              >
                {order.orderItems.map((product) => (
                  <div
                    key={product.id}
                    className="py-10 border-b border-gray-300 flex gap-8"
                  >
                    <div>
                      <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-48 lg:h-48 xl:w-44 xl:h-44 aspect-square overflow-hidden">
                        <Image
                          src={product.product.coverImage}
                          alt={product.product.name}
                          fill={true}
                          className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="flex-auto flex flex-col">
                      <div>
                        <Link
                          href={`/product/${product.product.productSlug}`}
                          className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                        >
                          {product.product.name}
                        </Link>
                        <div className="text-sm">
                          <HtmlContent html={product.product.description} />
                        </div>
                      </div>
                      <div className="flex-1 flex items-end">
                        <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                          <div className="flex">
                            <dt className="font-medium text-gray-900">
                              Quantity
                            </dt>
                            <dd className="ml-2 text-gray-700">
                              {product.quantity}
                            </dd>
                          </div>
                          <div className="pl-4 flex sm:pl-6">
                            <dt className="font-medium text-gray-900">Price</dt>
                            <dd className="ml-2 text-gray-700">
                              Ksh. {product.product.price * product.quantity}.00
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="sm:ml-40 sm:pl-6">
                  <h3 className="sr-only">Your information</h3>
                  <h4 className="sr-only">Addresses</h4>
                  <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
                    <div>
                      <dt className="font-medium text-gray-900">
                        Shipping address
                      </dt>
                      <dd className="mt-2 text-gray-700">
                        <address className="not-italic">
                          <span className="block">
                            {order.user.addresses[0].firstName}{" "}
                            {order.user.addresses[0].lastName}
                          </span>
                          <span className="block">
                            {order.user.addresses[0].apartment},{" "}
                            {order.user.addresses[0].address}
                          </span>
                          <span className="block">
                            {order.user.addresses[0].city}
                          </span>
                        </address>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">
                        Billing address
                      </dt>
                      <dd className="mt-2 text-gray-700">
                        <address className="not-italic">
                          <span className="block">{order.region.name}</span>
                        </address>
                      </dd>
                    </div>
                  </dl>
                  <h4 className="sr-only">Payment</h4>
                  <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
                    <div>
                      <dt className="font-medium text-gray-900">
                        Payment method
                      </dt>
                      <dd className="mt-2 text-gray-700">
                        <p>M-PESA</p>
                        <p>Phone Number</p>
                        <p>
                          <span aria-hidden="true">•••• </span>
                          <span className="sr-only">Ending in </span>5010
                        </p>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">
                        Shipping method
                      </dt>
                      <dd className="mt-2 text-gray-700">
                        <p>Takes up to 3 working days</p>
                      </dd>
                    </div>
                  </dl>
                  <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-900">Subtotal</dt>
                      <dd className="text-gray-700">Ksh {total}.00</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="flex font-medium text-gray-900">
                        Discount
                      </dt>
                      <dd className="text-gray-700">-Ksh {discount}.00</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-900">Shipping</dt>
                      <dd className="text-gray-700">
                        Ksh {order.region.amount}.00
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-900">Total</dt>
                      <dd className="text-gray-900">Ksh {order.total}.00</dd>
                    </div>
                  </dl>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default IndividualOrderDetails;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as ParsedUrlQuery;
  const session = await getSession(ctx.req, ctx.res);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
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
  const order = await prisma.orderDetails.findUnique({
    where: {
      id: id as string,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              coverImage: true,
              name: true,
              productSlug: true,
              price: true,
              description: true,
              discount: true,
            },
          },
        },
      },
      region: true,
      user: {
        include: {
          addresses: true,
        },
      },
    },
  });
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};
