import { FC } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import {
  IoLogoFacebook as Facebook,
  IoLogoTwitter as Twitter,
  IoLogoWhatsapp as Whatsapp,
  IoLogoInstagram as Instagram,
} from "react-icons/io5";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Footer: FC = () => {
  return (
    <footer className={`${montserrat.className} bg-black`}>
      <div className="px-5 py-12 mx-auto lg:py-16 md:px-12 lg:px-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold tracking-tighter transition duration-500 ease-in-out transform text-black tracking-relaxed lg:pr-8"
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 232 232"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M166.524 51.4683L116.367 101.625L65.5235 51.4683L116.367 0.62434L166.524 51.4683ZM231.11 116.054L180.953 166.898L130.796 116.054L180.953 65.8969L231.11 116.054ZM101.939 116.054L51.0948 166.898L0.250934 116.054L51.0948 65.8969L101.939 116.054ZM166.524 181.326L116.367 231.483L65.5235 181.326L116.367 130.482L166.524 181.326Z"
                  fill="#fff"
                ></path>
              </svg>
            </Link>
            <h1 className="w-1/2 mt-2 text-gray-100 text-xl font-bold">
              GOODLITE
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-semibold leading-6 uppercase text-white">
                  Resources
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-gray-100 border-b-expand"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-gray-100 border-b-expand"
                    >
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-sm text-gray-100 border-b-expand"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/accessibility"
                      className="text-sm text-gray-100 border-b-expand"
                    >
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="font-semibold leading-6 uppercase text-white">
                  Shop
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-gray-100 border-b-expand"
                    >
                      Streetlights
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-gray-100 border-b-expand"
                    >
                      Floodlights
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-gray-100 border-b-expand"
                    >
                      Garden Lamps
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-gray-100 border-b-expand"
                    >
                      Shop All
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden lg:justify-end md:grid md:grid-cols-1">
              <div className="w-full mt-12 md:mt-0">
                <div className="mt-8 lg:justify-end xl:mt-0">
                  <h3 className="font-semibold leading-6 uppercase text-white">
                    Subscribe to our newsletter
                  </h3>
                  <p className="mt-4 text-sm font-light text-gray-100 lg:ml-auto">
                    Sign Up for Special Offers!
                  </p>
                  <div className="inline-flex items-center gap-2 mt-12 list-none lg:ml-auto">
                    <form>
                      <div className="w-full sm:relative sm:flex sm:items-center">
                        <div className="min-w-0 w-60 shrink">
                          <input
                            type="email"
                            aria-label="Email address"
                            placeholder="Email address"
                            required={true}
                            className="block w-full p-3 text-black bg-white border border-gray-200 appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <button
                          className="relative inline-flex justify-center flex-none px-3 py-3 ml-1 overflow-hidden text-sm font-medium text-white transition-colors bg-[#232323] outline-2 outline-offset-2 before:absolute before:inset-0 active:before:bg-transparent hover:bg-[#424242]"
                          type="submit"
                        >
                          <span className="inline">Join us!</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-12 mx-auto border-t max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-20">
        <div className="flex justify-center mb-8 space-x-6 md:order-last md:mb-0">
          <span className="inline-flex justify-center w-full gap-3 lg:ml-auto md:justify-start md:w-auto">
            <a className="w-6 h-6 transition cursor-pointer">
              <span className="sr-only">Whatsapp</span>
              <Whatsapp
                className="w-5 h-5 md hydrated text-white hover:text-green-500"
                name="logo-whatsapp"
                role="img"
                aria-label="logo github"
              ></Whatsapp>
            </a>
            <a className="w-6 h-6 transition cursor-pointer">
              <span className="sr-only">Facebook</span>
              <Facebook
                className="w-5 h-5 md hydrated text-white hover:text-blue-500"
                name="logo-facebook"
                role="img"
                aria-label="logo twitter"
              ></Facebook>
            </a>
            <a className="w-6 h-6 transition cursor-pointer">
              <span className="sr-only">Instagram</span>
              <Instagram
                className="w-5 h-5 md hydrated text-white hover:text-purple-400"
                name="logo-instagram"
                role="img"
                aria-label="logo instagram"
              ></Instagram>
            </a>
            <a className="w-6 h-6 transition cursor-pointer">
              <span className="sr-only">Twitter</span>
              <Twitter
                className="w-5 h-5 md hydrated text-white hover:text-blue-500"
                name="logo-twitter"
                role="img"
                aria-label="logo linkedin"
              ></Twitter>
            </a>
          </span>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <span className="mt-2 text-sm font-light text-gray-100">
            Copyright © 2023 - Goodlite
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
