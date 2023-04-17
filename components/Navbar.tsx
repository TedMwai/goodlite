import { useShop } from "@/context/context";
import { useUser } from "@auth0/nextjs-auth0/client";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import { FiMenu, FiPackage, FiSearch } from "react-icons/fi";
import {
  HiOutlineUserCircle as Avatar,
  HiChevronDown,
  HiArrowRightOnRectangle as LogOut,
} from "react-icons/hi2";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar: FC = () => {
  const { setCartOpen, setSideNav, setCart, cart } = useShop();
  const router = useRouter();
  const { user } = useUser();
  const path = router.pathname;

  const handleOpenCart = () => {
    setCartOpen(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.classList.add("overflow-y-hidden");
    }
  };

  const handleOpenMobileNav = () => {
    setSideNav(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.classList.add("overflow-y-hidden");
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await fetch("/api/cart/getCartItems");
      const cartItems = await res.json();
      setCart(cartItems);
    };

    fetchCartItems();
  }, [setCart]);

  return (
    <div className={`${montserrat.className} w-full mx-auto bg-white border-b`}>
      <div className="flex justify-between items-center w-full p-5 bg-white lg:hidden">
        <div onClick={handleOpenMobileNav}>
          <FiMenu className="text-2xl cursor-pointer" />
        </div>
        <div>
          <Link className="text-2xl font-semibold" href="/">
            GOODLITE
          </Link>
        </div>
        <div className="relative cursor-pointer" onClick={handleOpenCart}>
          <Image src="/cart.svg" alt="Cart SVG" height={30} width={30} />
          <div className="absolute top-0 left-2 bg-black text-white rounded-full border-2 border-black h-4 w-4 flex items-center justify-center pointer-events-none">
            <span className="text-xs pointer-events-none">{cart.length}</span>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-full bg-white lg:items-center lg:justify-between lg:px-8 lg:py-5">
        <div className="">
          <Link className="relative text-2xl font-semibold" href="/">
            GOODLITE
          </Link>
        </div>
        <div>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="lg:text-sm xl:text-lg border-a-expand">
                {path === "/" && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-full block h-[2px] w-full bg-black"
                  />
                )}
                Home
              </Link>
            </li>
            <li className="relative inline-block group">
              <Link
                href="/"
                className="flex items-center lg:text-sm xl:text-lg border-a-expand"
              >
                {path === "/categories" && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-full block h-[2px] w-full bg-black"
                  />
                )}
                Categories
                <HiChevronDown className="ml-1 text-lg" />
              </Link>
              <ul className="absolute left-0 w-40 py-2 bg-slate-100 shadow-xl z-10 group-hover:block hidden">
                <li className="py-2">
                  <Link
                    href="/category/adidas"
                    className="ml-4 py-1 text-gray-800 border-a-expand w-fit"
                  >
                    Adidas
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/category/nike"
                    className="ml-4 py-1 text-gray-800 border-a-expand w-fit"
                  >
                    Nike
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/category/jordan"
                    className="ml-4 py-1 text-gray-800 border-a-expand w-fit"
                  >
                    Jordans
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/products/all"
                className="lg:text-sm xl:text-lg border-a-expand"
              >
                {path === "/products/all" && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-full block h-[2px] w-full bg-black"
                  />
                )}
                Shop All
              </Link>
            </li>
            <li>
              <Link href="/" className="lg:text-sm xl:text-lg border-a-expand">
                {path === "/about" && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-full block h-[2px] w-full bg-black"
                  />
                )}
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center lg:gap-2 xl:gap-4">
          <div className="flex xl:gap-2 items-center border-2">
            <input
              type="search"
              className="px-4 py-2 w-9/12 focus:border-0 outline-none"
              placeholder="Search products..."
            />
            <FiSearch className="text-2xl cursor-pointer" />
          </div>
          <div className="relative cursor-pointer" onClick={handleOpenCart}>
            <Image src="/cart.svg" alt="Cart SVG" height={30} width={30} />
            <div className="absolute top-0 left-2 bg-black text-white rounded-full border-2 border-black h-4 w-4 flex items-center justify-center pointer-events-none">
              <span className="text-xs pointer-events-none">{cart.length}</span>
            </div>
          </div>
          {!user ? (
            <button
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white
               bg-black rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2
                hover:bg-gray-700 active:bg-gray-800 active:text-white focus-visible:outline-black"
              onClick={() => router.push("/api/auth/login")}
            >
              Sign up
            </button>
          ) : (
            <div className="relative flex items-center cursor-pointer group">
              <div>
                <Image
                  src={user.picture ?? "/user-icon.png"}
                  alt={"User Icon"}
                  height={40}
                  width={40}
                  className="rounded-full p-1"
                />
              </div>
              <h1 className="text-sm font-medium border-a-expand">
                Hi, {user.name}
              </h1>
              <HiChevronDown className="text-lg ml-1" />
              <ul className="absolute top-10 left-0 right-50 w-40 py-2 bg-white shadow-xl z-10 group-hover:block hidden">
                <li className="mt-2">
                  <Link
                    href="/"
                    className="flex gap-2 items-center ml-4 py-1 border-a-expand w-fit"
                  >
                    <Avatar className="text-xl" />
                    Account
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href="/orders"
                    className="flex gap-2 items-center ml-4 py-1 border-a-expand w-fit"
                  >
                    <FiPackage className="text-xl" />
                    Orders
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href="/api/auth/logout"
                    className="flex gap-2 items-center ml-4 py-1 border-a-expand w-fit"
                  >
                    <LogOut className="text-xl" />
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
