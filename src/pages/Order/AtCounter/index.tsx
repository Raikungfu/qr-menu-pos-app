import OrderCard from "@/components/custom/OrderCard";
import OrderItemCard from "@/components/custom/OrderCard/OrderItemCard";
import { Order, OrderList } from "@/constants/orders";
import { ordersDummy } from "@/data/dummy";
import React, { useEffect } from "react";

const AtCounter = () => {
  const [orders, setOrders] = React.useState<OrderList>([]);
  const [selectedOrder, setselectedOrder] = React.useState<Order | null>(null);

  useEffect(() => {
    setOrders(ordersDummy);
  }, [ordersDummy]);

  console.log(orders);

  return (
    <div className="grid grid-cols-3 gap-2 h-full">
      <div className="scrollable overflow-y-auto pb-28">
        <div>
          {orders.map((order, index) => (
            <div key={index} className="mt-2">
              <div className="w-full bg-[#C4DDF2] p-1">
                <p className="text-lg font-semibold">{order.date}</p>
              </div>
              <div className="flex flex-col justify-center">
                {order.children.map((child, index) => (
                  <OrderCard
                    key={index}
                    data={child}
                    active={selectedOrder == child}
                    onClick={() => {
                      setselectedOrder(child);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 h-full">
        {selectedOrder && <OrderItemCard />}
      </div>
    </div>
  );
};

export default AtCounter;
