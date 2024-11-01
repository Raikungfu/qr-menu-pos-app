import logo from "@/assets/logo.jpeg";
import { useAuth } from "@/auth/AuthContext";
// import { useAuth } from "@/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
const Header = () => {
  const { logout } = useAuth();
  return (
    <header className="h-[74px] bg-white w-full shadow-md flex items-center justify-between gap-20 px-5 fixed top-0 right-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-[70px] w-[70px]" />
        <h1 className="hidden md:inline-block text-2xl italic font-bold text-primary">
          POS
        </h1>
      </div>
      <div className="min-w-32 flex items-center gap-4">
        <Avatar className="hidden md:inline-block">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button onClick={() => logout()}>
          <LogOut size={28} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
