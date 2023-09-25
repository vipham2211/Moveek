"use client";
import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
const PaymentMethod = () => {
  const listPaymentMethod = [
    { name: "Ví momo", src: `/assets/momo-icon.png` },
    { name: "Chuyển khoản / Quét mã QR", src: `/assets/moveek-icon.png` },
    { name: "Ví ShopeePay", src: `/assets/shopeepay-icon.png` },
    { name: "Thẻ Visa, Master, JCB", src: `/assets/payoo-icon.png` },
    { name: "Thẻ ATM (Thẻ nội địa)", src: `/assets/payoo-icon.png` },
    { name: "Ví Foxpay", src: `/assets/foxpay-icon.png` },
    { name: "Moveek Credits", src: `/assets/moveek-icon.png` },
  ];

  const [methodActive, setMethodActive] = useState(listPaymentMethod[0]);

  const handleClick = (item: { name: string; src: string }) => {
    setMethodActive(item);
  };

  return (
    <div className="shadow-md rounded-b-lg ">
      <div className="p-6">
        {listPaymentMethod.map((item, index) => {
          let isActive = item.name === methodActive.name;
          return (
            <div
              onClick={() => handleClick(item)}
              key={index}
              className={`border flex rounded-md space-x-2 p-[5px] items-center cursor-pointer  ${
                isActive ? `  border-slate-400` : `border-transparent`
              }  `}
            >
              <div className="w-6 h-6 leading-6 ">
                <CheckCircleIcon
                  className={`w-6 h-6  text-red-600  ${
                    isActive ? "block" : `hidden`
                  }`}
                />
              </div>

              <Image
                src={item.src}
                width={28}
                height={28}
                alt={item.name}
                className="inline-block"
              />
             <p> {item.name}</p>
            </div>
			
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
