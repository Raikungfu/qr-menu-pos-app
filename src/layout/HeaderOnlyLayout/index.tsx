import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "../components/MainLayoutComponent/Header";

const HeaderOnlyLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="h-screen">
      <Header />
      <main className="w-full mt-[74px] px-52 py-10">
        {children}
        <Toaster />
      </main>
    </div>
  );
};

export default HeaderOnlyLayout;
