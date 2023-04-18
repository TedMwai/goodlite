import Cart from "@/components/Cart";
import HtmlContent from "@/components/Description";
import MobileNav from "@/components/MobileNav";
import { useShop } from "@/context/context";
import prisma from "@/lib/prisma";
import { Cart as CartType, Orders as OrderDetails } from "@/types/types";
import { myFetch } from "@/util/fetch";
import { getSession } from "@auth0/nextjs-auth0";
import { Menu, Transition } from "@headlessui/react";
import { PAYMENT_STATUS, ORDER_STATUS } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  HiCheckBadge as CheckCircleIcon,
  HiEllipsisVertical as DotsVerticalIcon,
} from "react-icons/hi2";

type Props = {
  orders: OrderDetails;
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ orders }: Props) {
  const { cartOpen, sideNav, setCart, setCartOpen } = useShop();

  const date = (inputDate: any) => {
    const date = new Date(inputDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return date;
  };

  const handleOpenCart = () => {
    setCartOpen(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.classList.add("overflow-y-hidden");
    }
  };

  const addToCart = async (id: number) => {
    try {
      const res = await myFetch("/api/cart/addToCart", {
        method: "POST",
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });
      const cartItems: CartType = await res.json();
      setCart(cartItems);
      handleOpenCart();
    } catch (error: unknown) {
      console.log("Unable to add product to cart", error);
    }
  };

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
          <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
            <div className="max-w-2xl mx-auto text-center px-4 lg:max-w-4xl lg:px-0">
              <h1 className="text-5xl font-medium tracking-tight">
                Order history
              </h1>
              <p className="mt-2">
                Check the status of recent orders, manage returns, and discover
                similar products.
              </p>
            </div>
          </div>
          <section aria-labelledby="recent-heading" className="mt-16">
            <h2 id="recent-heading" className="sr-only">
              Recent orders
            </h2>
            <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
              <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border-t border-b shadow-sm sm:rounded-lg sm:border"
                  >
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={date(order.createdAt)}>
                        {date(order.createdAt)}
                      </time>
                    </h3>
                    <div className="flex items-center p-4 border-b sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6 bg-gray-100">
                      <dl className="flex-1 grid grid-cols-2 gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div className="max-w-full">
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="mt-1 text-gray-500 break-all">
                            {order.id}
                          </dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            <time dateTime={date(order.createdAt)}>
                              {date(order.createdAt)}
                            </time>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Total amount
                          </dt>
                          <dd className="mt-1 font-medium text-gray-900">
                            {order.total}
                          </dd>
                        </div>
                      </dl>
                      <Menu
                        as="div"
                        className="relative flex justify-end lg:hidden"
                      >
                        <div className="flex items-center">
                          <Menu.Button className="-m-2 p-2 flex items-center text-gray-400 hover:text-gray-500">
                            <span className="sr-only">
                              Options for order {order.id}
                            </span>
                            <DotsVerticalIcon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-bottom-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href={order.id}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    View
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href={order.id}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Invoice
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                        <Link
                          href={`orders/${order.id}`}
                          className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span>View Order</span>
                          <span className="sr-only">{order.id}</span>
                        </Link>
                        <a
                          href={order.id}
                          className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span>View Invoice</span>
                          <span className="sr-only">for order {order.id}</span>
                        </a>
                      </div>
                    </div>
                    {/* Products */}
                    <h4 className="sr-only">Items</h4>
                    <ul role="list" className="divide-y divide-gray-200">
                      {order.orderItems.map((product) => (
                        <li key={product.id} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-48 lg:h-48 xl:w-44 xl:h-44 aspect-square overflow-hidden">
                              <Image
                                src={product.product.coverImage}
                                alt={product.product.name}
                                fill={true}
                                className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                              />
                            </div>
                            <div className="flex-1 ml-6 text-sm">
                              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                <h5>{product.product.name}</h5>
                                <p className="mt-2 sm:mt-0">
                                  Ksh{" "}
                                  {product.product.discount !== null
                                    ? product.product.discount.discount
                                    : product.product.price}
                                  .00
                                </p>
                              </div>
                              <HtmlContent html={product.product.description} />
                            </div>
                          </div>
                          <div className="mt-6 sm:flex sm:justify-between">
                            <div className="flex items-center">
                              <CheckCircleIcon
                                className="w-5 h-5 text-green-500"
                                aria-hidden="true"
                              />
                              {order.orderStatus === ORDER_STATUS.DELIVERED ? (
                                <p className="ml-2 text-sm font-medium text-gray-500">
                                  Delivered on{" "}
                                  <time dateTime={date(order.updatedAt)}>
                                    {date(order.updatedAt)}
                                  </time>
                                </p>
                              ) : (
                                <p className="ml-2 text-sm font-medium text-gray-500">
                                  Order placed on{" "}
                                  <time dateTime={date(order.createdAt)}>
                                    {date(order.createdAt)}
                                  </time>
                                </p>
                              )}
                            </div>
                            <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                              <div className="flex-1 flex justify-center">
                                <Link
                                  href={`/product/${product.product.productSlug}`}
                                  className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                >
                                  View product
                                </Link>
                              </div>
                              <div className="flex-1 pl-4 flex justify-center">
                                <button
                                  className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                  onClick={() => addToCart(product.productId)}
                                >
                                  Buy again
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
  //   get orders from db that are associated with user
  const orders = await prisma.orderDetails.findMany({
    where: {
      userId: user!.id,
      AND: {
        paymentStatus: PAYMENT_STATUS.SUCCESS,
      },
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
      user: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
};
