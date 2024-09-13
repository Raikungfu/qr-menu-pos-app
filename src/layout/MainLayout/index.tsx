import React from "react";
import { Toaster } from "@/components/ui/toaster"

import { Header, Sidebar } from "../components";

type MainLayoutProps = {
  children: React.ReactElement;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <section className="mt-[74px]">
        <Sidebar />
        <div className="ml-32">{children}</div>
      </section>
      <Toaster />
    </div>
  );
};

export default MainLayout;
