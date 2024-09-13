import { NavLink } from "react-router-dom";

type NavItemProps = {
  title: string;
  to: string;
  icon?: React.ReactNode;
};
const NavItem: React.FC<NavItemProps> = ({ title, to, icon }) => {
  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center bg-[#ebf6fc] justify-center flex-col first:mt-2 cursor-pointer h-[78px] rounded-lg w-4/5 font-medium transition-colors duration-200 ease-in-out
        ${isActive ? "bg-primary text-white" : ""}`
        }
      >
        <span>{icon}</span>
        <span>{title}</span>
      </NavLink>
    </>
  );
};

export default NavItem;
