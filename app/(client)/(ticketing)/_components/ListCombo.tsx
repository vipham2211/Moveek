'use client'
import { decode } from '@/common.funcs';
import { ComboItemInterface } from '@/common.types';
import { setComboDataStore } from '@/redux/features/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import React, { useEffect } from 'react'

const ListCombo = () => {

	const comboDataStore = useAppSelector((state) => state.booking.comboData);

	const drinkData = comboDataStore.filter((combo) => {
	  return combo.items.some(
		(item: ComboItemInterface) => item.quantity > 0 && item.type === "drink"
	  );
	});
  
	const popcornData = comboDataStore.filter((combo) => {
	  return combo.items.some(
		(item: ComboItemInterface) => item.quantity > 0 && item.type === "popcorn"
	  );
	});
	const foodData = comboDataStore.filter((combo) => {
	  return combo.items.some(
		(item: ComboItemInterface) => item.quantity > 0 && item.type === "combo"
	  );
	});

	const dispatch = useAppDispatch();

	useEffect(()=>{
		let comboDataLocal = localStorage.getItem("comboData");
		
		if (comboDataLocal !== null) {
		  dispatch(
			setComboDataStore(
			  JSON.parse(decode(comboDataLocal, process.env.NEXT_PUBLIC_SECRET_KEY))
			)
		  );
		}
	},[dispatch])

	const renderItems = (arr: any, icon: string, title: string) => {
		return (
		  <div className="flex space-x-3 items-center justify-between w-full  ">
			<div className="flex items-center">
			  <div className="h-6 w-6 ">
				<Image
				  width={0}
				  height={0}
				  sizes="100vw"
				  alt="icon"
				  src={icon}
				  className="w-full h-full "
				/>
			  </div>
			  <p className="ml-3">{title}</p>
			</div>
	
			<div className=" flex flex-1 flex-wrap justify-end items-center  ">
			  {arr.map((combo: any) =>
				combo.items.map((item: ComboItemInterface, index: number) => {
				  if (item.quantity > 0)
					return (
					  <p key={index}>
						{index !== 0 && ", "}
						{item.shortName}
						{`(${item.quantity})`}
					  </p>
					);
				})
			  )}
			</div>
		  </div>
		);
	  };

  return (
	<div   className="border-b-2 relative border-dashed pb-5">
         
	{drinkData.length > 0 &&
	 <div className="flex mt-4 justify-between ">
   { renderItems(drinkData, `/assets/drink.svg`, `Đồ uống`)}
	  </div>
	  }
	{popcornData.length > 0 &&
	   <div className="flex mt-4 justify-between ">
	{ renderItems(popcornData, `/assets/popcorn.svg`, `Bắp rang`)}
	  </div>
	  }
	{foodData.length > 0 &&
	  <div className="flex mt-4 justify-between ">
	 { renderItems(foodData, `/assets/combo-food.svg`, `Combo`)}
	  </div>
	  }
<div  className={`w-12 h-12  bg-[#f9fbfd] rounded-full absolute -left-[3.1rem] -bottom-6  `}></div>
<div  className={`w-12 h-12 bg-[#f9fbfd] rounded-full absolute -right-[3.1rem] -bottom-6 `}></div>
</div>
  )
}

export default ListCombo