import { Button } from "@/components/ui/button";
import { Order, OrderItem } from "@/constants/orders";
import { useToast } from "@/hooks/use-toast";

interface OrderItemCardProps {
  order: Order;
  orderItems: OrderItem[];
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ order, orderItems }) => {
  const { toast } = useToast();
  return (
    <div className="scrollable overflow-y-auto pb-80 h-full">
      <div className="">
        <p className="bg-[#c4ddf2] p-2 text-xl font-semibold">
          Thông tin đơn hàng
        </p>
        <div className="flex flex-row justify-between p-4 font-semibold text-xl">
          <div>
            <span className="text-[#80C456]">Order - {order.Code}</span>
            <span className="text-[#69AEFF]"> (Web order) - </span>
            <span className="text-[#80C456]">Table - {order.Table}</span>
          </div>
          <span>{`${new Date(order.Time).toLocaleTimeString("en-GB", {
            hour12: false,
          })} ${new Date(order.Time).toLocaleDateString()}`}</span>
        </div>
        <div>
          <p className="bg-[#c4ddf2] p-2 text-xl font-semibold">
            Danh sách món (
            <span className="text-blue-500">{order.Quantity} món</span>)
          </p>
          <div className="flex flex-col gap-4 p-6 scrollable overflow-y-auto pb-80">
            {orderItems.map((child, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center text-gray-600 font-medium gap-4"
              >
                <div className="flex flex-row items-center md:items-start w-full md:w-2/3">
                  <img
                    src={child.Image}
                    alt={child.Name}
                    className="w-20 h-20 object-cover rounded-md mb-2"
                  />
                  <div className="flex flex-col justify-start self-center">
                    <p className="pl-2 md:pl-4 text-lg font-semibold">
                      {child.Name} x {child.Quantity}
                    </p>
                    <ul className="pl-2 md:pl-4 list-disc text-sm text-gray-500 font-normal">
                      <li>
                        {child.SizeOptions} - Note: {child.Description}
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-right text-lg font-semibold">
                  {child.ItemPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            ))}

            <div className="flex justify-between font-medium">
              <h3>Thanh toán 100%</h3>
              <h3>
                Tổng: <span className="text-[#80C456]">{order.Price}</span>
              </h3>
            </div>
            <div className="flex justify-end gap-72">
              <Button
                variant="blue"
                size="lg"
                onClick={() => {
                  toast({
                    title: "Đã hoàn thành",
                    description: "Thông báo gửi đến khách hàng",
                  });
                }}
              >
                Hoàn thành
              </Button>
              <Button
                variant="blue"
                size="lg"
                onClick={() => {
                  toast({
                    title: "Báo nhận món",
                    description: "Thông báo gửi đến khách hàng",
                  });
                }}
              >
                Báo nhận món
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
