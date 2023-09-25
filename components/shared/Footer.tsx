import { CinemaSystemInterface } from '@/common.types';
import Image from 'next/image'
import React from 'react'

interface FooterProps {
  listCinemaSystems: Array<CinemaSystemInterface>;
}
const listPaymentMethod = [
  { name: "Ví momo", src: `/assets/momo-icon.png` },
  { name: "Chuyển khoản / Quét mã QR", src: `/assets/moveek-icon.png` },
  { name: "Ví ShopeePay", src: `/assets/shopeepay-icon.png` },
  { name: "Thẻ Visa, Master, JCB", src: `/assets/payoo-icon.png` },
  { name: "Thẻ ATM (Thẻ nội địa)", src: `/assets/payoo-icon.png` },
  { name: "Ví Foxpay", src: `/assets/foxpay-icon.png` },
  { name: "Moveek Credits", src: `/assets/moveek-icon.png` },
];
const Footer = ({listCinemaSystems}:FooterProps) => {
  return (
    <footer className=" py-3 px-3 sm:px-0 bg-[#EDF2F9] text-[#95AAC9] text-[13px]">
    <div className="max-w-6xl  mx-auto  flex flex-col sm:flex-row sm:space-x-2 ">
      <div className='w-1/12 hidden md:block '>
          <Image
          src={'/assets/favicon-large.png'}
          width={0}
          height={0}
          sizes='100vw'
          priority
          alt='logo'
          className='w-full h-auto'
          />
      </div>
      <div className='w-full text-center sm:text-left sm:w-5/12 '>
        <strong>CÔNG TY TNHH MONET</strong>
       <p>Số ĐKKD: 0315367026 · Nơi cấp: Sở kế hoạch và đầu tư Tp. Hồ Chí Minh · Đăng ký lần đầu ngày 01/11/2018</p>
      <p>Địa chỉ: 33 Nguyễn Trung Trực, P.5, Q. Bình Thạnh, Tp. Hồ Chí Minh</p>
      <p>Về chúng tôi · Chính sách & Thỏa thuận · Hỗ trợ · Liên hệ · v8.1</p>                                    
      </div>
      <div className='w-full text-center mt-3 sm:mt-0 sm:text-left sm:w-4/12'>
      <strong>ĐỐI TÁC</strong>
      <div className='flex my-1 justify-center sm:justify-start' >
        {listCinemaSystems.map((item,index) =>
        (
          <div key={index} className='w-10 h-10 rounded-full'>
          <Image
          src={item.logo}
          width={0}
          height={0}
          sizes='100vw'
          priority
          alt={item.tenHeThongRap}
          className='w-full h-full'
          />
          </div>
        )
           )}
      </div>
      <div className='flex mt-2 justify-center sm:justify-start '>
      {listPaymentMethod.map((item, index) => {
  
          return (
            <div
              key={index} className='w-10 h-10 rounded-full'
            >
              <Image
                src={item.src}
                width={0}
                height={0}
                sizes='100vw'
                priority
                alt={item.name}
                className='w-full h-full rounded-full'
              />
         
            </div>
			
          );
        })}
      </div>
      </div> 
      <div className='w-full justify-center sm:w-2/12 flex sm:items-center'>
      <Image
          src={'/assets/daThongBao.png'}
          width={0}
          height={0}
          sizes='100vw'
          priority
          alt='logo'
          className='w-full h-full max-w-[100px] max-h-[40px] '
          />
      </div>
    </div>
  </footer>
  )
}

export default Footer