import React from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import config from "@/configs";
import { Label } from "@/components/ui/label";
import PaymentKeypad from "./PaymentKeyPad";
type PaymentProps = {};

const Payment = ({}: PaymentProps) => {
  const navigate = useNavigate();
  const [moneyChange, setMoneyChange] = React.useState<number>(0);
  return (
    <div className="h-screen w-full">
      <header className="h-[74px] bg-white w-full shadow-md flex items-center py-3 px-6 gap-10 fixed top-0 right-0 left-0 z-50">
        <Undo2
          size={32}
          className="cursor-pointer"
          onClick={() => navigate(config.routes.home)}
        />
        <h3 className="text-2xl font-semibold">Thanh toán</h3>
      </header>
      <main className="grid grid-cols-2 h-full w-full mt-8">
        <div className="bg-[#ebf6fc] flex flex-col gap-3 h-full pb-24 border-r">
          <div className="flex justify-between p-3 pb-0 items-center font-semibold min-h-[34px]">
            <h3>Tạm tính</h3>
            <h3>20.000</h3>
          </div>
          <div className="flex flex-col px-2 py-6 bg-white gap-2 min-h-[140px]">
            <div className="flex gap-2 items-center p-2">
              <Label htmlFor="" className="text-sm">
                Giảm giá
              </Label>
              <Input placeholder="0" type="number" className="w-1/3" />%
              <Input placeholder="0" type="number" className="w-1/3" />đ
              <Button>DS Giảm giá</Button>
            </div>
            <div className="flex p-2 items-center gap-3">
              <Label className="text-sm">Lý do</Label>
              <Input placeholder="Nhập lý do" className="w-11/12" />
            </div>
          </div>
          <div className="flex flex-col px-2 py-6 bg-white gap-2 min-h-[140px]">
            <div className="flex gap-2 items-center p-2">
              <Label htmlFor="" className="text-sm">
                Phụ thu
              </Label>
              <Input placeholder="0" type="number" className="w-1/3" />%
              <Input placeholder="0" type="number" className="w-1/3" />đ
              <Button>DS Phụ thu</Button>
            </div>
            <div className="flex p-2 items-center gap-3">
              <Label className="text-sm">Lý do</Label>
              <Input placeholder="Nhập lý do" className="w-11/12" />
            </div>
          </div>
          <div className="flex justify-between bg-[#78d0ff] p-3 items-center font-semibold min-h-[34px]">
            <h3>Tổng cộng</h3>
            <h3>20.000</h3>
          </div>
          <div className="flex bg-white flex-col p-4 gap-6 min-h-[220px]">
            <div className="flex p-2 gap-6">
              <Label className="text-sm">Ghi chú hóa đơn</Label>
              <Input className="w-[90%]" />
            </div>
            <div className="flex justify-around">
              <Button className="p-10">
                <DollarSign size={20} />
                <h3 className="text-lg">Tiền mặt</h3>
              </Button>
              <Button className="p-10" variant="outline">
                <DollarSign size={20} />
                <h3 className="text-lg">Chuyển khoản</h3>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-24 mb-3">
          <div className="flex justify-between text-lg font-medium">
            <h3>Trả tiền cho khách</h3>
            <h3>{moneyChange.toLocaleString()}đ</h3>
          </div>
          <PaymentKeypad onAmountChange={setMoneyChange} />
        </div>
      </main>
    </div>
  );
};

export default Payment;
