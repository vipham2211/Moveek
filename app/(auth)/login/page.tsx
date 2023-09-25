import { Metadata } from 'next';
import React from 'react'
import Login from './Login';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Đăng nhập | Moveek",
  description:
    "mua vé, mua vé trực tuyến, mua vé galaxy, mua vé cgv, mua vé bhd, mua vé beta, mua vé cinestar, mua vé mega, mua vé starlight, mua vé rio, mua vé touch, mua vé ddc, mua vé đống đa, mua vé cinemax, đặt vé cgv, đặt vé bhd, đặt vé beta, đặt vé cinestar, đặt vé mega, đặt vé starlight, đặt vé rio, đặt vé touch, đặt vé ddc, đặt vé đống đa, đặt vé cinemax",
};



const page = () => {
  return (
	<div className='max-w-6xl mx-auto min-h-screen flex flex-col md:flex-row   items-center   '>
   
    <div className='w-full md:w-6/12 md:max-w-[451px] px-3 order-2 md:order-1'>
    <Login/>
    </div>
    
    <div className="w-full md:w-6/12 flex justify-center  order-1 md:order-2 ">
        <Image
          src={`/assets/mascot.png`}
          width={262}
          height={236}
          alt="mascot"
          priority
        />
      </div>
  </div>
  )
}

export default page