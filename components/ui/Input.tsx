'use client'
import React, {  useEffect, useState } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
interface InputProps {
	name:string,
	type:string,
	disabled?:boolean,
	defaultValue?:string,
	className?:string,
	[key: string]: any,
	theme?: 'dashboard' |'default'
}

const Input = ({name,type,disabled=false,defaultValue='',className,theme='default',...props}:InputProps) => {

	const { pending } = useFormStatus()
	const [value,setValue] =useState(defaultValue)

	const BORDER_COLOR = {
		DEFAULT:theme ==='dashboard'?'border-indigo-200': "border-gray-300",
		FOCUS:theme ==='dashboard'?'border-gray-300': "border-blue",
	  };
	  const [boderColor, setBorderFocus] = useState(BORDER_COLOR.DEFAULT);
	
	  const handleFocus = () => {
		setBorderFocus(BORDER_COLOR.FOCUS);
	   
	  };
	
	  const handleBlur = () => {
		setBorderFocus(BORDER_COLOR.DEFAULT);
	  };
	  const handleOnchange = (e:any)=>{
		setValue(e.target.value)
	  }

	 useEffect(()=>{
		if(pending ){
			setValue(defaultValue)
		}
	 },[pending,defaultValue])

  return (
	<input
	name={name}
	type={type}
	value={value}
	onFocus={handleFocus}
	onBlur={handleBlur}
	onChange={handleOnchange}
	className={`py-2 px-3 w-full ${disabled && `text-[#95aac9] cursor-not-allowed`} ${className}  border   focus:outline-none text-sm bg-body rounded-md   ${boderColor}`}
	disabled={disabled}
	required
	{...props}	
  />
  )
}

export default Input