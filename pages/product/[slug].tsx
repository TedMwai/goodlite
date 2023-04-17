import Accordion from "@/components/Accordion";
import Cart from "@/components/Cart";
import HtmlContent from "@/components/Description";
import MobileNav from "@/components/MobileNav";
import { useShop } from "@/context/context";
import prisma from "@/lib/prisma";
import { Cart as CartType, Product } from "@/types/types";
import { myFetch } from "@/util/fetch";
import { AnimatePresence } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoHeartOutline as Heart } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

interface Props {
  product: Product;
  similarProducts: Product[];
}
interface Params extends ParsedUrlQuery {
  slug: string | string[];
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Item = ({ product, similarProducts }: Props) => {
  const { cartOpen, setCartOpen, sideNav, setCart } = useShop();
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOpenCart = () => {
    setCartOpen(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.classList.add("overflow-y-hidden");
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const addToCart = async () => {
    try {
      const res = await myFetch("/api/cart/addToCart", {
        method: "POST",
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      const cartItems: CartType = await res.json();
      setCart(cartItems);
      handleOpenCart();
    } catch (error: unknown) {
      console.log("Unable to add product to cart", error);
    }
  };

  return (
    <div className={montserrat.className}>
      <AnimatePresence>
        {cartOpen && <Cart />}
        {sideNav && <MobileNav />}
      </AnimatePresence>
      <section className="bg-white">
        <div className="px-5 py-8 mx-auto md:px-12 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
            <div className="gap-12 lg:inline-flex">
              <div className="max-w-xl md:max-w-full lg:max-w-xl text-left">
                <div>
                  <p className="text-2xl font-medium tracking-tighter text-black sm:text-4xl">
                    {product.name}
                  </p>
                  <div className="flex gap-12">
                    <p
                      className={`mt-4 text-base tracking-tight text-gray-600 ${
                        product.discountId !== null && "line-through"
                      }`}
                    >
                      Ksh {product.price}
                    </p>
                    {product.discountId &&
                      product?.discount?.discount !== null && (
                        <p className="mt-4 text-base tracking-tight text-gray-600">
                          Ksh {product?.discount?.discount}
                        </p>
                      )}
                  </div>
                  <HtmlContent html={product.description} />
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="flex py-4 justify-center items-center border-2 mt-4 w-full md:w-auto md:basis-[15%] lg:basis-[30%] lg:gap-2">
                    <button
                      className="text-lg lg:text-xl cursor-pointer"
                      onClick={handleDecrement}
                    >
                      <FiMinus />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleInputChange}
                      className="border-0 outline-0 p-0 min-w-[30px] max-h-[24px] w-[20%] text-center"
                      min="1"
                    />
                    <button
                      className="text-lg lg:text-xl cursor-pointer"
                      onClick={handleIncrement}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button
                    className="mt-4 w-full md:w-3/5 text-white bg-black py-4 cursor-pointer hover:bg-[#1a1918] md:basis-[85%] lg:basis-[70%]"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="md:py-4 md:mt-4 w-full md:w-auto md:basis-[15%] lg:basis-[30%]"></div>
                  <div className="flex justify-center items-center gap-4 mt-4 w-full md:w-3/5 text-black bg-gray-200 py-4 cursor-pointer hover:bg-[#c5c5c5] md:basis-[85%] lg:basis-[70%]">
                    <span>
                      <Heart className="text-black align-middle" />
                    </span>
                    <button>Add To Wishlist</button>
                  </div>
                </div>
                <div className="mt-4">
                  <Accordion title="Shipping">
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                  </Accordion>
                  <Accordion title="Return Policy">
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="order-first block w-full mt-12 aspect-square lg:mt-0 lg:order-first">
              <Image
                src={product.coverImage}
                alt="hero"
                height={800}
                width={800}
              />
              <div className="hidden md:mt-8 md:flex md:items-center md:gap-8 md:justify-center">
                {product.images.length > 0 &&
                  product.images.map((image) => (
                    <div key={uuidv4()}>
                      <Image
                        src={image.image}
                        alt="image"
                        height={100}
                        width={100}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-xl">Related Products</h1>
            <div className="flex md:block md:overflow-hidden overflow-x-scroll scrollbar mt-8 mx-auto">
              <div className="flex-shrink-0">
                <div className="max-w-full flex gap-6 md:grid md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-4">
                  {similarProducts.length > 0 &&
                    similarProducts.map((product) => (
                      <div className="cursor-pointer" key={uuidv4()}>
                        <div className="relative w-44 h-4w-44 md:w-56 md:h-56 xl:w-64 xl:h-64 aspect-square overflow-hidden">
                          <Image
                            src={product.coverImage}
                            alt="hero"
                            fill={true}
                            className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                          />
                        </div>
                        <div>
                          <Link
                            className="w-fit border-a-expand text-base pt-2 pb-1"
                            href={`/product/${product.productSlug}`}
                          >
                            {product.name}
                          </Link>
                          <div className="flex gap-4 mt-2">
                            <h3
                              className={`text-gray-500 ${
                                product.discountId && "line-through"
                              }`}
                            >
                              Ksh {product.price}
                            </h3>
                            {product.discountId &&
                              product?.discount?.discount !== null && (
                                <h3 className="text-gray-500">
                                  Ksh {product?.discount?.discount}
                                </h3>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Item;

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;
  const product = await prisma.products.findUnique({
    where: {
      productSlug: slug as string,
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
  });
  const similarProducts = await prisma.products.findMany({
    where: {
      categoryId: product?.categoryId,
      id: {
        not: product?.id,
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
    take: 4,
  });
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      similarProducts: JSON.parse(JSON.stringify(similarProducts)),
    },
    revalidate: 60, // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all the products
  const products = await prisma.products.findMany({
    select: {
      productSlug: true,
    }
  });
  // Map the category IDs to their corresponding paths
  const paths = products.map((product) => ({
    params: {
      slug: product.productSlug,
    },
  }));

  return {
    paths,
    fallback: "blocking", // Set fallback to 'blocking' for ISR
  };
};
