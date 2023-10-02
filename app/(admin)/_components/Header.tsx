"use client";
import DropdownMenuUser from "@/components/ui/DropdownMenu";
import {
  Bars3BottomLeftIcon,
  Bars3Icon,
  BellIcon,
  Cog8ToothIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface HeaderProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}


const Header = ({ openSidebar, setOpenSidebar }: HeaderProps) => {

	const [userLogin,setUserLogin] = useState<any>({})


	  useEffect(()=>{
		const getUserLogin = async () => {
			const res = await fetch('/api/getUser').then(res => res.json())
			const userLogin = res.userLogin
			setUserLogin(userLogin)
			
		  };
		  getUserLogin()
	  },[])
	

  return (
    <div
      className={`fixed flex top-0   ${
        openSidebar ? `left-0 w-full` : ` left-64 w-[calc(100%-16rem)]`
      }   justify-between items-center  px-6 py-2 bg-white z-20 shadow-sm transition-all duration-500 ease-in-out  `}
    >
      <div className="flex items-center">
        {openSidebar ? (
          <Bars3Icon
            className="w-8 h-8 cursor-pointer text-[#141430]"
            onClick={() => setOpenSidebar(false)}
          />
        ) : (
          <Bars3BottomLeftIcon
            className="w-8 h-8 cursor-pointer text-[#141430]"
            onClick={() => setOpenSidebar(true)}
          />
        )}

        <div className="hidden lg:flex flex-wrap mx-5 items-stretch w-full relative">
          <input
            type="text"
            placeholder="Search..."
            className="flex-shrink flex-grow w-[190px] max-w-full  leading-5 relative text-sm py-2 px-4 rounded-l  text-gray-800 bg-dashboard overflow-x-auto focus:outline-none border border-dashboard focus:border-dashboard focus:ring-0 "
          />
          <div className="flex -mr-px">
            <button className="flex items-center py-2 px-4 rounded-r leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className={`flex items-center ${!openSidebar && `hidden sm:flex`}`}>
        <div className="px-4 py-3 cursor-pointer">
          <Cog8ToothIcon className="w-6 h-6" />
        </div>
        <div className="px-4 py-3 relative cursor-pointer">
          <EnvelopeIcon className="w-6 h-6" />
          <span className="absolute flex justify-center top-2 right-1 px-1 rounded-full text-xs bg-pink-500">
            {" "}
            <span className="text-white">3</span>
          </span>
        </div>
        <div className="px-4 py-3 relative cursor-pointer">
          <BellIcon className="w-6 h-6 " />
          <span className="absolute flex justify-center top-2 right-2 px-1 rounded-full text-xs bg-pink-500">
            {" "}
            <span className="text-white">1</span>
          </span>
        </div>
        <div className="flex items-center space-x-1 px-3 cursor-pointer">
        <DropdownMenuUser/>
        <span className="hidden md:block text-[14px]">{userLogin.taiKhoan ? userLogin.taiKhoan : ''}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
