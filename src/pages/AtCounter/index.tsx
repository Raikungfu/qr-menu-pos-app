import React, { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  CategoryCard,
  CategoryItemCard,
  OrderedProductCard,
} from "@/components/custom";
import useDragScroll from "@/hooks/useDragScroll";
import { Button } from "@/components/ui/button";
import config from "@/configs";
import { Category, Product } from "@/constants/Product";
import {
  API_GET_CATEGORIES_BY_SHOPID,
  API_GET_MENU_BY_SHOPID,
} from "@/Service/Product";
import RenderIf from "@/util/RenderIf";
import Skeleton from "@/components/custom/Skeleton";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/constants/Cart";

const AtCounter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const categoriesRef = React.useRef<HTMLDivElement>(null);
  const productsRef = React.useRef<HTMLDivElement>(null);
  const orderedProductsRef = React.useRef<HTMLDivElement>(null);
  const { shopId } = useParams<{ shopId: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<CartItem[]>([]);
  const cartStore = useCartStore();

  const {
    handleMouseDown,
    handleMouseLeaveOrUp,
    handleMouseMove,
    handleWheel,
  } = useDragScroll();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          API_GET_MENU_BY_SHOPID({ shopId }),
          API_GET_CATEGORIES_BY_SHOPID(),
        ]);

        if (categoriesData) {
          const categories = categoriesData as unknown as Category[];

          setCategories(
            categories.map((category) => ({
              ...category,
              isSelected: category.isSelected ?? false,
            }))
          );
          setLoading(false);
        }

        if (productsData) {
          const products = productsData as unknown as Product[];
          setProducts(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
        setLoading(true);
      }
    };

    setCarts(cartStore.getCarts());

    fetchData();
  }, [shopId]);

  const selectCategory = async (categoryId?: number, isSelected?: boolean) => {
    try {
      setLoading(true);
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
        const products = productsData as unknown as Product[];
        setProducts(products);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
      setLoading(true);
    }
  };

  const handleAddToCart = () => {
    setCarts(cartStore.getCarts());
  };

  const handleRemoveFromCart = (index: number) => {
    cartStore.removeFromCart(index);
    setCarts(cartStore.getCarts());
  };

  return (
    <div className="flex h-screen">
      <div className="bg-gray-200 h-full w-9/12 p-6">
        <div
          className="w-full bg-white h-24 flex items-center gap-4 px-6 pt-2 overflow-x-auto scrollable rounded-2xl"
          ref={categoriesRef}
          onMouseDown={(e) => handleMouseDown(e, categoriesRef)}
          onMouseMove={(e) => handleMouseMove(e, categoriesRef)}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseLeave={handleMouseLeaveOrUp}
          onWheel={(e) => handleWheel(e, categoriesRef)}
        >
          <RenderIf
            isTrue={!loading}
            condition2={Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="w-28 h-10 mx-2" />
            ))}
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
          </RenderIf>
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
          <RenderIf
            isTrue={!loading}
            condition2={Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[360px]" />
            ))}
          >
            {products.map((product, index) => (
              <CategoryItemCard
                key={index}
                prod={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </RenderIf>
        </div>
      </div>
      <div className="w-3/12 h-full">
        {/* order item */}
        <div className="w-full h-[70%] px-4 pt-2">
          <div
            className="flex flex-col gap-2 w-full mt-3 max-h-[95%] overflow-auto scrollable"
            ref={orderedProductsRef}
            onMouseDown={(e) => handleMouseDown(e, orderedProductsRef)}
            onMouseMove={(e) => handleMouseMove(e, orderedProductsRef)}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onWheel={(e) => handleWheel(e, orderedProductsRef)}
          >
            {carts?.map((item, index) => (
              <OrderedProductCard
                key={index}
                item={item}
                onRemove={handleRemoveFromCart}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className=" w-full h-[30%]">
          <div className="w-full flex justify-between border-t px-4 py-2 border-black font-semibold text-sm">
            <h3 className="">Tạm tính</h3>
            <h3 className="">
              {cartStore.getTotal().toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </h3>
          </div>
          <div className="w-full flex flex-col border-t px-4 py-2 border-black">
            <div className="flex justify-between mb-3">
              <div className="font-semibold">
                <h3 className="text-base">
                  Tổng cộng{" "}
                  <span className="text-primary">
                    {cartStore.getQuantity()} món
                  </span>
                </h3>
                <h3 className="underline">
                  {" "}
                  {cartStore.getTotal().toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h3>
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

export default AtCounter;
