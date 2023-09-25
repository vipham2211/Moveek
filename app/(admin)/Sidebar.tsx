"use client";
import Image from "next/image";
import React from "react";
import MenuSidebar from "./MenuSidebar";

interface SidebarProps {
  openSidebar: boolean;
}

const Sidebar = ({ openSidebar }: SidebarProps) => {
  return (
    <div
      className={`${
        openSidebar ? `w-0` : `w-64`
      } shrink-0 min-h-screen  shadow-md bg-white transition-all duration-500 ease-in-out`}
    >
     <div className={`fixed ${ openSidebar ? `w-0` : `w-64`}  transition-all duration-500 ease-in-out  `}>
     <div className="py-5  ">
        <div className="flex px-4 space-x-2 justify-center items-center">
          <Image
            src={"/assets/logo-dashboard.png"}
            width={28}
            height={28}
            alt="logo"
          />
          <h2 className="text-gray-700 text-2xl font-semibold">Taildash</h2>
        </div>
      </div>
	  <MenuSidebar />
     </div>
   
     
    </div>
  );
};

export default Sidebar;
