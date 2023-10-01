'use client'
import useDebounce from '@/components/useDebounce';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface SearchTableProps{
	limit:number,
	keyword:string|undefined,
	href:string
}

const SearchTable = ({limit,keyword,href}:SearchTableProps) => {
	const router = useRouter();
	const [value,setValue] = useState(keyword)
	const debounceSearchValue = useDebounce(value,500)
	
	 

	const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>)=>{
		setValue(e.target.value)
	
	  }
	  useEffect(()=>{
		if (debounceSearchValue) {
			router.push(
			  `/${href}/list?page=${1}&limit=${limit}&keyword=${debounceSearchValue}`
			);
		  } else {
			router.push(`/${href}/list?page=${1}&limit=${limit}`);
		  }
	  },[router,debounceSearchValue,limit,href])

  return (
	<input
	type="text"
	value={value}
	onChange={handleOnchange}
	placeholder="Search..."
	className="px-4 py-2 rounded-[0.25rem] border border-[#eff0fe] focus:outline-none focus:border-[#e0e0fc]  bg-[#F6F5FF]"
  />
  )
}

export default SearchTable