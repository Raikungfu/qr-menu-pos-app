import config from "@/configs";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BestSeller = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="overflow-y-auto max-h-screen">
        <div className="h-[74px] bg-white w-full shadow-md flex items-center py-3 px-6 gap-8 fixed top-0">
          <Undo2
            size={32}
            className="cursor-pointer"
            onClick={() => navigate(config.routes.home)}
          />
          <h3 className="text-2xl font-semibold">Best Seller</h3>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
