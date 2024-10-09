import logo from "@/assets/logo.jpeg";
const Header = () => {
  return (
    <header className="h-[74px] bg-white w-full shadow-md flex items-center gap-20 px-5 fixed top-0 right-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-[70px] w-[70px]" />
        <h1 className="text-2xl italic font-bold text-primary">POS</h1>
      </div>
      {/* <div className="basis-1/2">
        <div className="relative">
          <Input placeholder="Search" />
          <Search size={20} className="absolute top-2 right-3 cursor-pointer" />
        </div>
      </div> */}
    </header>
  );
};

export default Header;
