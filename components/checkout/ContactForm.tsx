import { FC } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useForm } from "react-hook-form";
import { myFetch } from "@/util/fetch";
import { Addresses } from "@prisma/client";
import { useShop } from "@/context/context";

type Props = {
  setShipping: React.Dispatch<React.SetStateAction<boolean>>;
  address: Addresses | undefined;
};

const ContactForm: FC<Props> = ({ setShipping, address }) => {
  const { user } = useUser();
  const { billingDetails, setBillingDetails } = useShop();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: address ? address.address : billingDetails.address,
      apartment: address ? address.apartment : billingDetails.apartment,
      firstName: address ? address.firstName : billingDetails.firstName,
      lastName: address ? address.lastName : billingDetails.lastName,
      town: address ? address.city : billingDetails.city,
      postCode: address ? address.postalCode : billingDetails.postalCode,
      phone: address ? address.phone : billingDetails.phone,
      email: user ? user?.email : "",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const res = await myFetch("/api/checkout/address", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      const resData = await res.json();
      const { address } = resData as { address: Addresses };
      setBillingDetails({
        ...address,
      });
      setShipping(true);
    } catch (error: unknown) {
      console.log("Unable to user address", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {user ? (
        <div className="border-2 p-4">
          <h1 className="text-lg">Contact Information</h1>
          <div className="flex items-start justify-between pt-2 pb-2">
            <div className="flex-1 flex flex-wrap md:flex-nowrap">
              <h1 className="text-[#737373] md:basis-[20%]">Contact</h1>
              <h1 className="flex-grow w-full md:w-auto md:basis-[80%]">
                {user.email}
              </h1>
            </div>
            <Link href="/api/auth/logout" className="text-blue-500">
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="font-medium md:text-lg">Contact Information</h1>
            <div className="flex md:gap-2">
              <h3 className="text-xs md:text-base">Already have an account?</h3>
              <Link
                href="/api/auth/login"
                className="text-blue-500 text-xs md:text-base"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="relative mt-2">
            <input
              type="email"
              className={`border-2 w-full p-4 input-focus ${
                errors.email && "border-red-500"
              }`}
              placeholder=" "
              {...register("email", { required: true })}
            />
            <label
              className={`absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none 
              bg-white transition-all duration-200 ease-out ${
                errors.email && "border-red-500"
              }`}
            >
              Email Address *
            </label>
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
        </div>
      )}
      <div className="mt-8">
        <h1 className="text-2xl mb-4">Billing Details</h1>
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div className="relative">
            <input
              type="text"
              className={`border-2 w-full p-4 input-focus ${
                errors.firstName && "border-red-500"
              }`}
              placeholder=" "
              {...register("firstName", { required: true })}
            />
            <label
              className={`absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none 
              bg-white transition-all duration-200 ease-out`}
            >
              First Name *
            </label>
            {errors.firstName && (
              <span className="text-red-500">First Name is required</span>
            )}
          </div>
          <div className="relative mt-6 md:mt-0">
            <input
              type="text"
              className={`border-2 w-full p-4 input-focus ${
                errors.lastName && "border-red-500"
              }`}
              placeholder=" "
              {...register("lastName", { required: true })}
            />
            <label
              className={`absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none 
              bg-white transition-all duration-200 ease-out`}
            >
              Last Name *
            </label>
            {errors.lastName && (
              <span className="text-red-500">Last Name is required</span>
            )}
          </div>
        </div>
        <div className="relative mt-6">
          <input
            type="text"
            className={`border-2 w-full p-4 input-focus ${
              errors.address && "border-red-500"
            }`}
            placeholder=" "
            {...register("address", { required: true })}
          />
          <label
            className={`absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none 
            bg-white transition-all duration-200 ease-out`}
          >
            Street Address *
          </label>
          {errors.address && (
            <span className="text-red-500">Address is required</span>
          )}
        </div>
        <div className="relative mt-6">
          <input
            type="text"
            className={`border-2 w-full p-4 input-focus ${
              errors.apartment && "border-red-500"
            }`}
            placeholder=" "
            {...register("apartment", { required: true })}
          />
          <label
            className={`absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none 
          bg-white transition-all duration-200 ease-out`}
          >
            Apartment, suite, unit, etc. *
          </label>
          {errors.apartment && (
            <span className="text-red-500">Apartment or suite is required</span>
          )}
        </div>
        <div className="relative mt-6">
          <input
            type="text"
            className={`border-2 w-full p-4 input-focus ${
              errors.town && "border-red-500"
            }`}
            placeholder=" "
            {...register("town", { required: true })}
          />
          <label
            className={`absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none 
          bg-white transition-all duration-200 ease-out`}
          >
            Town / City *
          </label>
          {errors.town && (
            <span className="text-red-500">Town / City is required</span>
          )}
        </div>
        <div className="relative mt-6">
          <input
            type="text"
            className={`border-2 w-full p-4 input-focus`}
            placeholder=" "
            {...register("postCode")}
          />
          <label
            className={`absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none 
          bg-white transition-all duration-200 ease-out`}
          >
            Postcode / ZIP
          </label>
        </div>
        <div className="relative mt-6">
          <input
            type="text"
            className={`border-2 w-full p-4 input-focus ${
              errors.phone && "border-red-500"
            }`}
            placeholder=" "
            {...register("phone", { required: true })}
          />
          <label
            className={`absolute top-2 left-2 p-2 text-base text-gray-500 pointer-events-none 
          bg-white transition-all duration-200 ease-out `}
          >
            Phone *
          </label>
          {errors.phone && (
            <span className="text-red-500">Phone is required</span>
          )}
        </div>
        <button
          className="p-4 text-white bg-[#123026] mt-6 hover:bg-[#1e4f3f] transition duration-300 ease-in-out"
          type="submit"
        >
          Continue to Shipping
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
