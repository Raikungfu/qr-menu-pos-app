import React from "react";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";

import { CartItem } from "@/constants/Cart";
import { useCartStore } from "@/store/cartStore";

type OrderedProductCardProps = {
  item: CartItem;
  onRemove: (index: number) => void;
};

const OrderedProductCard = ({ item, onRemove }: OrderedProductCardProps) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const cartStore = useCartStore();

  React.useEffect(() => {
    setQuantity(item.quantity);
  }, [quantity]);

  const handleMinus = (id: number) => {
    cartStore.increaseQuantity(id);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="bg-[#ebf6fc] flex flex-col gap-2 items-center p-4 rounded-lg min-h-[96px]">
      <div className="flex justify-between w-full px-2 font-semibold">
        <h3>{item.productName}</h3>
        <h3>
          {item.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </h3>
      </div>
      <p className="text-gray-400 text-sm">{item.sizeOptions[0].option}</p>
      <div className="flex w-full items-center justify-around">
        <div className="flex gap-3 p-1 bg-white rounded-full">
          <div
            className={`${
              quantity > 1
                ? "text-primary cursor-pointer"
                : "text-gray-200 cursor-not-allowed"
            }`}
            onClick={() => handleMinus(item.productId)}
          >
            <MinusCircle />
          </div>
          <h3 className="font-semibold">{quantity}</h3>
          <div className="text-primary cursor-pointer" onClick={handlePlus}>
            <PlusCircle />
          </div>
        </div>
        <div>
          <Trash2 className="text-primary cursor-pointer" onClick={() => onRemove(item.productId)} />
        </div>
      </div>
    </div>
  );
};

export default OrderedProductCard;
