"use client";
import { encode, formatHours } from "@/common.funcs";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieScheduleProps {
  movieDetail: any;
}

const MovieSchedule = ({ movieDetail }: MovieScheduleProps) => {
  return movieDetail.heThongRapChieu.map((heThong: any, index: number) => (
    <Disclosure key={index}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full  justify-between items-center  bg-[#edf2f9] hover:bg-[#c7d6ec] px-5 py-3 text-left text-sm font-medium  focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
            <div className="flex space-x-4">
              <Image
                src={heThong.logo}
                width={40}
                height={40}
                alt={heThong.maHeThongRap}
              />
              <div>
                <h3 className="font-semibold">{heThong.tenHeThongRap}</h3>
                <p className="text-xs text-gray-400">
                  {heThong.cumRapChieu.length} Rạp
                </p>
              </div>
            </div>

            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-[#95aac9]`}
            />
          </Disclosure.Button>

          {heThong.cumRapChieu.map((rap: any, index: number) => (
            <Disclosure.Panel
              key={index}
              className="px-5 py-3 border cursor-pointer bg-transparent text-sm text-gray-500"
            >
              <Disclosure>
                {({ open,close  }) => (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  <>
                    <Disclosure.Button className="flex w-full justify-between items-center  text-left text-sm font-medium  focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                      <div className="flex space-x-4">
                        <div>
                          <h3 className="text-[#12263F]">{rap.tenCumRap}</h3>
                        </div>
                      </div>

                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-[#95aac9]`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel onClick={()=>  close()}>
                      <h3 className="text-xs text-[#95aac9] mb-3">
                        {rap.diaChi}
                      </h3>
                      <label className="text-[13px] text-[#12263F] font-semibold ">
                        2D Phụ đề anh
                      </label>
                      <div className="flex space-x-2 mt-1">
                        {rap.lichChieuPhim.map(
                          (showtime: any, index: number) =>{
							let encodeMalichChieu = encode(showtime.maLichChieu,process.env.NEXT_PUBLIC_SECRET_KEY)
							return (
								<Link
								key={index}
								href={`/chon-ghe/${encodeMalichChieu}`}
								className="p-2 bg-[#edf2f9] hover:bg-[#c7d6ec]"
								prefetch={false} 
							  >
								{formatHours(showtime.ngayChieuGioChieu)}
							  </Link>
							)
						  }
                        )}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </Disclosure.Panel>
          ))}
        </>
      )}
    </Disclosure>
  ));
};

export default MovieSchedule;
