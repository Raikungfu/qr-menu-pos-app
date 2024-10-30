import {
  ChartColumnDecreasing,
  Landmark,
  Settings,
  ShoppingCart,
  Store,
  Tablet,
} from "lucide-react";
import config from "@/configs";
import { NavLink } from "react-router-dom";

const menuItem = [
  {
    title: "Tại quầy",
    icon: <ShoppingCart size={45} />,
    link: config.routes.atcounter,
  },
  {
    title: "Đơn hàng",
    icon: <Tablet size={45} />,
    link: config.routes.order,
  },
  {
    title: "Cửa hàng",
    icon: <Store size={45} />,
    link: config.routes.shop,
  },
  {
    title: "Thu chi",
    icon: <Landmark size={45} />,
    link: config.routes.revenue,
  },
  {
    title: "Báo cáo",
    icon: <ChartColumnDecreasing size={45} />,
    link: config.routes.overview,
  },
  {
    title: "Cài đặt",
    icon: <Settings size={45} />,
    link: config.routes.setting,
  },
];

const Home = () => {
  return (
   <div className="w-full max-h-screen overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItem.map((item, index) => (
          <NavLink key={index} to={item.link} className="flex items-center justify-center border-2 p-12 text-2xl rounded-md">
            <div className="flex flex-col items-center justify-center gap-2">
              <span>{item.icon}</span>
              {item.title}
            </div>
          </NavLink>
        ))}
      </div>
   </div>
  );
};

export default Home;
