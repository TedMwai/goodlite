import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import { useShop } from "@/context/context";
import { Montserrat } from "next/font/google";
import Head from "next/head";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Contact = () => {
  const { cartOpen, sideNav } = useShop();
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {cartOpen && <Cart />}
      {sideNav && <MobileNav />}
      <div
        className={`${montserrat.className} px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl`}
      >
        <h1 className="text-center text-5xl">WE WOULD LOVE TO HEAR FROM YOU</h1>
        <h3 className="text-gray-600 my-8">
          QUESTIONS OR ENGRAVING INSTRUCTIONS:
        </h3>
        <div>
          <h1 className="font-semibold">CALL US</h1>
          <h3>(+254) 712-344567</h3>
        </div>
        <div className="mt-6">
          <h1 className="font-semibold">EMAIL</h1>
          <h3>Goodlite - goodlite@gmail.com</h3>
        </div>
        <div>
          <form className="mt-6">
            <h1 className="font-semibold">
              OR USE THE FORM BELOW TO CONTACT US
            </h1>
            <div className="relative mt-6">
              <input
                type="text"
                className="border-2 w-full p-4 input-focus"
                placeholder=" "
              />
              <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
                Name *
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="text"
                className="border-2 w-full p-4 input-focus"
                placeholder=" "
              />
              <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
                Email *
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="text"
                className="border-2 w-full p-4 input-focus"
                placeholder=" "
              />
              <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
                Phone *
              </label>
            </div>
            <div className="relative mt-6">
              <textarea
                className="border-2 w-full p-4 input-focus"
                placeholder=" "
              />
              <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
                Message *
              </label>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
