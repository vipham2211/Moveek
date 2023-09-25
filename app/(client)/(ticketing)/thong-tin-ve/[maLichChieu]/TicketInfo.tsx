"use client";
import { TheaterInfoInterface } from "@/common.types";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import ListSeat from "./ListSeat";
import ListCombo from "./ListCombo";
interface TicketInfoProps {
  theaterInfo: TheaterInfoInterface;
}

const TicketInfo = ({ theaterInfo }: TicketInfoProps) => {
  return (
    <div className="w-96 mx-auto bg-zinc-300 text-black border rounded-md shadow-md px-3  mb-5 relative ">
      <div className="absolute w-24 h-40 top-0 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-md">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          alt={`${theaterInfo.thongTinPhim.tenPhim}`}
          src={`${theaterInfo.thongTinPhim.hinhAnh}`}
          className=" w-auto h-auto  "
        />
      </div>

      <div className="pt-20 pb-4">
        <p className="pl-20 text-textGray capitalize tracking-tight">
          {theaterInfo.thongTinPhim.tenPhim}
        </p>
        <p className="pl-10 text-lg font-medium tracking-wider uppercase">
          {theaterInfo.thongTinPhim.tenPhim}
        </p>
        <div className="flex mt-4 justify-between items-center">
          <div className="flex space-x-3">
            <div className="h-6 w-6">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                alt="icon"
                className="w-full h-full"
                src={`/assets/cinema.svg`}
              />
            </div>

            <p>Rạp chiếu</p>
          </div>
          <p className="font-medium">{theaterInfo.thongTinPhim.tenCumRap}</p>
        </div>
        <div className="flex mt-4 justify-between items-center">
          <div className="flex space-x-3">
            <CalendarDaysIcon className="w-6 h-6 text-black" />
            <p>Ngày chiếu </p>
          </div>
          <p className="font-medium">
            {theaterInfo.thongTinPhim.gioChieu} -{" "}
            {theaterInfo.thongTinPhim.ngayChieu}
          </p>
        </div>
        <div className="flex mt-4 justify-between items-center">
          <div className="flex space-x-3">
            <div className="h-6 w-6">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                alt="icon"
                src={`/assets/sofa.svg`}
                className="w-full h-full "
              />
            </div>

            <p>Ghế</p>
          </div>
          <ListSeat />
        </div>
        <ListCombo />
        <div className="p-8 flex flex-col items-center space-y-2">
          <div className="w-64 h-10 ">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              alt="barcode"
              src={`/assets/barcode.png`}
              className="w-full h-full  bg-white  "
            />
          </div>
          <p>123 456 7890</p>
          <p className="px-10 text-center text-textGray">
            Hãy đưa mã này cho nhân viên quầy vé để đổi vé của bạn
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
