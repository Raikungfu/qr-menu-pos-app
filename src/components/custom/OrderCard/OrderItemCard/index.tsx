import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


const OrderItemCard = () => {
  const { toast } = useToast();
  return (
    <div className="flex flex-col">
      <div className="">
        <p className="bg-[#c4ddf2] p-2 text-xl font-semibold">
          Thông tin đơn hàng
        </p>
        <div className="p-4 font-semibold text-xl">
          <span className="text-[#80C456]">Order-120</span>
          <span className="text-[#69AEFF]"> (Web order) - </span>
          <span className="text-[#80C456]">Tầng 2 - Table 3 - </span>
          <span>16/8/2024 </span>
          <span>17:00</span>
        </div>
        <div>
          <p className="bg-[#c4ddf2] p-2 text-xl font-semibold">
            Danh sách món (<span className="text-blue-500">1 món</span>)
          </p>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex justify-between text-gray-600 font-medium">
              <div className="flex flex-col">
                <p>1x Bạc sỉu (Size S)</p>
                <ul className="pl-10 list-disc text-sm text-gray-500 font-normal">
                  <li>Không đường</li>
                  <li>Không đá</li>
                </ul>
              </div>
              <p>20.000đ</p>
            </div>
            <div className="flex justify-between font-medium">
              <h3>
                Tổng: <span className="text-[#80C456]">20.000đ</span>
              </h3>
              <h3>Thanh toán 100%</h3>
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
