import React, { useState } from "react";
import { StatisticLayoutSidebar as Sidebar } from "../components";

type StatisticLayoutProps = {
  children: React.ReactNode;
};

const StatisticLayout = ({ children }: StatisticLayoutProps) => {
  const [open, setOpen] = useState(false);
  return (
    <main className="h-screen w-screen flex">
      <Sidebar open={open} setOpen={setOpen} />
      <section className={`w-screen duration-500`}>
        {children}
      </section>
    </main>
  );
};

export default StatisticLayout;
