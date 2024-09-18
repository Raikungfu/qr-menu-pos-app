import OrderCard from "@/components/custom/OrderCard";
import OrderItemCard from "@/components/custom/OrderCard/OrderItemCard";
import { Order, OrderItem, OrderList } from "@/constants/orders";
import { API_GET_ORDER, API_GET_ORDER_DETAIL } from "@/Service/Order";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AtCounter = () => {
  const [orders, setOrders] = React.useState<OrderList>([]);
  const [selectedOrderItems, setSelectedOrderItems] = React.useState<
    OrderItem[]
  >([]);
  const [selectedOrder, setselectedOrder] = React.useState<Order | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.pathname === "/order") {
          const ordersData = await API_GET_ORDER();

          if (ordersData) {
            const orders = ordersData as unknown as OrderList;
            setOrders(orders);
          }
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, [location.pathname]);

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
    <div className="grid grid-cols-3 gap-2 h-full">
      <div className="scrollable overflow-y-auto pb-28">
        <div>
          {orders.map((order, index) => (
            <div key={index} className="mt-2">
              <div className="w-full bg-[#C4DDF2] p-1">
                <p className="text-lg font-semibold">{`${new Date(
                  order.Date
                ).toLocaleTimeString("en-GB", { hour12: false })}`}</p>
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

export default AtCounter;
