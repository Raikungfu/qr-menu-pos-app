import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import React from "react";

const OrderedProductCard = () => {
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="bg-[#ebf6fc] flex flex-col gap-2 items-center p-4 rounded-lg min-h-[96px]">
      <div className="flex justify-between w-full px-2 font-semibold">
        <h3 className="font-semibold">
          Bạc sỉu <span className="text-gray-400">(Size S)</span>
        </h3>
        <h3>20.000đ</h3>
      </div>
      <div className="flex w-full items-center justify-around">
        <div className="flex gap-3 p-1 bg-white rounded-full">
          <div
            className={`${
              quantity > 1
                ? "text-primary cursor-pointer"
                : "text-gray-200 cursor-not-allowed"
            }`}
            onClick={handleMinus}
          >
            <MinusCircle />
          </div>
          <h3 className="font-semibold">{quantity}</h3>
          <div className="text-primary cursor-pointer" onClick={handlePlus}>
            <PlusCircle />
          </div>
        </div>
        <div>
          <Trash2 className="text-primary cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default OrderedProductCard;
