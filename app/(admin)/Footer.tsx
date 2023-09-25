import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between   bg-white p-6 shadow-md z-50  '>
      <div className='flex space-x-2 justify-center md:justify-start'>
      <p className='hover:text-indigo-500 cursor-pointer'>Support</p>
      <p className='hover:text-indigo-500 cursor-pointer'>Help Center</p>
      <p className='hover:text-indigo-500 cursor-pointer'>Privacy</p>
      <p className='hover:text-indigo-500 cursor-pointer'>Tersm of Sevice</p>
      </div>
      <div className='flex space-x-2 justify-center md:justify-start'>
      <p className='hover:text-indigo-500 cursor-pointer'> Tailnet  </p>  <span>| All right reserved</span>
      </div>

    </div>
  )
}

export default Footer