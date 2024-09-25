import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import AtTable from "./AtTable";
import AtCounter from "./AtCounter";
import {
  OrderList,
  OrderStatus,
  StatusOrderListCount,
} from "@/constants/orders";
import useDragScroll from "@/hooks/useDragScroll";
import { useLocation } from "react-router-dom";
import {
  API_GET_ORDER,
  API_GET_STATUS_ORDER_LIST_COUNT,
} from "@/Service/Order";

const Order = () => {
  const [orders, setOrders] = React.useState<OrderList>();
  const [statusOrderListCount, setStatusOrderListCount] =
    React.useState<StatusOrderListCount>();
  const ref = React.useRef<HTMLDivElement>(null);
  const {
    handleMouseDown,
    handleMouseLeaveOrUp,
    handleMouseMove,
    handleWheel,
  } = useDragScroll();
  const [activeTab, setActiveTab] = React.useState<number>(1);
  const [activeStatus, setActiveStatus] = React.useState<OrderStatus>(
    OrderStatus.ALL
  );
  const tabs = [
    {
      id: 1,
      tabTitle: "Tại bàn",
      component: <AtTable orders={orders ?? []} />,
    },
    {
      id: 2,
      tabTitle: "Tại quầy",
      component: <AtCounter orders={orders ?? []} />,
    },
  ];

  const status = [
    {
      id: 1,
      status: OrderStatus.ALL,
      count: statusOrderListCount?.CountAll,
      key: "ALL",
    },
    {
      id: 2,
      status: OrderStatus.PENDING,
      count: statusOrderListCount?.CountPENDING,
      key: "PENDING",
    },
    {
      id: 3,
      status: OrderStatus.CONFIRMED,
      count: statusOrderListCount?.CountCONFIRMED,
      key: "CONFIRMED",
    },
    {
      id: 4,
      status: OrderStatus.PROCESSING,
      count: statusOrderListCount?.CountPROCESSING,
      key: "PROCESSING",
    },
    {
      id: 5,
      status: OrderStatus.PROCESSED,
      count: statusOrderListCount?.CountPROCESSED,
      key: "PROCESSED",
    },
    {
      id: 6,
      status: OrderStatus.COMPLETED,
      count: statusOrderListCount?.CountCOMPLETED,
      key: "COMPLETED",
    },
    {
      id: 7,
      status: OrderStatus.CANCELLED,
      count: statusOrderListCount?.CountCANCELLED,
      key: "CANCELLED",
    },
  ];

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname === "/order") {
        const [ordersData, statusOrderListCountData] = await Promise.all([
          API_GET_ORDER({}),
          API_GET_STATUS_ORDER_LIST_COUNT(),
        ]);

        if (ordersData) {
          const orders = ordersData as unknown as OrderList;
          setOrders(orders);
        }

        if (statusOrderListCountData) {
          const statusOrderListCount =
            statusOrderListCountData as unknown as StatusOrderListCount;
          setStatusOrderListCount(statusOrderListCount);
        }
      }
    };
    fetchData();
  }, [location.pathname]);

  const selectStatusOrderList = async (key?: string) => {
    try {
      const ordersData = await API_GET_ORDER({ key });

      if (ordersData) {
        const orders = ordersData as unknown as OrderList;
        setOrders(orders);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className="h-screen gap-2">
      <div className="bg-white rounded-sm border p-5">
        <div className="flex gap-3 text-lg font-semibold">
          {tabs.map((tab) => (
            <nav
              key={tab.id}
              className={`cursor-pointer ${
                activeTab === tab.id
                  ? "text-primary border-b-[4px] border-primary"
                  : ""
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.tabTitle} <span>({statusOrderListCount?.CountAll})</span>
            </nav>
          ))}
          <div></div>
        </div>
        <nav
          className="mt-5 flex gap-3 overflow-x-auto scrollable"
          ref={ref}
          onMouseDown={(e) => handleMouseDown(e, ref)}
          onMouseMove={(e) => handleMouseMove(e, ref)}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseLeave={handleMouseLeaveOrUp}
          onWheel={(e) => handleWheel(e, ref)}
        >
          {status.map((status) => (
            <Button
              key={status.id}
              variant="outline"
              className={`rounded-3xl ${
                activeStatus === status.status ? "bg-blue-500 text-white" : ""
              }`}
              size="lg"
              onClick={() => {
                setActiveStatus(status.status);
                selectStatusOrderList(
                  status.key && status.key !== "ALL" ? status.key : undefined
                );
              }}
            >
              {status.status}
              <span className="ml-[4px]">({status.count})</span>
            </Button>
          ))}
        </nav>
      </div>
      <div className="p-3 border mt-2">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default Order;
