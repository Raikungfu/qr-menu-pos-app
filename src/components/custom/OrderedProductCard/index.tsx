import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";

import { CartItem } from "@/constants/Cart";
import { useCartStore } from "@/store/cartStore";

type OrderedProductCardProps = {
  index: number;
  item: CartItem;
  onRemove: (index: number) => void;
};

const OrderedProductCard = ({
  index,
  item,
  onRemove,
}: OrderedProductCardProps) => {
  const cartStore = useCartStore();

  const handleMinus = (id: number, option: string) => {
    cartStore.decreaseQuantity(id, option);
  };

  const handlePlus = (id: number, option: string) => {
    cartStore.increaseQuantity(id, option);
  };

  return (
    <div className="bg-[#ebf6fc] flex flex-col gap-2 items-center p-3 rounded-lg min-h-[96px]">
      <div className="flex justify-between w-full font-semibold">
        <h3>{item.productName}</h3>

        <div className="flex flex-row">
          <h3>
            {item.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h3>
          <Trash2
            className="text-primary cursor-pointer pl-1"
            onClick={() => {
              onRemove(index);
            }}
          />
        </div>
      </div>
      {item.sizeOptions.map((sizeOption) => (
        <div className="flex flex-row justify-between w-full">
          <p className="text-gray-400 text-sm truncate p-1">
            {sizeOption.option}
          </p>
          <div className="flex justify-end">
            <div className="flex gap-3 p-1 bg-white rounded-full">
              <div
                className="text-primary cursor-pointer"
                onClick={() => handleMinus(item.productId, sizeOption.option)}
              >
                <MinusCircle />
              </div>
              <h3 className="font-semibold">{sizeOption.quantity}</h3>
              <div
                className="text-primary cursor-pointer"
                onClick={() => handlePlus(item.productId, sizeOption.option)}
              >
                <PlusCircle />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderedProductCard;
