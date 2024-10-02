import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Product } from "@/constants/Product";

interface CategoryProp {
  product: Product;
  onClick: (product: Product, size: string) => void;
}

const CategoryItemCard: React.FC<CategoryProp> = ({ product, onClick }) => {
  const [selectedSize, setSelectedSize] = React.useState<string>("M");

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
          <Select onValueChange={(value) => setSelectedSize(value)}>
            <SelectTrigger className="lg:w-[40%]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Size</SelectLabel>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={() => onClick(product, selectedSize)}>Thêm</Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItemCard;
