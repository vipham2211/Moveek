import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



const DropdownMenuUser = () => {
  const classNames = (...classes: (string | undefined | null)[]): string => {
    return classes.filter(Boolean).join(" ");
  };
const router = useRouter()

  async function logout() {
  
    await fetch('/api/logout')
    router.push('/')
    router.refresh()
    
}

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex  text-sm focus:outline-none   ">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
           src={'/assets/no-avatar.png'}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        
            <Menu.Item >
              {({ active }) => (
                <Link
                  href={'/user/profile'}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                
                >
                 Quản lý tài khoản
                </Link>
              )}
            </Menu.Item>
            
            <Menu.Item >
              {({ active }) => (
                <Link
                  href={'/user/orders'}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                  
                >
               Lịch sử múa vé
                </Link>
              )}
            </Menu.Item>
            
            <Menu.Item >
              {({ active }) => (
            <button 
            className={classNames(
              active ? "bg-gray-100" : "",
              "block w-full text-left px-4 py-2 text-sm text-gray-700"
            )}
            onClick={logout}
             >
              Đăng xuất
             </button>
              )}
            </Menu.Item>
    
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenuUser;
