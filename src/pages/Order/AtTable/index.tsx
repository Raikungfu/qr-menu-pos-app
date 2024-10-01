import React from "react";

import { OrderCard, OrderItemCard } from "@/components/custom";
import { Order, OrderItem, OrderList } from "@/constants/orders";
import useDragScroll from "@/hooks/useDragScroll";
import { API_GET_ORDER_DETAIL } from "@/Service/Order";

type AtTableProps = {
  orders: OrderList;
};

const AtTable: React.FC<AtTableProps> = ({ orders }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const {
    handleMouseDown,
    handleMouseLeaveOrUp,
    handleMouseMove,
    handleWheel,
  } = useDragScroll();
  const [selectedOrder, setselectedOrder] = React.useState<Order | null>(null);
  const [selectedOrderItems, setSelectedOrderItems] = React.useState<
    OrderItem[]
  >([]);

  const GetOrderDetail = async (id: number) => {
    try {
      const ordersData = await API_GET_ORDER_DETAIL({ id });

      if (ordersData) {
        const orders = ordersData as unknown as OrderItem[];
        setSelectedOrderItems(orders);
      }
    } catch (error) {
      console.error("Error fetching order detail data:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 h-screen">
      <div
        className="scrollable overflow-y-auto pb-80"
        ref={ref}
        onMouseDown={(e) => handleMouseDown(e, ref)}
        onMouseMove={(e) => handleMouseMove(e, ref)}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseLeave={handleMouseLeaveOrUp}
        onWheel={(e) => handleWheel(e, ref)}
      >
        <div>
          {orders.map((order, index) => (
            <div key={index} className="mt-2">
              <div className="w-full bg-[#C4DDF2] p-1">
                <p className="text-lg font-semibold">{order.Date}</p>
              </div>
              <div className="flex flex-col justify-center">
                {order.Children.map((child, index) => (
                  <OrderCard
                    key={index}
                    data={child}
                    active={selectedOrder == child}
                    onClick={() => {
                      setselectedOrder(child);
                      GetOrderDetail(child.Code);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 h-full">
        {selectedOrder && (
          <OrderItemCard
            order={selectedOrder}
            orderItems={selectedOrderItems}
          />
        )}
      </div>
    </div>
  );
};

export default AtTable;
