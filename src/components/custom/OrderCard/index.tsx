import { Order } from "@/constants/orders";

type OrderCardProps = {
  data: Order;
  onClick: () => void;
  active?: boolean;
};

const OrderCard = ({ data, onClick, active = false }: OrderCardProps) => {
  return (
    <div
      className={`mt-4 w-full border rounded-xl ${active ? 'border-black' : 'border-[#c4ddf2]'} px-8 py-3 cursor-pointer transition-all ease-in-out`}
      onClick={onClick}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg">{data.code}</h3>
          <div className="flex gap-3 items-center">
            <p className="text-gray-400 text-xs">{data.time}</p>
            <p className="text-[#69AEFF] font-semibold">{data.status}</p>
          </div>
        </div>
        <h4 className="text-[#80C456] font-semibold">
          {data.price}{" "}
          <span className="text-[#69AEFF] font-medium">
            ({data.quantity} món)
          </span>
        </h4>
        <div className="flex justify-between">
          <p className="text-gray-400">1 phút trước</p>
          <h4 className="font-medium">{data.table}</h4>
        </div>
        <h3 className="font-semibold">{data.paymentStatus}</h3>
      </div>
    </div>
  );
};

export default OrderCard;
