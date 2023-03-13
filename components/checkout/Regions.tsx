import { FC } from "react";
import regions from "@/util/region";

const Regions: FC = () => {
  return (
    <div className="mt-8">
      <h1 className="text-xl">Shipping region</h1>
      <div className="border-2 p-4 mt-4">
        {regions.map((region, index) => (
          <div
            key={index}
            className={`flex gap-4 py-4 ${index !== 0 ? "border-t-2" : ""}`}
          >
            <input type="radio" name="region" />
            <div className="flex-1 flex gap-4 items-center justify-between">
              <div className="w-full">{region.name}</div>
              <div className="font-semibold w-32">Ksh{region.amount}.00</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regions;
