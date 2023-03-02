import { FC } from "react";
import { useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// TODO: Fix the Navbar's responsiveness and rename the links
// TODO: Add a search bar

const Navbar: FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`${montserrat.className} w-full mx-auto bg-white border-b 2xl:max-w-7xl`}>
      <div className="relative flex flex-col w-full p-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:outline-none focus:text-black md:hidden"
          >
            <svg
              className="w-6 h-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className={open ? "hidden" : "inline-flex"}
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <path
                className={!open ? "hidden" : "inline-flex"}
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <Link
            className="text-lg tracking-tight text-black uppercase focus:outline-none focus:ring lg:text-2xl"
            href="/"
          >
            <span className="lg:text-lg uppecase focus:ring-0">windstatic</span>
          </Link>
        </div>
        <nav
          className={
            open
              ? "flex flex-col items-center flex-grow md:pb-0 md:flex md:justify-end md:flex-row lg:gap-12"
              : "hidden"
          }
        >
          <a
            className="px-2 py-2 text-sm text-black lg:px-0 lg:pb-1 md:px-3 border-a-expand lg:ml-auto"
            href="#"
          >
            About
          </a>
          <a
            className="px-2 py-2 text-sm text-black lg:px-0 lg:pb-1 md:px-3 border-a-expand"
            href="#"
          >
            Contact
          </a>
          <a
            className="px-2 py-2 text-sm text-black lg:px-0 lg:pb-1 md:px-3 border-a-expand"
            href="#"
          >
            Documentation
          </a>
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <button className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline">
              Sign in
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-black rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-700 active:bg-gray-800 active:text-white focus-visible:outline-black">
              Sign up
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
