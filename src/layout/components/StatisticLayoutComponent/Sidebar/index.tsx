import { useState } from "react";
import {
  Boxes,
  ChartNoAxesCombined,
  FileText,
  PackageOpen,
  ReceiptText,
} from "lucide-react";
import NavMenu from "./NavMenu";
import NavItem from "./NavItem";
import config from "@/configs";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const navItems = [
  {
    to: config.routes.overview,
    title: "Tổng quan",
    icon: FileText,
  },
  {
    to: config.routes.business,
    title: "Chỉ số kinh doanh",
    icon: ChartNoAxesCombined,
  },
  {
    to: config.routes.bestseller,
    title: "Hàng bán chạy",
    icon: Boxes,
  },
  {
    to: config.routes.receipt,
    title: "Hóa đơn",
    icon: ReceiptText,
  },
  {
    to: config.routes.topping,
    title: "Topping",
    icon: PackageOpen,
  },
];

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <>
      <NavMenu open={open} setOpen={setOpen}>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            to={item.to}
            title={item.title}
            icon={item.icon}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 hidden"
            }`}
            open={open}
          />
        ))}
      </NavMenu>
    </>
  );
};

export default Sidebar;
