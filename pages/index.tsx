import Cart from "@/components/Cart";
import MobileNav from "@/components/MobileNav";
import SearchComponent from "@/components/Search";
import { useShop } from "@/context/context";
import prisma from "@/lib/prisma";
import { Products } from "@/types/types";
import { AnimatePresence } from "framer-motion";
import { GetStaticProps } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  adidasProducts: Products;
  nikeProducts: Products;
  jordanProducts: Products;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home({
  adidasProducts,
  nikeProducts,
  jordanProducts,
}: Props) {
  const { cartOpen, sideNav, searchOpen } = useShop();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Goodlite</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className={montserrat.className}>
          <AnimatePresence>
            {cartOpen && <Cart />}
            {sideNav && <MobileNav />}
            {searchOpen && <SearchComponent />}
          </AnimatePresence>
          <div>
            <section className="bg-white">
              <div className="px-5 py-12 mx-auto md:px-12 lg:px-16">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                  <div className="gap-12 lg:inline-flex md:order-last lg:order-first">
                    <div className="max-w-xl md:max-w-full text-center lg:text-left">
                      <div>
                        <p className="text-2xl font-medium tracking-tighter sm:text-4xl text-[#123026]">
                          I am a short heading
                        </p>
                        <p className="max-w-xl md:max-w-full mt-4 text-base tracking-tight text-[#123026]">
                          Use this paragraph to share information about your
                          company or products. Make it engaging and interesting,
                          and showcase your brand&apos;s personality. Thanks for
                          visiting our website!
                        </p>
                      </div>
                      <button
                        className="flex mx-auto mt-4 p-4 border-2 border-[#123026] hover:text-white hover:bg-[#123026] transition duration-300 ease-in-out"
                        onClick={() => router.push("/category/adidas")}
                      >
                        View More
                      </button>
                      <div className="flex md:block md:overflow-hidden overflow-x-scroll scrollbar mt-8 mx-auto">
                        <div className="flex-shrink-0">
                          <div className="max-w-full flex gap-8 md:grid md:grid-cols-3 md:gap-8 lg:flex lg:overflow-x-scroll xl:overflow-hidden xl:grid-cols-3 xl:gap-8">
                            {adidasProducts.map((product) => (
                              <div className="cursor-pointer" key={product.id}>
                                <Link href={`/product/${product.productSlug}`}>
                                  <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-48 lg:h-48 xl:w-44 xl:h-44 aspect-square overflow-hidden">
                                    <Image
                                      src={product.coverImage}
                                      alt="hero"
                                      fill={true}
                                      className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                                    />
                                  </div>
                                </Link>
                                <div className="text-left">
                                  <Link
                                    className="w-fit border-a-expand text-base pt-2 pb-1 text-[#123026]"
                                    href={`/product/${product.productSlug}`}
                                  >
                                    {product.name}
                                  </Link>
                                  <div className="flex gap-4 mt-2">
                                    <h3
                                      className={`text-[#123026] ${
                                        product.discountId &&
                                        "line-through text-gray-500"
                                      }`}
                                    >
                                      Ksh {product.price}
                                    </h3>
                                    {product.discountId &&
                                      product?.discount?.discount !== null && (
                                        <h3 className="text-[#123026]">
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
                  <div className="order-first lg:mt-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                        alt="hero"
                        fill={true}
                        className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                        priority={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white">
              <div className="px-5 py-12 mx-auto md:px-12 lg:px-16">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                  <div className="order-first lg:mt-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                        alt="hero"
                        fill={true}
                        className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                        priority={true}
                      />
                    </div>
                  </div>
                  <div className="gap-12 lg:inline-flex md:order-first">
                    <div className="max-w-xl md:max-w-full text-center lg:text-left">
                      <div>
                        <p className="text-2xl font-medium tracking-tighter text-[#123026] sm:text-4xl">
                          I am a short heading
                        </p>
                        <p className="max-w-xl md:max-w-full mt-4 text-base tracking-tight text-[#123026]">
                          Use this paragraph to share information about your
                          company or products. Make it engaging and interesting,
                          and showcase your brand&apos;s personality. Thanks for
                          visiting our website!
                        </p>
                      </div>
                      <button
                        className="flex mx-auto mt-4 p-4 border-2 border-[#123026] hover:text-white hover:bg-[#123026] transition duration-300 ease-in-out"
                        onClick={() => router.push("/category/nike")}
                      >
                        View More
                      </button>
                      <div className="flex md:block md:overflow-hidden overflow-x-scroll scrollbar mt-8 mx-auto">
                        <div className="flex-shrink-0">
                          <div className="max-w-full flex gap-8 md:grid md:grid-cols-3 md:gap-8 lg:flex lg:overflow-x-scroll xl:overflow-hidden xl:grid-cols-3 xl:gap-8">
                            {nikeProducts.map((product) => (
                              <div className="cursor-pointer" key={product.id}>
                                <Link href={`/product/${product.productSlug}`}>
                                  <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-48 lg:h-48 xl:w-44 xl:h-44 aspect-square overflow-hidden">
                                    <Image
                                      src={product.coverImage}
                                      alt="hero"
                                      fill={true}
                                      className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                                    />
                                  </div>
                                </Link>
                                <div className="text-left">
                                  <Link
                                    className="w-fit border-a-expand text-base pt-2 pb-1 text-[#123026]"
                                    href={`/product/${product.productSlug}`}
                                  >
                                    {product.name}
                                  </Link>
                                  <div className="flex gap-4 mt-2">
                                    <h3
                                      className={`text-[#123026] ${
                                        product.discountId &&
                                        "line-through text-gray-500"
                                      }`}
                                    >
                                      Ksh {product.price}
                                    </h3>
                                    {product.discountId &&
                                      product?.discount?.discount !== null && (
                                        <h3 className="text-[#123026]">
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
                </div>
              </div>
            </section>
            <section className="bg-white">
              <div className="px-5 py-12 mx-auto md:px-12 lg:px-16">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                  <div className="gap-12 lg:inline-flex md:order-last lg:order-first">
                    <div className="max-w-xl md:max-w-full text-center lg:text-left">
                      <div>
                        <p className="text-2xl font-medium tracking-tighter text-[#123026] sm:text-4xl">
                          I am a short heading
                        </p>
                        <p className="max-w-xl md:max-w-full mt-4 text-base tracking-tight text-[#123026]">
                          Use this paragraph to share information about your
                          company or products. Make it engaging and interesting,
                          and showcase your brand&apos;s personality. Thanks for
                          visiting our website!
                        </p>
                      </div>
                      <button
                        className="flex mx-auto mt-4 p-4 border-2 border-[#123026] hover:text-white hover:bg-[#123026] transition duration-300 ease-in-out"
                        onClick={() => router.push("/category/jordan")}
                      >
                        View More
                      </button>
                      <div className="flex md:block md:overflow-hidden overflow-x-scroll scrollbar mt-8 mx-auto">
                        <div className="flex-shrink-0">
                          <div className="max-w-full flex gap-8 md:grid md:grid-cols-3 md:gap-8 lg:flex lg:overflow-x-scroll xl:overflow-hidden xl:grid-cols-3 xl:gap-8">
                            {jordanProducts.map((product) => (
                              <div className="cursor-pointer" key={product.id}>
                                <Link href={`/product/${product.productSlug}`}>
                                  <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-48 lg:h-48 xl:w-44 xl:h-44 aspect-square overflow-hidden">
                                    <Image
                                      src={product.coverImage}
                                      alt="hero"
                                      fill={true}
                                      className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                                    />
                                  </div>
                                </Link>
                                <div className="text-left">
                                  <Link
                                    className="w-fit border-a-expand text-base pt-2 pb-1 text-[#123026]"
                                    href={`/product/${product.productSlug}`}
                                  >
                                    {product.name}
                                  </Link>
                                  <div className="flex gap-4 mt-2">
                                    <h3
                                      className={`text-[#123026] ${
                                        product.discountId &&
                                        "line-through text-gray-500"
                                      }`}
                                    >
                                      Ksh {product.price}
                                    </h3>
                                    {product.discountId &&
                                      product?.discount?.discount !== null && (
                                        <h3 className="text-[#123026]">
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
                  <div className="order-first lg:mt-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                        alt="hero"
                        fill={true}
                        className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [adidasProducts, nikeProducts, jordanProducts] = await Promise.all([
    prisma.products.findMany({
      where: {
        categoryId: 1,
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
    }),
    prisma.products.findMany({
      where: {
        categoryId: 4,
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
    }),
    prisma.products.findMany({
      where: {
        categoryId: 3,
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
    }),
  ]);

  const shuffleArray = (array: any[]) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const adidasProductsRandom = shuffleArray(adidasProducts).slice(0, 3);
  const nikeProductsRandom = shuffleArray(nikeProducts).slice(0, 3);
  const jordanProductsRandom = shuffleArray(jordanProducts).slice(0, 3);

  return {
    props: {
      adidasProducts: JSON.parse(JSON.stringify(adidasProductsRandom)),
      nikeProducts: JSON.parse(JSON.stringify(nikeProductsRandom)),
      jordanProducts: JSON.parse(JSON.stringify(jordanProductsRandom)),
    },
    revalidate: 60, // In seconds
  };
};
