import useSignalR from "@/hooks/Hubs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderStatusComponent: React.FC = () => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [orderId, setOrderId] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);
  const nav = useNavigate();

  const handleOrderStatusUpdate = (
    orderId: number,
    status: string,
    updateDate: Date,
    paymentMethod: string
  ) => {
    setOrderId(orderId);
    triggerNotification(
      `Order ID: ${orderId}, Status: ${status} \nPayment method: ${updateDate}\n Time: ${paymentMethod}`
    );
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
    //nav
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
