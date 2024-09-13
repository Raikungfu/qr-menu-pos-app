import { MinusCircle, PlusCircle } from "lucide-react";
import React from "react";

const OrderedProductCard = () => {
  return (
    <div className="bg-[#ebf6fc] flex flex-col items-center p-4 rounded-lg h-full">
      <div className="flex justify-between w-full px-2 font-semibold">
        <h3 className="font-semibold">
          Bạc sỉu <span className="text-gray-400">(Size S)</span>
        </h3>
        <h3>20.000đ</h3>
      </div>
      <div className="flex gap-3 bg-white rounded-full mt-4 p-2">
        <div className="text-primary cursor-pointer">
          <MinusCircle />
        </div>
        <h3 className="font-semibold">1</h3>
        <div className="text-primary cursor-pointer">
          <PlusCircle />
        </div>
      </div>
    </div>
  );
};

export default OrderedProductCard;
