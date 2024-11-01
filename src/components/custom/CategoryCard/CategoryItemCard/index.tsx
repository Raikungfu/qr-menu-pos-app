import React, { useEffect, useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CustomizationGroup, Product, SizeOption } from "@/constants/Product";
import { API_GET_MENU_ITEM_CUSTOMIZE_OPTION } from "@/Service/Product";
import { useCartStore } from "@/store/cartStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Option {
  option: string;
  price: number;
  cost: number;
  optionId: number;
  groupId: number;
  isSelected: boolean;
}
interface CategoryProp {
  prod: Product;
  onAddToCart: () => void;
}

type GroupOptions = {
  [key: number]: {
    option: string;
    price: number;
    cost: number;
    optionId: number;
    groupId: number;
    isSelected: boolean;
  }[];
};

const CategoryItemCard: React.FC<CategoryProp> = ({ prod, onAddToCart }) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [customizationGroups, setCustomizationGroups] = useState<
    CustomizationGroup[]
  >([]);
  const [groupedOptions, setGroupedOptions] = useState<GroupOptions>([]);
  const [product, setProduct] = useState<Product>(prod);
  const dispatch = useCartStore();

  const [options, setOptions] = useState<Option[]>([]);
  const [note, setNote] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (openOptions && options.length === 0) {
      const loadOptions = async () => {
        try {
          const optionsData = await API_GET_MENU_ITEM_CUSTOMIZE_OPTION<{}>({
            productId: product.MenuItemId,
          });
          if (optionsData) {
            const options = optionsData as unknown as CustomizationGroup[];
            setCustomizationGroups(options);
          }
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      };

      loadOptions();
    }
  }, [openOptions, options]);

  useEffect(() => {
    const opts = customizationGroups.slice(0).flatMap((group) =>
      group.Customizations.map((c) => ({
        optionId: c.MenuItemCustomizationId,
        groupId: group.CustomizationGroupId,
        option: c.Name,
        price: c.AdditionalCost,
        cost: c.Cost,
        isSelected: c.isSelected || false,
      }))
    );

    setProduct((prev) => ({
      ...prev,
      CustomizationGroups: customizationGroups,
    }));

    setOptions(opts);

    setGroupedOptions(
      opts.reduce((acc, option) => {
        const group = acc[option.groupId] || [];
        group.push(option);
        acc[option.groupId] = group;
        return acc;
      }, {} as { [key: number]: typeof options })
    );
  }, [customizationGroups]);

  const handleSelect = (groupId: number, optionId: number) => {
    setProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;

      const updatedGroups = prevProduct.CustomizationGroups.map((group) => {
        if (group.CustomizationGroupId === groupId) {
          return {
            ...group,
            Customizations: group.Customizations.map((option) => ({
              ...option,
              isSelected:
                option.MenuItemCustomizationId === optionId &&
                !option.isSelected,
            })),
          };
        }
        return group;
      });

      setGroupedOptions((prevGroupedOptions) => {
        const updatedGroupedOptions = { ...prevGroupedOptions };
        if (updatedGroupedOptions[groupId]) {
          updatedGroupedOptions[groupId] = updatedGroupedOptions[groupId].map(
            (option) => {
              return {
                ...option,
                isSelected: option.optionId === optionId && !option.isSelected,
              };
            }
          );
        }
        return updatedGroupedOptions;
      });

      return {
        ...prevProduct,
        CustomizationGroups: updatedGroups,
      };
    });
  };

  const handleNoteChange = (note: string) => {
    setNote(note);
    setProduct((prevProduct) =>
      prevProduct ? { ...prevProduct, note } : prevProduct
    );
  };

  const handleQuantityChange = (quantity: number) => {
    if (quantity < 1) return;
    setQuantity(quantity);
    setProduct((prevProduct) =>
      prevProduct
        ? { ...prevProduct, Quantity: quantity >= 1 ? quantity : 1 }
        : prevProduct
    );
  };

  const handleAddToCart = () => {
    const optionsMap: { [key: string]: number } = {};
    let totalPrice = 0;
    let totalCost = 0;

    product.CustomizationGroups.forEach((group) =>
      group.Customizations.forEach((option) => {
        if (option.isSelected) {
          if (!optionsMap[option.Name]) {
            optionsMap[option.Name] = option.AdditionalCost;
            totalPrice += option.AdditionalCost;
            totalCost += option.Cost;
          }
        }
      })
    );

    const optionsString =
      Object.keys(optionsMap).length > 0
        ? Object.keys(optionsMap).join(" - ")
        : "Default";

    const sizeOptions: SizeOption[] = [
      {
        option: optionsString,
        price: totalPrice,
        quantity: product.Quantity > 0 ? product.Quantity : 1,
        cost: totalCost,
      },
    ];

    dispatch.addToCart({
      productId: product.MenuItemId,
      productName: product.Name,
      quantity: product.Quantity > 0 ? product.Quantity : 1,
      sizeOptions,
      note: product.Note || "",
      price: product.Price,
      cost: product.Price,
    });

    setOpenOptions(false);
    onAddToCart();
  };

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
        <div className="flex items-center w-full px-2 justify-evenly">
          <Button variant="outline" onClick={() => setOpenOptions(true)}>
            Lựa chọn
          </Button>
          <Button onClick={() => setOpenOptions(true)}>Thêm</Button>
        </div>
      </div>
      <Dialog open={openOptions} onOpenChange={() => setOpenOptions(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lựa chọn</DialogTitle>
            <DialogDescription>
              Vui lòng chọn các tùy chọn cho sản phẩm
            </DialogDescription>
            <div className="flex justify-center items-center">
              <div className="w-full">
                {Object.entries(groupedOptions).map(
                  ([groupId, groupOptions]) => {
                    const groupName =
                      customizationGroups.find(
                        (option) =>
                          option.CustomizationGroupId.toString() === groupId
                      )?.Name || "Tùy chọn";

                    return (
                      <div className="mt-4" key={groupId}>
                        <p className="text-base font-medium text-gray-900">
                          {groupName}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {groupOptions.map(
                            ({
                              groupId,
                              option,
                              optionId,
                              price,
                              isSelected,
                            }) => (
                              <Label
                                key={optionId}
                                className={`flex items-center space-x-2 p-3 border rounded-full cursor-pointer ${
                                  isSelected
                                    ? "bg-orange-500 text-white"
                                    : "bg-white text-black"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`option-${groupId}`}
                                  checked={isSelected}
                                  readOnly
                                  onClick={() =>
                                    handleSelect(groupId, optionId)
                                  }
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
                              </Label>
                            )
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
                <div className="mt-4 p-2 space-y-2">
                  <Label className="block text-sm font-medium text-gray-700">
                    Ghi chú
                  </Label>
                  <Textarea
                    placeholder="Nhập ghi chú"
                    value={note}
                    onChange={(e) => handleNoteChange(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex gap-3 p-1 items-center justify-center bg-white rounded-full w-2/4">
                    <div
                      className={`${
                        quantity > 1
                          ? "text-primary cursor-pointer"
                          : "text-gray-200 cursor-not-allowed"
                      }`}
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      <MinusCircle size={30} />
                    </div>
                    <span className="font-medium text-xl">{quantity}</span>
                    <div
                      className="text-primary cursor-pointer"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <PlusCircle size={30} />
                    </div>
                  </div>

                  <Button
                    className="w-full py-2 bg-orange-500 text-white rounded-lg"
                    onClick={() => handleAddToCart()}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryItemCard;
