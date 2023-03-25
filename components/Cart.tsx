import { Montserrat } from "next/font/google";
import { FiMinus, FiX, FiPlus } from "react-icons/fi";
import Image from "next/image";
import { useShop } from "@/context/context";
import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Cart = () => {
  const { setCartOpen } = useShop();
  const router = useRouter();
  return (
    <div className={`${montserrat.className}`}>
      <div
        className="fixed top-0 h-screen w-full bg-[#c0c0c099] z-10 flex justify-end"
        onClick={() => setCartOpen(false)}
      >
        <div
          className="w-full md:w-[60%] lg:w-6/12 xl:w-[32%] bg-white p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b-2 pb-2 border-black">
            <div className="relative flex gap-2">
              <h1 className="text-xl">Cart</h1>
              <div className="relative">
                <Image src="/cart.svg" alt="Cart SVG" height={30} width={30} />
                <div className="absolute top-0 left-2 bg-black text-white rounded-full border-2 border-black h-4 w-4 flex items-center justify-center">
                  <span className="text-xs">2</span>
                </div>
              </div>
            </div>
            <div onClick={() => setCartOpen(false)}>
              <FiX className="text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="my-8 flex flex-col overflow-hidden h-5/6">
            <div className="overflow-y-scroll scrollbar h-5/6">
              <div className="flex gap-4 mb-8 ">
                <div className="relative w-16 h-16 md:w-24 md:h-24 aspect-square">
                  <Image
                    src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                    alt="Product"
                    fill={true}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between">
                    <h1 className="text-base md:text-lg">Product One</h1>
                    <Image
                      src="/delete.svg"
                      alt="remove"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="w-24 md:w-28 flex gap-4 items-center">
                      <FiMinus className="cursor-pointer" />
                      <input
                        type="number"
                        defaultValue="1"
                        className="border-0 outline-0 w-1/12"
                      />
                      <FiPlus className="cursor-pointer" />
                    </div>
                    <h1>Ksh. 10,000.00</h1>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mb-8 ">
                <div className="relative w-16 h-16 md:w-24 md:h-24 aspect-square">
                  <Image
                    src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
                    alt="Product"
                    fill={true}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between">
                    <h1 className="text-base md:text-lg">Product One</h1>
                    <Image
                      src="/delete.svg"
                      alt="remove"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="w-24 md:w-36 flex gap-4 items-center">
                      <FiMinus className="cursor-pointer" />
                      <input
                        type="number"
                        defaultValue="1"
                        className="border-0 outline-0 w-1/12"
                      />
                      <FiPlus className="cursor-pointer" />
                    </div>
                    <h1>Ksh. 10,000.00</h1>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-4">
                <h1 className="text-lg">Subtotal:</h1>
                <h1 className="text-lg">Ksh. 20,000.00</h1>
              </div>
              <button
                className="bg-black text-white py-3 px-4 text-lg mb-4 w-full hover:bg-gray-800"
                onClick={() => {
                  router.push("/checkout");
                  setCartOpen(false);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
