import { Switch } from '@headlessui/react'
import React from 'react'

interface SwitchComponentProps {
	value:boolean
	setValue:(val:boolean)=> void
}

const SwitchComponent = ({value,setValue}:SwitchComponentProps) => {

  return (
	<Switch
	checked={value}
	onChange={setValue}
	className={`${value ? "bg-indigo-700" : "bg-indigo-400"}
relative inline-flex h-7 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
  >
	<span className="sr-only">Use setting</span>
	<span
	  aria-hidden="true"
	  className={`${value ? "translate-x-9" : "translate-x-0"}
  pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
	/>
  </Switch>
  )
}

export default SwitchComponent