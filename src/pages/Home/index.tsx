import React, { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { CategoryCard, CategoryItemCard } from "@/components/custom";
import useDragScroll from "@/hooks/useDragScroll";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import config from "@/configs";
import { Category, Product } from "@/constants/Product";
import {
  API_GET_CATEGORIES_BY_SHOPID,
  API_GET_MENU_BY_SHOPID,
} from "@/Service/Product";

const Home = () => {
  const navigate = useNavigate();
  const categoriesRef = React.useRef<HTMLDivElement>(null);
  const productsRef = React.useRef<HTMLDivElement>(null);
  const orderedProductsRef = React.useRef<HTMLDivElement>(null);
  const { shopId } = useParams<{ shopId: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const {
    handleMouseDown,
    handleMouseLeaveOrUp,
    handleMouseMove,
    handleWheel,
  } = useDragScroll();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          API_GET_MENU_BY_SHOPID({ shopId }),
          API_GET_CATEGORIES_BY_SHOPID(),
        ]);

        if (categoriesData) {
          var categories = categoriesData as unknown as Category[];

          setCategories(
            categories.map((category) => ({
              ...category,
              isSelected: category.isSelected ?? false,
            }))
          );
        }

        if (productsData) {
          var products = productsData as unknown as Product[];
          setProducts(products);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchData();
  }, [shopId]);

  const selectCategory = async (categoryId?: number, isSelected?: boolean) => {
    try {
      const productsData = await API_GET_MENU_BY_SHOPID({
        shopId,
        categoryId: isSelected ? null : categoryId,
      });

      setCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          isSelected:
            category.CategoryId === categoryId ? !category.isSelected : false,
        }))
      );

      if (productsData) {
        var products = productsData as unknown as Product[];
        setProducts(products);
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

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
            <CategoryCard
              key={index}
              name={category.Name}
              isSelected={category.isSelected}
              selectCategory={() =>
                selectCategory(category.CategoryId, category.isSelected)
              }
            />
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
          {products.map((product, index) => (
            <CategoryItemCard key={index} product={product} />
          ))}
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
            {/*<OrderedProductCard />
            <OrderedProductCard />
            <OrderedProductCard />
            <OrderedProductCard />
            <OrderedProductCard /> */}
          </div>
        </div>
        <div className=" w-full h-[30%]">
          <div className="w-full flex justify-between border-t px-4 py-2 border-black font-semibold text-sm">
            <h3 className="">Tạm tính</h3>
            <h3 className="">0đ</h3>
          </div>
          <div className="w-full flex flex-col border-t px-4 py-2 border-black">
            <div className="flex justify-between mb-3">
              <div className="font-semibold">
                <h3 className="text-base">
                  Tổng cộng <span className="text-primary">0 món</span>
                </h3>
                <h3 className="underline">0đ</h3>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <Printer className="text-primary" />
                <h3 className="text-sm">In tạm tính</h3>
              </div>
            </div>
            <div className="flex m-auto">
              <Button
                onClick={() => navigate(config.routes.payment)}
                size="lg"
                className="text-lg px-14"
              >
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
