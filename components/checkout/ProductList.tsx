import { FC } from "react";
import Image from "next/image";

const ProductList: FC = () => {
  return (
    <>
      <div className="flex gap-4 mb-8 ">
        <div className="relative w-16 h-16 md:w-24 md:h-24 aspect-square">
          <Image
            src="https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg"
            alt="Product"
            fill={true}
            className="w-full h-full object-cover object-center rounded-md"
          />
          <div className="absolute -top-2 -right-3 bg-[#7f7f7f] text-white rounded-full border-2 border-[#7f7f7f] h-6 w-6 flex items-center justify-center">
            <span className="text-xs">2</span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h1 className="text-base md:text-lg">Product One</h1>
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
            className="w-full h-full object-cover object-center rounded-md"
          />
          <div className="absolute -top-2 -right-3 bg-[#7f7f7f] text-white rounded-full border-2 border-[#7f7f7f] h-6 w-6 flex items-center justify-center">
            <span className="text-xs">2</span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h1 className="text-base md:text-lg">Product One</h1>
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
            className="w-full h-full object-cover object-center rounded-md"
          />
          <div className="absolute -top-2 -right-3 bg-[#7f7f7f] text-white rounded-full border-2 border-[#7f7f7f] h-6 w-6 flex items-center justify-center">
            <span className="text-xs">2</span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h1 className="text-base md:text-lg">Product One</h1>
            <h1>Ksh. 10,000.00</h1>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between py-2">
          <h1>Subtotal</h1>
          <h1>Ksh. 30,000</h1>
        </div>
        <div className="flex items-center justify-between py-2">
          <h1>Shipping</h1>
          <h1>Ksh. 400</h1>
        </div>
        <div className="mt-6 border-t-2">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold">Total</h1>
            <h1 className="text-xl font-semibold">Ksh. 30,400</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
