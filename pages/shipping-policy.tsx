import Cart from "@/components/Cart";
import MobileNav from "@/components/MobileNav";
import SearchComponent from "@/components/Search";
import { useShop } from "@/context/context";
import prisma from "@/lib/prisma";
import { Region } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";

type Props = {
  regions: Region[];
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Shipping = ({ regions }: Props) => {
  const { cartOpen, sideNav, searchOpen } = useShop();
  return (
    <>
      <Head>
        <title>Shipping Policy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence>
        {cartOpen && <Cart />}
        {sideNav && <MobileNav />}
        {searchOpen && <SearchComponent />}
      </AnimatePresence>
      <div
        className={`${montserrat.className} px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl text-[#123026]`}
      >
        <h1 className="text-center text-5xl">Shipping Policy</h1>
        <h3 className="my-8">
          Goodlite offers shipping to all addresses within Kenya. We currently
          do not offer international shipping. Shipping rates and delivery times
          may vary depending on the size and weight of your order, as well as
          your location. Orders are processed and shipped within 1-2 business
          days after payment is received. For domestic shipping, please
          carefully check and confirm your address and contact information. In
          the event of a failed delivery, your order will be reshipped and you
          will be charged another shipping fee.
        </h3>
        <h3 className="my-8">We currently ship in the following regions:</h3>
        <div className="overflow-x-scroll lg:overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300 border-2">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                >
                  {""}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold"
                >
                  Region
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold"
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {regions.map((region, index) => (
                <tr key={uuidv4()}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 border-2">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm border-2">
                    {region.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm border-2">
                    Ksh{region.amount}.00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Shipping;

export const getServerSideProps: GetServerSideProps = async () => {
  const regions = await prisma.region.findMany();
  return {
    props: {
      regions: JSON.parse(JSON.stringify(regions)),
    },
  };
};
