import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useShop } from "@/context/context";

type Props = {
  regionSelected: boolean;
  setShipping: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactInfo: FC<Props> = ({
  regionSelected,
  setShipping,
  setRegionSelected,
}) => {
  const { user } = useUser();
  const { shippingRegion, shippingPrice, billingDetails } = useShop();
  return (
    <div className="border-2 p-4">
      <div className="flex items-start justify-between border-b-2 pt-2 pb-4">
        <div className="flex-1 flex flex-wrap md:flex-nowrap">
          <h1 className="text-[#737373] md:basis-[20%]">Contact</h1>
          <h1 className="flex-grow w-full md:w-auto md:basis-[80%]">
            {user ? user.email : "brf@gmail.com"}
          </h1>
        </div>
        {!user ? (
          <div
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              setShipping(false);
              setRegionSelected(false);
            }}
          >
            Change
          </div>
        ) : (
          <Link href="/api/auth/logout" className="text-blue-500">
            Logout
          </Link>
        )}
      </div>
      <div className="flex items-start justify-between border-b-2 py-4">
        <div className="flex-1 flex flex-wrap md:flex-nowrap">
          <h1 className="text-[#737373] md:basis-[20%]">Ship to</h1>
          <h1 className="flex-grow w-full md:w-auto md:basis-[80%]">
            {`${billingDetails.address}, ${billingDetails.apartment}, ${
              billingDetails.city
            }, ${billingDetails?.postalCode ? billingDetails.postalCode : ""}`}
          </h1>
        </div>
        <div
          className="text-blue-600 cursor-pointer"
          onClick={() => {
            setShipping(false);
            setRegionSelected(false);
          }}
        >
          Change
        </div>
      </div>
      {regionSelected && (
        <div className="flex items-start justify-between py-2">
          <div className="flex-1 flex flex-wrap md:flex-nowrap">
            <h1 className="text-[#737373] md:basis-[20%]">Region</h1>
            <h1 className="flex-grow w-full md:w-auto md:basis-[80%]">
              {shippingRegion}
              <span className="font-bold">Ksh{shippingPrice}</span>
            </h1>
          </div>
          <div
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              setShipping(true);
              setRegionSelected(false);
            }}
          >
            Change
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
