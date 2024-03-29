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
    <footer className={`${montserrat.className} bg-[#123026]`}>
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
            <h1 className="w-1/2 mt-2 text-white text-xl font-bold">
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
                      className="text-sm text-white border-b-expand"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/accessibility"
                      className="text-sm text-white border-b-expand"
                    >
                      Accessibility
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-sm text-white border-b-expand"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shipping-policy"
                      className="text-sm text-white border-b-expand"
                    >
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/refund-policy"
                      className="text-sm text-white border-b-expand"
                    >
                      Refund Policy
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
                      href="/category/adidas"
                      className="text-sm text-white border-b-expand"
                    >
                      Adidas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/nike"
                      className="text-sm text-white border-b-expand"
                    >
                      Nike
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/jordan"
                      className="text-sm text-white border-b-expand"
                    >
                      Jordans
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/all"
                      className="text-sm text-white border-b-expand"
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
                  <p className="mt-4 text-sm font-light text-white lg:ml-auto">
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
                            className="block w-full p-3 text-black bg-white border border-gray-200 appearance-none placeholder:text-black focus:outline-none sm:text-sm"
                          />
                        </div>
                        <button
                          className="relative inline-flex justify-center flex-none px-3 py-3 ml-1 overflow-hidden text-sm font-medium text-white transition-colors bg-green-900 outline-2 outline-offset-2 before:absolute before:inset-0 active:before:bg-transparent hover:bg-green-800"
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
            <Link href="/" className="w-6 h-6 transition cursor-pointer">
              <span className="sr-only">Whatsapp</span>
              <Whatsapp className="w-5 h-5 text-white hover:text-green-500" />
            </Link>
            <Link href="/" className="w-6 h-6 transition cursor-pointer">
              <span className="sr-only">Facebook</span>
              <Facebook className="w-5 h-5 text-white hover:text-blue-500" />
            </Link>
            <Link href="/" className="w-6 h-6 transition cursor-pointer">
              <span className="sr-only">Instagram</span>
              <Instagram className="w-5 h-5 md hydrated text-white hover:text-purple-400" />
            </Link>
            <Link href="/" className="w-6 h-6 transition cursor-pointer">
              <span className="sr-only">Twitter</span>
              <Twitter className="w-5 h-5 md hydrated text-white hover:text-blue-500" />
            </Link>
          </span>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <span className="mt-2 text-sm font-light text-white">
            Copyright © 2023 - Goodlite
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
