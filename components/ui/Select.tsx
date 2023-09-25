import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import React,{Fragment} from 'react'


interface SelectProps {
	selected:{name:string,value:string} ,
	setSelected:(val:{name:string,value:string})=>void,
	arr:Array<{name:string,value:string} >
}

const Select = ({arr,selected,setSelected}:SelectProps) => {

  return (
	<Listbox value={selected}  onChange={setSelected}>
	<div className="relative mt-1">
	  <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white border border-indigo-200   px-3 py-2 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
		<span className="block truncate">{selected.name}</span>
		<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
		  <ChevronUpDownIcon
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
		<Listbox.Options className="absolute mt-1 max-h-60 w-full z-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
		  {arr.map((item, itemIdx) => (
			<Listbox.Option
			  key={itemIdx}
			  className={({ active }) =>
				`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
				  active
					? "bg-indigo-100 text-indigo-500"
					: "text-gray-900"
				}`
			  }
			  value={item}
			>
			  {({ selected }) => (
				<>
				  <span
					className={`block truncate ${
					  selected ? "font-medium" : "font-normal"
					}`}
				  >
					{item.name}
				  </span>
				  {selected ? (
					<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-500">
					  <CheckIcon
						className="h-5 w-5"
						aria-hidden="true"
					  />
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

export default Select