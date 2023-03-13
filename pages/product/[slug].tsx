import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { IoHeartOutline as Heart, IoAddOutline as Add } from "react-icons/io5";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Item = () => {
  return (
    <div className={montserrat.className}>
      <Navbar />
      <section className="bg-white">
        <div className="px-5 py-8 mx-auto md:px-12 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
            <div className="gap-12 lg:inline-flex">
              <div className="max-w-xl md:max-w-full lg:max-w-xl text-left">
                <div>
                  <p className="text-2xl font-medium tracking-tighter text-black sm:text-4xl">
                    Solar Torch
                  </p>
                  <div className="flex gap-12">
                    <p className="mt-4 text-base tracking-tight text-gray-600 line-through">
                      Ksh 3,500
                    </p>
                    <p className="mt-4 text-base tracking-tight text-gray-600">
                      Ksh 3,000
                    </p>
                  </div>
                  <p className="mt-4 text-base tracking-tight text-gray-600">
                    Use this paragraph to share information about your company
                    or products. Make it engaging and interesting, and showcase
                    your brand&apos;s personality. Thanks for visiting our
                    website!
                  </p>
                  <ul className="mt-4 text-base tracking-tight text-gray-600">
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                    <li className="ml-4 list-disc">lorem ipsum</li>
                  </ul>
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="flex justify-center py-4 gap-6 border-2 mt-4 w-full md:w-auto md:basis-1/4">
                    <span className="mr-8 md:mr-2 text-2xl cursor-pointer">
                      -
                    </span>
                    <input
                      type="number"
                      defaultValue="1"
                      className="border-0 outline-0 w-1/12"
                    />
                    <span className="text-2xl cursor-pointer">+</span>
                  </div>
                  <button className="mt-4 w-full md:w-3/5 text-white bg-black py-4 cursor-pointer hover:bg-[#1a1918]">
                    Add To Cart
                  </button>
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="md:py-4 md:mt-4 w-full md:w-auto md:basis-1/4"></div>
                  <div className="flex justify-center items-center gap-4 mt-4 w-full md:w-3/5 text-black bg-gray-200 py-4 cursor-pointer hover:bg-[#c5c5c5]">
                    <span>
                      <Heart className="text-black align-middle" />
                    </span>
                    <button>Add To Wishlist</button>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <div className="flex items-center justify-between border-t-2 border-gray-400 py-4">
                      <h1 className="px-4">Shipping</h1>
                      <Add className="mr-4" />
                    </div>
                    <div>
                      <ul className="text-base tracking-tight text-gray-600 px-8 mb-4">
                        <li className="ml-4 list-disc">lorem ipsum</li>
                        <li className="ml-4 list-disc">lorem ipsum</li>
                        <li className="ml-4 list-disc">lorem ipsum</li>
                        <li className="ml-4 list-disc">lorem ipsum</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between border-t-2 border-gray-400 py-4">
                      <h1 className="px-4">Return Policy</h1>
                      <Add className="mr-4" />
                    </div>
                    <div>
                      <ul className="text-base tracking-tight text-gray-600 px-8 mb-4">
                        <li className="ml-4 list-disc">lorem ipsum</li>
                        <li className="ml-4 list-disc">lorem ipsum</li>
                        <li className="ml-4 list-disc">lorem ipsum</li>
                        <li className="ml-4 list-disc">lorem ipsum</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-first block w-full mt-12 aspect-square lg:mt-0 lg:order-first">
              <Image
                src="https://d33wubrfki0l68.cloudfront.net/ded521c426f480d4e473a11836c6ab8e7e948c84/95877/images/placeholders/square3.svg"
                alt="hero"
                height={1000}
                width={1000}
              />
              <div className="hidden md:mt-8 md:flex md:items-center md:gap-8 md:justify-center">
                <div>
                  <Image
                    src="https://d33wubrfki0l68.cloudfront.net/ded521c426f480d4e473a11836c6ab8e7e948c84/95877/images/placeholders/square3.svg"
                    alt="hero"
                    height={100}
                    width={100}
                  />
                </div>
                <div>
                  <Image
                    src="https://d33wubrfki0l68.cloudfront.net/ded521c426f480d4e473a11836c6ab8e7e948c84/95877/images/placeholders/square3.svg"
                    alt="hero"
                    height={100}
                    width={100}
                  />
                </div>
                <div>
                  <Image
                    src="https://d33wubrfki0l68.cloudfront.net/ded521c426f480d4e473a11836c6ab8e7e948c84/95877/images/placeholders/square3.svg"
                    alt="hero"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-xl">Related Products</h1>
            <div className="flex md:block md:overflow-hidden overflow-x-scroll scrollbar mt-8 mx-auto">
              <div className="flex-shrink-0">
                <div className="max-w-full flex gap-16 md:grid md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-8">
                  <div className="cursor-pointer">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                        alt="hero"
                        fill={true}
                        className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                      />
                    </div>
                    <div>
                      <h1 className="hover:underline text-base py-2">
                        Product 1
                      </h1>
                      <div className="flex gap-4">
                        <h3 className="text-gray-500 line-through">
                          Ksh 1,300.00
                        </h3>
                        <h3 className="text-gray-500">Ksh 1,100.00</h3>
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                        alt="hero"
                        fill={true}
                        className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                      />
                    </div>
                    <div>
                      <h1 className="hover:underline text-base py-2">
                        Product 1
                      </h1>
                      <div className="flex gap-4">
                        <h3 className="text-gray-500 line-through">
                          Ksh 1,300.00
                        </h3>
                        <h3 className="text-gray-500">Ksh 1,100.00</h3>
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                        alt="hero"
                        fill={true}
                        className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                      />
                    </div>
                    <div>
                      <h1 className="hover:underline text-base py-2">
                        Product 1
                      </h1>
                      <div className="flex gap-4">
                        <h3 className="text-gray-500 line-through">
                          Ksh 1,300.00
                        </h3>
                        <h3 className="text-gray-500">Ksh 1,100.00</h3>
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                        alt="hero"
                        fill={true}
                        className="w-full h-full object-cover object-center lg:hover:scale-125 transition duration-300 ease-in-out"
                      />
                    </div>
                    <div>
                      <h1 className="hover:underline text-base py-2">
                        Product 1
                      </h1>
                      <div className="flex gap-4">
                        <h3 className="text-gray-500 line-through">
                          Ksh 1,300.00
                        </h3>
                        <h3 className="text-gray-500">Ksh 1,100.00</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Item;
