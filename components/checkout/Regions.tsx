import { FC } from "react";
import { useShop } from "@/context/context";
import { v4 as uuidv4 } from "uuid";
import { Region } from "@prisma/client";
import { myFetch } from "@/util/fetch";

type Props = {
  regions: Region[];
  setRegionSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const Regions: FC<Props> = ({ regions, setRegionSelected }) => {
  const {
    setShippingRegionIndex,
    setShippingPrice,
    selectedRegionIndex,
    setSelectedRegionIndex,
    setShippingRegion,
  } = useShop();

  const handleDivClick = async (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setSelectedRegionIndex(index);
    try {
      const response = await myFetch("/api/checkout/region", {
        method: "POST",
        body: JSON.stringify({ id: regions[index].id }),
      });
      const data = await response.json();
      setSelectedRegionIndex(index);
      setShippingPrice(data.shippingPrice);
      setShippingRegion(data.shippingRegion);
      setShippingRegionIndex(regions[index].id);
    } catch (error: unknown) {
      console.log("Unable to set shipping region", error);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-xl">Shipping region</h1>
      <div className="border-2 p-4 mt-4">
        {regions.map((region, index) => (
          <div
            key={uuidv4()}
            className={`flex gap-4 py-4 cursor-pointer ${
              index !== 0 ? "border-t-2" : ""
            }`}
            onClick={(event) => handleDivClick(event, index)}
          >
            <input
              type="radio"
              name="region"
              value={region.amount}
              checked={selectedRegionIndex === index}
              onChange={() => {
                setSelectedRegionIndex(index);
              }}
            />
            <div className="flex-1 flex gap-4 items-center justify-between">
              <div className="w-full">{region.name}</div>
              <div className="font-semibold w-32">Ksh{region.amount}.00</div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="p-4 text-white bg-black mt-6 hover:bg-[#212120]"
        type="button"
        onClick={() => setRegionSelected(true)}
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default Regions;
