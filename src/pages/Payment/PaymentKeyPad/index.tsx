import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

type PaymentKeypad = {
  onAmountChange: (amount: number) => void;
};

const PaymentKeypad = ({ onAmountChange }: PaymentKeypad) => {
  const [display, setDisplay] = useState<string>("0");

  const handleClick = (value: string) => {
    setDisplay((prev) => {
      if (prev === "0" && value !== ".") {
        return value;
      }
      if (value === "." && prev.includes(".")) {
        return prev;
      }
      return prev + value;
    });
    onAmountChange(parseFloat(display + value));
  };

  const handleClear = () => {
    setDisplay("0");
    onAmountChange(0);
  };

  const handleBackspace = () => {
    setDisplay((prev) => {
      const newValue = prev.slice(0, -1);
      return newValue === "" ? "0" : newValue;
    });
    onAmountChange(parseFloat(display.slice(0, -1)) || 0);
  };

  return (
    <div className="space-y-2">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <span className="text-3xl font-bold">{display}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "000", "."].map(
          (num) => (
            <Button
              key={num}
              variant="outline"
              onClick={() => handleClick(num)}
              className="text-xl py-4"
            >
              {num}
            </Button>
          )
        )}
        <Button
          variant="secondary"
          className="col-span-1 text-xl py-4"
          onClick={handleBackspace}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="secondary"
          className="col-span-2 text-xl py-4"
          onClick={handleClear}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default PaymentKeypad;
