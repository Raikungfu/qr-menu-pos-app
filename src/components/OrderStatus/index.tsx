import useSignalR from "@/hooks/Hubs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderStatusProps {
  shopId?: string;
  tableId?: string;
}

const OrderStatusComponent: React.FC<OrderStatusProps> = ({
  shopId,
  tableId,
}) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [orderId, setOrderId] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);
  const nav = useNavigate();

  const convertDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleOrderStatusUpdate = (
    orderId: number,
    status: string,
    updateDate: Date,
    paymentMethod: string
  ) => {
    setOrderId(orderId);
    switch (status) {
      case "PENDING":
        triggerNotification(
          `Order ID: ${orderId}, Status: ${status}<br />Payment method: ${paymentMethod}<br />Time: ${convertDate(
            updateDate
          )}`
        );
        break;
      case "PREPARING":
        triggerNotification(
          `Order is being prepared<br />Order ID: ${orderId}, Order Date: ${convertDate(
            updateDate
          )}`
        );
        break;
      case "COMPLETED":
        triggerNotification(
          `Order has been completed!<br />Order ID: ${orderId}, Order Date: ${convertDate(
            updateDate
          )}`
        );
        break;
      case "CANCELLED":
        triggerNotification(
          `Order has been cancelled.<br />Order ID: ${orderId}, Order Date: ${convertDate(
            updateDate
          )}`
        );
        break;
      default:
        break;
    }
  };

  const triggerNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const handleServiceCall = (OrderId: number) => {
    console.log(`Received service call for Order ID: ${OrderId}`);
  };

  useSignalR({
    onOrderStatusUpdate: handleOrderStatusUpdate,
    onServiceCall: handleServiceCall,
  });

  const handleClickNotification = () => {
    if (shopId && tableId && orderId) {
      nav(`/order`);
    }
  };

  return (
    <>
      {showNotification && (
        <div
          className="fixed top-20 right-4 bg-orange-500 text-white p-4 rounded shadow cursor-pointer"
          onClick={handleClickNotification}
        >
          {notificationMessage}
        </div>
      )}
    </>
  );
};

export default OrderStatusComponent;
