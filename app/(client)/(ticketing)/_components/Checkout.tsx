"use client";
import { decode, formatTotalCost } from "@/common.funcs";
import {
  ComboItemInterface,
  SeatInterface,
  TheaterInfoInterface,
} from "@/common.types";
import {
  setComboDataStore,
  setListSeatSelectedStore,
  setTheaterInfoStore,
  setTotalCostStore,
} from "@/redux/features/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CheckoutProps {
  theaterInfo: TheaterInfoInterface;
  maLichChieu: string;
}

const Checkout = ({ maLichChieu, theaterInfo }: CheckoutProps) => {

  const comboDataStore = useAppSelector((state) => state.booking.comboData);
  const listSeatSelected = useAppSelector(
    (state) => state.booking.listSeatSelected
  );
  const normalSeats = listSeatSelected.filter(
    (item) => item.loaiGhe === "Thuong"
  );
  const vipSeats = listSeatSelected.filter(
    (item) => item.loaiGhe === "Vip"
  );
 
  const [totalCheckout, setTotalCheckout] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let listSeatSelectedLocal = localStorage.getItem("listSeatSelected");
    if (!listSeatSelectedLocal) {
      redirect(`/chon-ghe/${maLichChieu}`);
    }
  }, [maLichChieu]);

  useEffect(() => {
    let comboDataLocal = localStorage.getItem("comboData");
    let listSeatSelectedLocal = localStorage.getItem("listSeatSelected");

    if (theaterInfo && listSeatSelectedLocal !== null) {
      let totalCombo = 0;
      let comboData = comboDataLocal
        ? JSON.parse(decode(comboDataLocal, process.env.NEXT_PUBLIC_SECRET_KEY))
        : [];
      let listSeatSelected = JSON.parse(
        decode(listSeatSelectedLocal, process.env.NEXT_PUBLIC_SECRET_KEY)
      );

      for (const combo of comboData) {
        for (const item of combo.items) {
          totalCombo += item.quantity * item.cost;
        }
      }
      let totalGhe = listSeatSelected.reduce(
        (acc: number, curr: SeatInterface) => {
          return acc + curr.giaVe;
        },
        0
      );
      dispatch(setTotalCostStore(totalGhe + totalCombo + 15000));
      setTotalCheckout(totalGhe + totalCombo + 15000);
      if (comboDataLocal !== null) {
        dispatch(
          setComboDataStore(
            JSON.parse(
              decode(comboDataLocal, process.env.NEXT_PUBLIC_SECRET_KEY)
            )
          )
        );
      }
      if (listSeatSelectedLocal !== null) {
        dispatch(
          setListSeatSelectedStore(
            JSON.parse(
              decode(listSeatSelectedLocal, process.env.NEXT_PUBLIC_SECRET_KEY)
            )
          )
        );
      }
      dispatch(setTheaterInfoStore(theaterInfo))
    }
  }, [theaterInfo, dispatch]);

  const renderItemsCombo = () => {
    const filteredData = comboDataStore.filter((combo) => {
      return combo.items.some((item: ComboItemInterface) => item.quantity > 0);
    });

    return filteredData.map((combo) =>
      combo.items.map((item: ComboItemInterface, index: number) => {
        if (item.quantity > 0)
          return (
            <div key={index} className=" flex text-slate-950 border-b">
              <div className="py-4 pl-6 pr-4  w-4/12">{item.name}</div>
              <div className="py-4 pl-6 pr-4 w-4/12 text-center">
                {item.quantity}
              </div>
              <p className="py-4 pl-6 pr-4 w-4/12 text-end ">
                {formatTotalCost(item.cost)} đ
              </p>
            </div>
          );
      })
    );
  };

  return (
    <div>
       {normalSeats.length>0 && 
       <div className=" flex text-slate-950 border-b">
       <div className="py-4 pl-6 pr-4  w-4/12">Ghế thường</div>
       <div className="py-4 pl-6 pr-4 w-4/12 text-center">
         {normalSeats.length}
       </div>
       <p className="py-4 pl-6 pr-4 w-4/12 text-end ">
         {normalSeats.length * normalSeats[0].giaVe} đ
       </p>
     </div>
       } 
      {vipSeats.length>0 &&
      <div className=" flex text-slate-950 border-b">
      <div className="py-4 pl-6 pr-4  w-4/12">Ghế Vip</div>
      <div className="py-4 pl-6 pr-4 w-4/12 text-center">
        {vipSeats.length}
      </div>
      <p className="py-4 pl-6 pr-4 w-4/12 text-end ">
        {vipSeats.length * vipSeats[0].giaVe} đ
      </p>
    </div>
      }
      {renderItemsCombo()}
      <div className=" flex justify-between text-slate-950 border-b">
        <div className="py-4 pl-6 pr-4  ">Phí tiện ích </div>

        <div className="py-4 pl-6 pr-4  ">{formatTotalCost(15000)} đ</div>
      </div>
      <div className=" flex justify-between text-slate-950 ">
        <div className="py-4 pl-6 pr-4  ">Tổng</div>

        <div className="py-4 pl-6 pr-4  ">
          {formatTotalCost(totalCheckout)} đ
        </div>
      </div>
    </div>
  );
};

export default Checkout;
