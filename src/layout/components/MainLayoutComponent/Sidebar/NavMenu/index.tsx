import React from "react";

type MenuProps = {
  children: React.ReactNode;
};

const NavMenu: React.FC<MenuProps> = ({ children }) => {
  return <div className="flex items-center flex-col gap-2 duration-500">{children}</div>;
};

export default NavMenu;
