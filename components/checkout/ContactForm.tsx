import { FC } from "react";

const ContactForm: FC = () => {
  return (
    <form className="mt-8">
      <h1 className="text-xl mb-4">Shipping Address</h1>
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div className="relative">
          <input type="text" className="border-2 w-full p-4 input-focus" />
          <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
            First Name *
          </label>
        </div>
        <div className="relative mt-6 md:mt-0">
          <input type="text" className="border-2 w-full p-4 input-focus" />
          <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
            Last Name *
          </label>
        </div>
      </div>
      <div className="relative mt-6">
        <input type="text" className="border-2 w-full p-4 input-focus" />
        <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
          Street Address *
        </label>
      </div>
      <div className="relative mt-6">
        <input type="text" className="border-2 w-full p-4 input-focus" />
        <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
          Apartment, suite, unit, etc. *
        </label>
      </div>
      <div className="relative mt-6">
        <input type="text" className="border-2 w-full p-4 input-focus" />
        <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
          Town / City *
        </label>
      </div>
      <div className="relative mt-6">
        <input type="text" className="border-2 w-full p-4 input-focus" />
        <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
          Postcode / ZIP *
        </label>
      </div>
      <div className="relative mt-6">
        <input type="text" className="border-2 w-full p-4 input-focus" />
        <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
          Phone *
        </label>
      </div>
      <div className="relative mt-6">
        <input type="text" className="border-2 w-full p-4 input-focus" />
        <label className="absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none bg-white transition-all duration-200 ease-out">
          Email Address *
        </label>
      </div>
      <div className="mt-6 flex gap-8">
        <input type="checkbox" />
        <h3>Save this information for next time</h3>
      </div>
      <button className="p-4 text-white bg-black mt-6 hover:bg-[#212120]">Continue to Shipping</button>
    </form>
  );
};

export default ContactForm;
