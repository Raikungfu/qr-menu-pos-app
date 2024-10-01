import { ShopActionTypes, ShopTable } from "@/constants/shop";
import { EllipsisVerticalIcon } from "lucide-react";

type ShopTableCardProps = {
  data: ShopTable;
};

const ShopTableCard = ({ data }: ShopTableCardProps) => {
  return (
    <div className="cursor-pointer rounded-md">
      <div
        className={`${
          data.status === ShopActionTypes.OPEN_TABLE
            ? "bg-primary"
            : "bg-gray-600"
        }  p-3 flex items-center justify-between text-white`}
      >
        <h3 className="font-semibold">{data.status}</h3>
        <EllipsisVerticalIcon />
      </div>
      <div
        className={`${
          data.status === ShopActionTypes.OPEN_TABLE
            ? "bg-primary bg-opacity-65"
            : "bg-gray-400"
        } py-12 text-center text-white font-semibold`}
      >
        {data.name}
      </div>
      <div></div>
    </div>
  );
};

export default ShopTableCard;
