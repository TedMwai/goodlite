import { Montserrat } from "next/font/google";
import Image from "next/image";
import { FiX, FiSearch } from "react-icons/fi";
import { IoAddOutline as Add } from "react-icons/io5";
import { useShop } from "@/context/context";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const MobileNav = () => {
  const { setSideNav } = useShop();
  return (
    <div className={`${montserrat.className}`}>
      <div
        className="fixed top-0 h-screen w-full bg-[#c0c0c099] z-10 flex justify-start"
        onClick={() => setSideNav(false)}
      >
        <div
          className="w-full md:w-[55%] lg:w-6/12 xl:w-[35%] bg-white px-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mt-4 flex items-center justify-between">
            <FiX
              className="text-2xl cursor-pointer"
              onClick={() => setSideNav(false)}
            />
            <div className="flex gap-2 items-center border-b-2">
              <input
                type="search"
                className="px-4 py-2 w-9/12 focus:border-0 outline-none"
                placeholder="Search products..."
              />
              <FiSearch className="text-2xl cursor-pointer" />
            </div>
            <Image src="/userIcon.svg" alt="user icon" width={24} height={24} />
          </div>
          <div className="mt-8 flex flex-col overflow-hidden h-full">
            <div className="mt-4 overflow-y-scroll scrollbar h-full">
              <div className="flex items-center justify-between border-t-2 border-gray-400 py-4">
                <h1 className="px-4">Home</h1>
              </div>
              <div>
                <div className="flex items-center justify-between border-t-2 border-gray-400 py-4">
                  <h1 className="px-4">Discover</h1>
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
                  <h1 className="px-4">Products</h1>
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
                  <h1 className="px-4">About</h1>
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
                  <h1 className="px-4">About</h1>
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
            <div className="mb-32 grid grid-cols-2 gap-4 py-4">
              <div className="flex items-center gap-4 border-2 py-2 px-3 bg-gray-600">
                <h1 className="text-white text-center text-lg w-full px-2">
                  Account
                </h1>
                <Image
                  src="/userIcon.svg"
                  alt="Cart SVG"
                  height={24}
                  width={24}
                />
              </div>
              <div className="flex items-center gap-4 border-2 py-2 px-3 bg-black">
                <h1 className="text-white text-center text-lg w-full px-2">
                  Cart
                </h1>
                <Image src="/cart.svg" alt="Cart SVG" height={24} width={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
