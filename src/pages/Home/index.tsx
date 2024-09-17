import React from "react";
import { Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  CategoryCard,
  CategoryItemCard,
  OrderedProductCard,
} from "@/components/custom";
import useDragScroll from "@/hooks/useDragScroll";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import config from "@/configs";

type Category = {
  id: number;
  name: string;
};

const Home = () => {
  const navigate = useNavigate();
  const categoriesRef = React.useRef<HTMLDivElement>(null);
  const productsRef = React.useRef<HTMLDivElement>(null);
  const orderedProductsRef = React.useRef<HTMLDivElement>(null);
  const {
    handleMouseDown,
    handleMouseLeaveOrUp,
    handleMouseMove,
    handleWheel,
  } = useDragScroll();
  const [active, setActive] = React.useState<boolean>(false);
  const categories: Category[] = [
    {
      id: 0,
      name: "Tất cả",
    },
    {
      id: 1,
      name: "Đồ uống",
    },
    {
      id: 2,
      name: "Đồ ăn",
    },
    {
      id: 3,
      name: "Tráng miệng",
    },
    {
      id: 4,
      name: "Tráng miệng",
    },
    {
      id: 5,
      name: "Tráng miệng",
    },
    {
      id: 6,
      name: "Tráng miệng",
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="bg-gray-200 h-full w-9/12 p-6">
        <div
          className="w-full bg-white h-24 flex items-center gap-2 px-6 pt-2 overflow-x-auto scrollable rounded-2xl"
          ref={categoriesRef}
          onMouseDown={(e) => handleMouseDown(e, categoriesRef)}
          onMouseMove={(e) => handleMouseMove(e, categoriesRef)}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseLeave={handleMouseLeaveOrUp}
          onWheel={(e) => handleWheel(e, categoriesRef)}
        >
          {categories.map((category, index) => (
            <CategoryCard key={index} name={category.name} />
          ))}
        </div>

        {/* Product along with category */}
        <div
          className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 w-full mt-6 pb-44 max-h-[90%] overflow-auto scrollable"
          ref={productsRef}
          onMouseDown={(e) => handleMouseDown(e, productsRef)}
          onMouseMove={(e) => handleMouseMove(e, productsRef)}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseLeave={handleMouseLeaveOrUp}
          onWheel={(e) => handleWheel(e, productsRef)}
        >
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
          <CategoryItemCard />
        </div>
      </div>
      <div className="w-3/12 h-full">
        {/* order item */}
        <div className="w-full h-[70%] px-4 pt-2">
          <Textarea placeholder="Nhập ghi chú" />
          <div
            className="flex flex-col gap-2 w-full mt-3 max-h-[82%] overflow-auto scrollable"
            ref={orderedProductsRef}
            onMouseDown={(e) => handleMouseDown(e, orderedProductsRef)}
            onMouseMove={(e) => handleMouseMove(e, orderedProductsRef)}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onWheel={(e) => handleWheel(e, orderedProductsRef)}
          >
            <OrderedProductCard />
            <OrderedProductCard />
            <OrderedProductCard />
            <OrderedProductCard />
            <OrderedProductCard />
          </div>
        </div>
        <div className=" w-full h-[30%]">
          <div className="w-full flex justify-between border-t px-4 py-2 border-black font-semibold text-sm">
            <h3 className="">Tạm tính</h3>
            <h3 className="">20.000đ</h3>
          </div>
          <div className="w-full flex flex-col border-t px-4 py-2 border-black">
            <div className="flex justify-between mb-3">
              <div className="font-semibold">
                <h3 className="text-base">
                  Tổng cộng <span className="text-primary">1 món</span>
                </h3>
                <h3 className="underline">20.000đ</h3>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <Printer className="text-primary" />
                <h3 className="text-sm">In tạm tính</h3>
              </div>
            </div>
            <div className="flex m-auto">
                <Button onClick={() => navigate(config.routes.payment)} size="lg" className="text-lg px-14">
                  Thanh toán
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
