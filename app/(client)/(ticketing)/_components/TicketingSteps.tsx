"use client";
import React from "react";
import {
  Squares2X2Icon,
  ChevronRightIcon,
  ArchiveBoxIcon,
  CreditCardIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const TicketingSteps = () => {

  const steps = [
    { name: "Chọn ghế", Icon: Squares2X2Icon, href: "/chon-ghe/" },
    { name: "Chọn combo", Icon: ArchiveBoxIcon, href: "/chon-combo/" },
    { name: "Thanh toán", Icon: CreditCardIcon, href: "/thanh-toan/" },
    { name: "Thông tin vé", Icon: InboxIcon, href: "/thong-tin-ve" },
  ];

  const pathname  = usePathname()
  
  return (
    <div className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-3">
        <div className="flex">
          {steps.map((step, index) => {
                const isActive = pathname.includes(step.href)
            return (
              <div
                key={index}
                className="flex flex-1 justify-center items-center pt-2 pb-1 text-xs text-textGray"
              >
                <div className={`flex w-full flex-col justify-between  items-center ${isActive && 'text-red-600'}`}>
                  <step.Icon className="h-5 w-5" />
                  {step.name}
                </div>
                {index !== steps.length - 1 && (
                  <ChevronRightIcon className="h-9 w-9 justify-self-end" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicketingSteps;
