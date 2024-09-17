import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  title: string;
  className?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  open: boolean;
};

const NavItem = ({ to, className, icon, title, open }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center text-base gap-3.5 font-medium p-2 rounded-lg ${isActive ? "bg-primary text-white" : "text-black"}`
      }
    >
      <div>{React.createElement(icon, { size: 32 })}</div>
      <h2 className={className}>{title}</h2>
      <h2
        className={`${
          open && "hidden"
        } absolute left-48 bg-black font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
      >
        {title}
      </h2>
    </NavLink>
  );
};

export default NavItem;
