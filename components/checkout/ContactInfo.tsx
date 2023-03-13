import { FC } from "react";

const ContactInfo: FC = () => {
  return (
    <div className="border-2 p-4">
      <div className="flex items-start justify-between border-b-2 py-4">
        <div className="flex flex-wrap md:gap-12">
          <h1 className="text-[#737373]">Contact</h1>
          <h1 className="flex-grow w-full md:w-auto">brf@gmail.com</h1>
        </div>
        <div className="text-blue-600 cursor-pointer">Change</div>
      </div>
      <div className="flex items-start justify-between border-b-2 py-4">
        <div className="flex flex-wrap md:gap-12">
          <h1 className="text-[#737373]">Ship to</h1>
          <h1 className="flex-grow w-full md:w-auto">
            196 isaac gathanju, 186 isaac gathanju, nairobi, 00100, Kenya
          </h1>
        </div>
        <div className="text-blue-600 cursor-pointer">Change</div>
      </div>
      <div className="flex items-start justify-between py-2">
        <div className="flex flex-wrap md:gap-12">
          <h1 className="text-[#737373]">Region</h1>
          <h1 className="flex-grow w-full md:w-auto">
            REGION 1: Karen, Dagoretti, Thindigua, Bomas, ·{" "}
            <span className="font-bold">Ksh400.00</span>
          </h1>
        </div>
        <div className="text-blue-600 cursor-pointer">Change</div>
      </div>
    </div>
  );
};

export default ContactInfo;
