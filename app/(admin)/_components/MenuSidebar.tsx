"use client";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FilmIcon,
  HomeIcon,
  UsersIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const MenuSidebar = () => {
  const navigation = [
    {
      name: "Dashboards",
      icon: <HomeIcon className="w-[18px] h-[18px] mr-2" />,
      path: "dashboards",
      items: [
        { name: "CMS", href: `#` },
        { name: "Analytics", href: `#` },
        { name: "CRM", href: `#` },
        { name: "Hosting", href: `#` },
        { name: "Saas", href: `#` },
        { name: "Sales", href: `#` },
        { name: "Marketing", href: `#` },
      ],
    },
    {
      name: "Moveek",
      icon: <WindowIcon className="w-[18px] h-[18px] mr-2" />,
      path: "/",
    },
    {
      name: "Users",
      path: "manage-users",
      icon: <UsersIcon className="w-[18px] h-[18px] mr-2" />,
      items: [
        { name: "List", href: `/manage-users/list` },
        { name: "Create", href: `/manage-users/create` },
      ],
    },
    {
      name: "Movies",
      path: "manage-movies",
      icon: <FilmIcon className="w-[18px] h-[18px] mr-2" />,
      items: [
        { name: "List", href: `/manage-movies/list` },
        { name: "Create", href: `/manage-movies/create` },
      ],
    },
    ,
  ];
  const [selected, setSelected] = useState<number | null>(null);
  const [showMenu, setShowmenu] = useState(false);

  const pathname = usePathname();

  return (
    <ul className="pl-1 overflow-hidden">
      {navigation.map((item: any, index) => {
        return (
          <li key={index} className="relative">
            {!item.items ? (
              <Link
                href={item.path}
                className="flex px-6 py-[10px] cursor-pointer select-none hover:text-indigo-500  items-center "
              >
                {item.icon}
                {item.name}
              </Link>
            ) : (
              <div
                className="flex px-6 py-[10px] cursor-pointer select-none  justify-between items-center "
                onClick={() => {
                  if (selected === index) {
                    setSelected(null);
                    return setShowmenu(false);
                  }
                  setSelected(index);
                  setShowmenu(true);
                }}
              >
                <div
                  className={`flex  items-center  hover:text-indigo-500 ${
                    selected === index && showMenu && `text-indigo-500`
                  }`}
                >
                  {item.icon}
                  {item.name}
                </div>

                {selected === index && showMenu ? (
                  <ChevronDownIcon className={`w-4 h-4 `} />
                ) : (
                  <ChevronRightIcon className={`w-4 h-4`} />
                )}
              </div>
            )}

            {item.items && (
              <ul
                className={`pl-7 py-[2px]  ${
                  selected === index && showMenu
                    ? "transition-all duration-200 ease-out scale-100 opacity-100"
                    : "h-0 scale-95 opacity-0"
                }`}
              >
                {item.items.map(
                  (link: { name: string; href: string }, index: number) => {
                    let active = pathname.includes(link.href);
                    return (
                      <li key={index}>
                        <Link
                          href={link.href}
                          className={`px-6 py-2 block hover:text-indigo-500 ${
                            active && `text-indigo-500`
                          }`}
                       
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuSidebar;
