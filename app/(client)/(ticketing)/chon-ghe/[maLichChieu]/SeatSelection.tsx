"use client";
import React, { useEffect } from "react";
import { getAlphabetLetter } from "@/common.funcs";
import { TheaterInfoInterface } from "@/common.types";
import Seat from "./Seat";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setTheaterInfoStore,
  setTotalCostStore,
} from "@/redux/features/bookingSlice";

interface SeatSelectionProps {
  theaterInfo: TheaterInfoInterface;
  maLichChieu: string;
}

const SeatSelection = ({ theaterInfo, maLichChieu }: SeatSelectionProps) => {
  const dispatch = useAppDispatch();
  const listSeatSelected = useAppSelector(
    (state) => state.booking.listSeatSelected
  );

  useEffect(() => {
    let sum = listSeatSelected.reduce((acc, curr) => {
      return acc + curr.giaVe;
    }, 0);

    dispatch(setTotalCostStore(sum));
  }, [listSeatSelected, dispatch]);

  useEffect(() => {
    dispatch(setTheaterInfoStore(theaterInfo));
  }, [dispatch, theaterInfo, maLichChieu]);
  return (
    <div className="mt-5 pb-16 w-full ">
      <div className="flex space-x-4 justify-center items-center">
        <div className="flex items-center">
          <span className="seat-selected w-5 h-5  "></span>
          <p className="px-1 py-1 text-xs">Ghế bạn chọn</p>
        </div>
        <div className="flex items-center">
          <span className="seat-area bg-slate-300 w-5 h-5 "></span>
          <p className="px-1 py-1 text-xs">Ghế thường</p>
        </div>
        <div className="flex items-center">
          <span className="seat-area bg-cyan-700 w-5 h-5  "></span>
          <p className="px-1 py-1 text-xs">Ghế Vip</p>
        </div>
        <div className="flex items-center">
          <span className="seat-area w-5 h-5 taken"></span>
          <p className="px-1 py-1 text-xs">Ghế đã đặt</p>
        </div>
      </div>
      {/*  */}
      <div className=" screen p-1 bg-slate-300 my-3 ml-9 text-center font-semibold">
        MÀN HÌNH{" "}
      </div>
      {/*  */}

      <div className="min-w-full  flex  ">
        <div className="w-2/12 flex flex-col space-y-1">
          {theaterInfo.danhSachGhe.map((seat, index) => {
            if (index > 9) return;
            return (
              <div
                key={index}
                className="bg-gray-600 text-center text-xs leading-6  text-white w-7 h-6 rounded-sm"
              >
                {getAlphabetLetter(index + 1)}
              </div>
            );
          })}
        </div>
        <div className="w-10/12 overflow-x-auto ">
          <div className="w-row-seat  grid grid-cols-16 gap-1 ml-5    ">
            {theaterInfo.danhSachGhe.map((seat, index) => {
              return (
                <Seat
                  key={index}
                  seat={seat}
                  listSeatSelected={listSeatSelected}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
