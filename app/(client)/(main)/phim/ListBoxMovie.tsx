'use client'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'

interface ListBoxMovieProps {
	selected:any,
	setSelected:(value: any) => void,
	options:any
}

const ListBoxMovie = ({selected,options,setSelected}:ListBoxMovieProps) => {


  return (
	<Listbox value={selected} onChange={setSelected}>
	<div className="relative mt-1 ">
	  <Listbox.Button className="relative w-full   rounded-lg cursor-pointer bg-white hover:bg-[#12263f] hover:text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
		<span className="block truncate">{selected.name}</span>
		<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
		  <ChevronUpDownIcon
			className="h-5 w-5   "
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
		<Listbox.Options className="absolute z-10  mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
		  {options.map((option:any, optionIdx:number) => (
			<Listbox.Option
			  key={optionIdx}
			  className={({ active }) =>
				`relative  cursor-pointer select-none py-2 pl-10 pr-4 ${
				  active ? ' text-gray-900' : 'text-textGray'
				}`
			  }
			  value={option}
			>
			  {({ selected }) => (
				<>
				  <span
					className={`block truncate ${
					  selected ? 'font-medium text-gray-700' : 'font-normal'
					}`}
				  >
					{option.name}
					
				  </span>
				  {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
				</>
			  )}
			</Listbox.Option>
		  ))}
		</Listbox.Options>
	  </Transition>
	</div>
  </Listbox>
  )
}

export default ListBoxMovie