"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";


interface LayoutProps {
  children: React.ReactNode;
}




const Layout = ({ children }: LayoutProps) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    
    <div className="flex w-full bg-dashboard text-[#595983] overflow-x-hidden">
      <Sidebar openSidebar={openSidebar} />
      <div className="flex flex-1 flex-col ">
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <main className="flex-1 pt-20 pr ">
          <div className="p-2">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
