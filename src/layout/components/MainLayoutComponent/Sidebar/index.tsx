import {
  ChartColumnDecreasing,
  House,
  Landmark,
  Settings,
  ShoppingCart,
  Store,
  Tablet,
} from "lucide-react";
import NavItem from "./NavItem";
import NavMenu from "./NavMenu";
import config from "@/configs";

const Sidebar = () => {
  return (
    <aside className="h-screen bg-white shadow-md fixed w-28">
      <NavMenu>
        <NavItem title="Trang chủ" to={config.routes.home} icon={<House />} />
        <NavItem title="Tại quầy" to={config.routes.atcounter} icon={<ShoppingCart />} />
        <NavItem title="Đơn hàng" to={config.routes.order} icon={<Tablet />} />
        <NavItem title="Cửa hàng" to={config.routes.shop} icon={<Store />} />
        <NavItem title="Thu chi" to={config.routes.revenue} icon={<Landmark />} />
        <NavItem
          title="Báo cáo"
          to={config.routes.overview}
          icon={<ChartColumnDecreasing />}
        />
        <NavItem title="Cài đặt" to={config.routes.setting} icon={<Settings />} />
      </NavMenu>
    </aside>
  );
};

export default Sidebar;
