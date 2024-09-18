import { Order } from "@/constants/orders";

type OrderCardProps = {
  data: Order;
  onClick: () => void;
  active?: boolean;
};

const formatTimeAgo = (date: string) => {
  const now = new Date();
  const timeDifference = Math.floor(
    (now.getTime() - new Date(date).getTime()) / 60000
  );

  if (timeDifference < 1) return "Vừa xong";
  if (timeDifference < 60) return `${timeDifference} phút trước`;
  const hours = Math.floor(timeDifference / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);

  if (days < 30) return `${days} ngày trước`;
  if (days < 365) {
    const month = Math.floor(days / 30);
    return `${month} tháng trước`;
  }

  const year = Math.floor(days / 365);
  return `${year} năm trước`;
};

const OrderCard = ({ data, onClick, active = false }: OrderCardProps) => {
  return (
    <div
      className={`mt-4 w-full border rounded-xl ${
        active ? "border-black" : "border-[#c4ddf2]"
      } px-8 py-3 cursor-pointer transition-all ease-in-out`}
      onClick={onClick}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg">Order - {data.Code}</h3>
          <div className="flex gap-3 items-center">
            <p className="text-gray-400 text-xs">{`${new Date(
              data.Time
            ).toLocaleTimeString("en-GB", { hour12: false })}`}</p>
            <p className="text-[#69AEFF] font-semibold">{data.Status}</p>
          </div>
        </div>
        <h4 className="text-[#80C456] font-semibold">
          {Number(data.Price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}{" "}
          <span className="text-[#69AEFF] font-medium">
            ({data.Quantity} món)
          </span>
        </h4>
        <div className="flex justify-between">
          <p className="text-gray-400">{formatTimeAgo(data.Time)}</p>
          <h4 className="font-medium">Table - {data.Table}</h4>
        </div>
        <h3 className="font-semibold">{data.PaymentStatus}</h3>
      </div>
    </div>
  );
};

export default OrderCard;
