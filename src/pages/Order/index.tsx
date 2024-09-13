import { Button } from "@/components/ui/button";
import React from "react";
import AtTable from "./AtTable";
import AtCounter from "./AtCounter";
import { OrderStatus } from "@/constants/orders";
import useDragScroll from "@/hooks/useDragScroll";

const Order = () => {
  const {
    ref,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleWheel
  } = useDragScroll();
  const [activeTab, setActiveTab] = React.useState<number>(1);
  const [activeStatus, setActiveStatus] = React.useState<OrderStatus>(
    OrderStatus.ALL
  );
  const tabs = [
    {
      id: 1,
      tabTitle: "Tại bàn",
      component: <AtTable />,
    },
    {
      id: 2,
      tabTitle: "Tại quầy",
      component: <AtCounter />,
    },
  ];

  const status = [
    {
      id: 1,
      status: OrderStatus.ALL,
    },
    {
      id: 2,
      status: OrderStatus.PENDING,
    },
    {
      id: 3,
      status: OrderStatus.CONFIRMED,
    },
    {
      id: 4,
      status: OrderStatus.PROCESSING,
    },
    {
      id: 5,
      status: OrderStatus.PROCESSED,
    },
    {
      id: 6,
      status: OrderStatus.COMPLETED,
    },
    {
      id: 7,
      status: OrderStatus.CANCELLED,
    },
  ];

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
              {tab.tabTitle} <span>(12)</span>
            </nav>
          ))}
          <div></div>
        </div>
        <nav
          className="mt-5 flex gap-3 overflow-x-auto scrollable"
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
        >
          {status.map((status) => (
            <Button
              key={status.id}
              variant="outline"
              className={`rounded-3xl min-w-[182px] ${
                activeStatus === status.status ? "bg-blue-500 text-white" : ""
              }`}
              size="lg"
              onClick={() => setActiveStatus(status.status)}
            >
              {status.status}
              <span className="ml-[4px]">(12)</span>
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
