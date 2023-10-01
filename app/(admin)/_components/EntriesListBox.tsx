"use client";
import { Listbox, Transition } from "@headlessui/react";
import {  ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

interface EntriesListBoxProps {
  limit:number,
  setLimit : (val: number ) => void;
 keyword:string|undefined
 currentPage:number
 entries:number[]
 href:string
}

const EntriesListBox = ({entries,limit,setLimit,keyword,currentPage,href}:EntriesListBoxProps) => {
 
  let keywordParam = keyword ? `&keyword=${keyword}` : '';
  const router = useRouter()
  return (
    <Listbox value={limit} onChange={setLimit}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full min-w-[76px] cursor-pointer rounded-[0.25rem] bg-[#F6F5FF]  border border-[#eff0fe]    py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 	">
            <span className="block truncate">{limit}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-[#F6F5FF] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
              {entries.map((entrie, id) => (
                <Listbox.Option
                  key={id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-1 text-center  ${
                      active ? 'bg-indigo-500 text-white' : 'text-[#595983]'
                    }`
                  }
                  value={entrie}
                >
                  {({ selected }) => (
                    <>
                      <span
                        onClick={()=>limit !==entrie &&  router.push(`/${href}/list?page=${currentPage}&limit=${entrie}${keywordParam}`)}
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {entrie}
                      </span>
                     
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
  );
};

export default EntriesListBox;
