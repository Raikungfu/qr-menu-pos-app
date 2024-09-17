import React from "react";
import { Toaster } from "@/components/ui/toaster"

import { MainLayoutHeader as Header, MainLayoutSidebar as Sidebar } from "../components";

type MainLayoutProps = {
  children: React.ReactElement;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <main className="mt-[74px]">
        <Sidebar />
        <section className="ml-32">{children}</section>
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
