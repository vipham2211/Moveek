"use client";
import React, { Fragment, memo } from "react";
import { MoviesInterface } from "@/common.types";
import Image from "next/image";
import {  encode, formatHours } from "@/common.funcs";
import Link from "next/link";




type ShowTimesProps = {
  listMoviesShowTimes: Array<MoviesInterface>;
};

const ShowTimes = ({ listMoviesShowTimes }: ShowTimesProps) => {
 
  return (
    <Fragment>
      {listMoviesShowTimes.map((movie, index) => {
        let listShowTimeFilter = movie.lstLichChieuTheoPhim.slice(0, 6);

        return (
          <div
            key={index}
            className="p-3 justify-between  mb-3 shadow-md rounded-md"
          >
            <div className="flex  items-center ">
              <div className="pr-3 w-2/12">
                <Image
                  className="rounded-md w-full h-auto"
                  src={movie.hinhAnh}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={movie.tenPhim}
                  priority
                />
              </div>

              <div className="flex flex-col flex-1 px-3">
                <a className="font-semibold text-sm">{movie.tenPhim}</a>
                <p className="text-xs text-textGray">
                  T13 · 2h8 · <span className="text-blue">Trailer</span>
                </p>
                <p className="font-semibold text-sm my-2">2D Phụ Đề Việt</p>
                <div className={`flex flex-wrap gap-1 `}>
                  {listShowTimeFilter.map((item, index) => {
                    
                    let encodeMalichChieu = encode(item.maLichChieu.toString(),process.env.NEXT_PUBLIC_SECRET_KEY)

                    return (
                      <Link
                        key={index}
                        href={`chon-ghe/${encodeMalichChieu}`}
                        className={`showTimes w-14 h-11`}
                        prefetch={false}                  
                      >
                        <p className="text-sm">
                          {formatHours(item.ngayChieuGioChieu)}
                        </p>
                        <p className="text-xs text-textGray">
                            {item.giaVe / 1000}K
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default memo(ShowTimes);
