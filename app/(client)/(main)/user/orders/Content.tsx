"use client";
import {
  convertSeatName,
  formatDate,
  formatHours,
  formatTotalCost,
  formatYear,
  getAlphabetLetter,
} from "@/common.funcs";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Content = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  return (
    <Fragment>
      {userInfo.thongTinDatVe.length === 0  && (
        <div className="px-5 py-3 rounded-md bg-[#edf2f9] border border-[#edf2f9] text-[#283e59]">
          Bạn chưa có giao dịch nào trước đây. <br /> Để bắt đầu mua vé xem
          phim, vui lòng{" "}
          <Link href={"/"} prefetch={false} className="text-red-600">
            đặt vé
          </Link>{" "}
          .
        </div>
      )}
      {userInfo.thongTinDatVe?.map((movie: any, index: number) => {
        return (
          <div key={index} className="py-3  ">
            <div className="bg-white shadow-lg border-gray-100 rounded-md max-h-80 mb-32	 border  p-8 flex sm:space-x-8">
              <div className="hidden sm:block overflow-visible w-4/12 h-48 ">
                <Image
                  className="w-full h-[358.5px]  object-cover shadow-lg rounded-md"
                  src={movie.hinhAnh}
                  width={0}
                  height={0}
                  sizes="100vh"
                  priority
                  alt={movie.tenPhim}
                />
              </div>
              <div className="flex flex-col  space-y-2 w-full sm:w-8/12">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{movie.tenPhim}</h2>
                  <div className="bg-yellow-400 font-bold rounded-xl p-2">
                    {movie.thoiLuongPhim}p
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Ngày đặt</div>
                  <div className="text-lg text-gray-800">
                    {formatDate(movie.ngayDat) +
                      `/${formatYear(movie.ngayDat)} - ` +
                      formatHours(movie.ngayDat)}
                  </div>
                </div>

                <div className=" flex space-x-2  overflow-x-hidden  text-ellipsis ">
                  <div className="text-sm text-gray-400 ">Ghế :</div>
                  {movie.danhSachGhe.map((ghe: any, index: number) => {
                    let stt = Number(ghe.tenGhe);
                    let sttRow =
                      Math.floor(stt / 16) + (stt % 16 === 0 ? 0 : 1);
                    return (
                      <div key={index}>
                        {getAlphabetLetter(sttRow) +
                          convertSeatName(ghe.tenGhe)}{" "}
                      </div>
                    );
                  })}
                </div>
                <div>
                  {movie.danhSachGhe[0].tenCumRap} -{" "}
                  {movie.danhSachGhe[0].tenHeThongRap}
                </div>
                <div className="flex text-2xl font-bold text-a">
                  {formatTotalCost(movie.giaVe) + `đ`}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Content;
