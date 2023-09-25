"use client";
import { decode, encode, formatTotalCost } from "@/common.funcs";
import {
  ComboItemInterface,
  SeatInterface,
  TheaterInfoInterface,
} from "@/common.types";
import {
  setComboDataStore,
  setTheaterInfoStore,
  setTotalCostStore,
} from "@/redux/features/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import React, { Fragment, useEffect } from "react";

interface ComboSelectionProps {
  theaterInfo: TheaterInfoInterface;
  maLichChieu: string;
}

const ComboSelection = ({ theaterInfo, maLichChieu }: ComboSelectionProps) => {
  const comboDataStore = useAppSelector((state) => state.booking.comboData);
  const totalCost = useAppSelector(state=>state.booking.totalCost)
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
      dispatch(setTotalCostStore(totalGhe + totalCombo));

      if (comboDataLocal !== null) {
        dispatch(
          setComboDataStore(
            JSON.parse(
              decode(comboDataLocal, process.env.NEXT_PUBLIC_SECRET_KEY)
            )
          )
        );
      }
    }
    dispatch(setTheaterInfoStore(theaterInfo))
  }, [theaterInfo, dispatch]);

  const handleClickPlusButton = (indexCombo: number, indexItem: number) => {
    const comboClone = JSON.parse(JSON.stringify(comboDataStore));
    const item = comboClone[indexCombo].items[indexItem];

    if (item.quantity < 10) {
      item.quantity += 1;
      let cost = item.cost;
      dispatch(setTotalCostStore(totalCost+cost));
      dispatch(setComboDataStore(comboClone));
      localStorage.setItem(
        "comboData",
        encode(JSON.stringify(comboClone), process.env.NEXT_PUBLIC_SECRET_KEY)
      );
    }
  };
  const handleClickMinusButton = (indexCombo: number, indexItem: number) => {
    const comboClone = JSON.parse(JSON.stringify(comboDataStore));
    const item = comboClone[indexCombo].items[indexItem];
    if (item.quantity > 0) {
      item.quantity -= 1;

      let cost = item.cost;
      dispatch(setTotalCostStore(totalCost-cost));
      dispatch(setComboDataStore(comboClone));
      localStorage.setItem(
        "comboData",
        encode(JSON.stringify(comboClone), process.env.NEXT_PUBLIC_SECRET_KEY)
      );
    }
  };

  const renderComboItem = () => {
    return comboDataStore.map((item, indexCombo) => {
      return (
        <Fragment key={indexCombo}>
          <div className="bg-bgGray text-[14px]  py-4 px-6 text-titleTable">
            {item.comboName.toUpperCase()}
          </div>

          <div>
            {comboDataStore[indexCombo].items.map(
              (item: ComboItemInterface, indexItem: number) => {
                const { name, detail, cost } = item;
                return (
                  <div className="flex" key={indexItem}>
                    <div className="w-5/12 py-4 pl-6 pr-4 flex flex-col ">
                      {name}
                      {detail && (
                        <span className="text-titleTable text-sm">
                          {detail}
                        </span>
                      )}
                    </div>
                    <div className="w-3/12 p-4 text-end">
                      {" "}
                      {formatTotalCost(cost)}đ
                    </div>
                    <div className="w-4/12 py-4 pl-4 pr-6  flex justify-end items-center ">
                      <button
                        className="button-circle"
                        onClick={() =>
                          handleClickMinusButton(indexCombo, indexItem)
                        }
                      >
                        {" "}
                        -
                      </button>
                      <div className="w-8 text-center">{item.quantity}</div>
                      <button
                        className="button-circle"
                        onClick={() =>
                          handleClickPlusButton(indexCombo, indexItem)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Fragment>
      );
    });
  };
  return <Fragment>{renderComboItem()}</Fragment>;
};

export default ComboSelection;
