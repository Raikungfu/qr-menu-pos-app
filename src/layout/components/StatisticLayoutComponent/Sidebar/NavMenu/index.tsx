import { Menu } from "lucide-react";
import React from "react";

type NavMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const NavMenu = ({ open, setOpen, children }: NavMenuProps) => {
  return (
    <div
      className={`min-h-screen ${
        open ? "w-72" : "w-[84px]"
      } px-4 pt-3 border-r duration-500 sticky left-0 bg-white z-100`}
    >
      <div
        className={`py-3 flex ${
          open ? "justify-end" : "justify-center"
        } items-center`}
      >
        <Menu
          size={32}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-6 relative">{children}</div>
    </div>
  );
};

export default NavMenu;
