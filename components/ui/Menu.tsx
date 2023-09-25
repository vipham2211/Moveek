'use client'
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface MenuProps {
  navigation: Array<{ name: string, href: string }>
  padding:string
}

const Menu = ({navigation,padding}:MenuProps) => {


  const pathname = usePathname();
  const classNames = (...classes: (string | undefined | null)[]): string => {
	  return classes.filter(Boolean).join(" ");
	};
  return (
    <Disclosure as="nav" className="-mb-6 " >
    {() => (
    <>
     
      <div className="relative  flex h-16 items-center justify-between ">
  
        <div className="  lg:flex   items-center justify-center lg:items-stretch lg:justify-start">
        <div className="  lg:block">
          <div className="flex space-x-2 text-sm font-medium">
          {navigation.map((link) => {
           
            const isActive = pathname === link.href;

            return (
            <Link
              key={link.name}
              href={link.href}
              className={classNames(
              isActive
                ? " text-slate-800 border-b border-[#2c7be5]"
                : "text-menu  hover:text-menuHover",
              `px-2 ${padding} `
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {link.name}
            </Link>
            );
          })}
          </div>
        </div>
        </div>

     

     
      </div>
   

    </>
    )}
  </Disclosure>
  )
}

export default Menu