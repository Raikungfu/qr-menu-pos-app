import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { CustomizationGroup, Product } from "@/constants/Product";

interface CategoryProp {
  product: Product;
  options: {
    option: string;
    price: number;
    cost: number;
    optionId: number;
    groupId: number;
    isSelected: boolean;
  }[];
  onIceSelect: (groupId: number, option: number) => void;
  note: string;
  onNoteChange: (note: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: (product: Product) => void;
  CustomizationGroups: CustomizationGroup[];
}

const CategoryItemCard: React.FC<CategoryProp> = ({
  product,
  options,
  onIceSelect,
  note,
  onNoteChange,
  quantity,
  onQuantityChange,
  onAddToCart,
  CustomizationGroups,
}) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const groupedOptions = options.reduce((acc, option) => {
    const group = acc[option.groupId] || [];
    group.push(option);
    acc[option.groupId] = group;
    return acc;
  }, {} as { [key: number]: typeof options });

  return (
    <div className="w-full h-[360px] bg-white rounded-3xl">
      <img src={product.Image} alt="" className="w-full h-[60%] object-cover" />
      <div className="h-[40%] flex flex-col items-center justify-evenly w-full">
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-xl">{product.Name}</h3>
          <h4 className="text-primary font-semibold">
            {product.Price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h4>
        </div>
        <div className="flex items-center w-full px-2 gap-2 justify-evenly">
          <Button variant="outline" onClick={() => setOpenOptions(true)}>
            Lựa chọn
          </Button>
          <Button>Thêm</Button>
        </div>
      </div>
      {openOptions && (
        <div className="p-4">
          {Object.entries(groupedOptions).map(([groupId, groupOptions]) => {
            const groupName =
              CustomizationGroups.find(
                (option) => option.CustomizationGroupId.toString() === groupId
              )?.Name || "Tùy chọn";

            return (
              <div className="mt-4" key={groupId}>
                <h3 className="text-base font-semibold">{groupName}</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  {groupOptions.map(
                    ({ groupId, option, optionId, price, isSelected }) => (
                      <label
                        key={optionId}
                        className={`flex items-center space-x-2 p-2 border rounded-full cursor-pointer ${
                          isSelected
                            ? "bg-orange-500 text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`option-${groupId}`}
                          checked={isSelected}
                          onClick={() => onIceSelect(groupId, optionId)}
                          className="form-radio h-4 w-4 text-orange-500"
                        />
                        <span>{option}</span>
                        <span>
                          {price > 0
                            ? " - " +
                              price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                            : ""}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
            );
          })}

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Ghi chú
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2"
              rows={2}
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
            />
          </div>

          <div className="sticky flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <button
                className="w-10 h-10 flex items-center justify-center border rounded-full"
                onClick={() => onQuantityChange(quantity - 1)}
              >
                -
              </button>
              <span className="px-4">{quantity ? quantity : 1}</span>
              <button
                className="w-10 h-10 flex items-center justify-center border rounded-full"
                onClick={() => onQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="ml-auto w-full py-2 bg-orange-500 text-white rounded-lg"
              onClick={() => onAddToCart(product)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryItemCard;
