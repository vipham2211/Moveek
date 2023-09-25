'use client'
import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useModal } from "@/common.stateFuncs"; 
import Search from "@/components/ui/Search";
import DropdownMenuUser from "@/components/ui/DropdownMenu";
import Modal from "@/components/ui/Modal";
import LoginComponent from "../shared/LoginComponent";



interface DisclosureComponentProps {
	token:string
}


const DisclosureComponent = ({token}:DisclosureComponentProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const pathname = usePathname();
	const navigation = [
	  { name: "Mua vé", href: "/" },
	  { name: "Lịch chiếu", href: "#" },
	  { name: "Phim", href: "/phim" },
	  { name: "Rạp", href: "#" },
	  { name: "Tin tức", href: "#" },
	  { name: "Cộng đồng", href: "#" },
	];
  
	const classNames = (...classes: (string | undefined | null)[]): string => {
	  return classes.filter(Boolean).join(" ");
	};


  
	return (
		<Disclosure as="nav" className="border-b">
		  {({ open }) => (
			<>
			  <div className="mx-auto max-w-6xl px-3  ">
				<div className="relative flex h-16 items-center justify-between">
				  <div className=" flex items-center lg:hidden">
					{/* Mobile menu button*/}
					<Disclosure.Button className="relative items-center justify-center rounded-md p-2 text-menu  focus:outline-none  ">
					  <span className="absolute -inset-0.5" />
					  <span className="sr-only">Open main menu</span>
					  {open ? (
						<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
					  ) : (
						<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
					  )}
					</Disclosure.Button>
				  </div>
				  <div className=" hidden lg:flex   items-center justify-center lg:items-stretch lg:justify-start">
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
								  ? " text-red-500"
								  : "text-menu  hover:text-menuHover",
								"rounded-md px-2 py-3  "
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
	
				  <div className="flex flex-shrink-0 items-center ">
					<Link href={"/"} >
					  <Image
						src="/logo.svg"
						alt="Moveek"
						priority={true}
						width={92}
						height={24}
					
					  />
					</Link>
				  </div>
				  <Search className="hidden lg:block" />
	
				  <div className=" flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
					{token  ? (
					  <DropdownMenuUser   />
					) : (
					  <>
						<UserIcon
						  className="h-4 w-4 ml-2 cursor-pointer"
						  color="gray"
						  onClick={openModal}
						/>
						<Modal
						  isOpen={isOpen}
						  onClose={closeModal}
						  position={"leftSidebar"}
						 heightStyle="heightFullSidebar"
						 width="max-w-[350px]"
						>
						  <LoginComponent onClose={closeModal} />
						</Modal>
					  </>
					)}
				  </div>
				</div>
			  </div>
	
			  <Disclosure.Panel className="lg:hidden ">
				<div className="space-y-1 px-2 pb-3 pt-2 ">
				  <Search />
				  {navigation.map((link) => {
					const isActive = pathname === link.href;
					return (
					  <Disclosure.Button
						key={link.name}
						as="a"
						href={link.href}
						className={classNames(
						  isActive
							? " text-red-500"
							: "text-menu  hover:text-menuHover",
						  "block rounded-md px-3 py-2  text-sm"
						)}
						aria-current={isActive ? "page" : undefined}
					  >
						{link.name}
					  </Disclosure.Button>
					);
				  })}
				</div>
			  </Disclosure.Panel>
			</>
		  )}
		</Disclosure>
	  );
}

export default DisclosureComponent