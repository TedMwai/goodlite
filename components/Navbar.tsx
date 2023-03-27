import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { FiSearch, FiMenu } from "react-icons/fi";
import { useShop } from "@/context/context";
import { useSession, signIn, signOut } from "next-auth/react";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar: FC = () => {
  const { setCartOpen, setSideNav } = useShop();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  console.log(session);

  return (
    <div className={`${montserrat.className} w-full mx-auto bg-white border-b`}>
      <div className="flex justify-between items-center w-full p-5 bg-white lg:hidden">
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
      <div className="hidden lg:flex w-full bg-white lg:items-center lg:justify-between lg:px-8 lg:py-5">
        <div className="">
          <Link className="text-2xl font-semibold" href="/">
            GOODLITE
          </Link>
        </div>
        <div>
          <ul className="flex gap-6 text-lg">
            <li>
              <Link
                href="/"
                className="lg:text-sm xl:text-base border-a-expand"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="lg:text-sm xl:text-base border-a-expand"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="lg:text-sm xl:text-base border-a-expand"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="lg:text-sm xl:text-base border-a-expand"
              >
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
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <Image src="/cart.svg" alt="Cart SVG" height={30} width={30} />
            <div className="absolute top-0 left-2 bg-black text-white rounded-full border-2 border-black h-4 w-4 flex items-center justify-center pointer-events-none">
              <span className="text-xs pointer-events-none">0</span>
            </div>
          </div>
          {!session ? (
            <button
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white
               bg-black rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2
                hover:bg-gray-700 active:bg-gray-800 active:text-white focus-visible:outline-black"
              onClick={() => signIn()}
            >
              Sign up
            </button>
          ) : (
            <div className="flex items-center cursor-pointer">
              <div>
                <Image
                  src={session?.user?.image ?? "/user-icon.png"}
                  alt={"User Icon"}
                  height={40}
                  width={40}
                  className="rounded-full p-1"
                />
              </div>
              <h1 className="text-sm font-medium border-a-expand">
                Hi, {session?.user?.name}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
