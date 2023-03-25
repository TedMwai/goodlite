import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { FiSearch, FiMenu } from "react-icons/fi";
import { useShop } from "@/context/context";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar: FC = () => {
  const { setCartOpen, isMobile, setIsMobile, setSideNav } = useShop();

  useEffect(() => {
    if (window.innerWidth <= 991) {
      setIsMobile(true);
    }
  }, [setIsMobile]);

  return (
    <div className={`${montserrat.className} w-full mx-auto bg-white border-b`}>
      {isMobile ? (
        <div className="flex justify-between items-center w-full p-5 bg-white">
          <div onClick={() => setSideNav(true)}>
            <FiMenu className="text-2xl cursor-pointer" />
          </div>
          <div>
            <Link className="text-2xl font-semibold" href="/">
              GOODLITE
            </Link>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <Image src="/cart.svg" alt="Cart SVG" height={30} width={30} />
            <div className="absolute top-0 left-2 bg-black text-white rounded-full border-2 border-black h-4 w-4 flex items-center justify-center pointer-events-none">
              <span className="text-xs pointer-events-none">0</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full p-5 bg-white md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="">
            <Link className="text-2xl font-semibold" href="/">
              GOODLITE
            </Link>
          </div>
          <div>
            <ul className="flex gap-6 text-lg">
              <li>
                <Link href="/" className="border-a-expand">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="border-a-expand">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/" className="border-a-expand">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/" className="border-a-expand">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center border-2">
              <input
                type="search"
                className="px-4 py-2 w-9/12 focus:border-0 outline-none"
                placeholder="Search products..."
              />
              <FiSearch className="text-2xl cursor-pointer" />
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <Image src="/cart.svg" alt="Cart SVG" height={30} width={30} />
              <div className="absolute top-0 left-2 bg-black text-white rounded-full border-2 border-black h-4 w-4 flex items-center justify-center pointer-events-none">
                <span className="text-xs pointer-events-none">0</span>
              </div>
            </div>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-black rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-700 active:bg-gray-800 active:text-white focus-visible:outline-black">
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
