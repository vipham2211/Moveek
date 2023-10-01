"use client";
import { convertSeatName, decode, getAlphabetLetter } from "@/common.funcs";
import {
  setListSeatSelectedStore,
  setStatusStepsButtonStore,
} from "@/redux/features/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { Fragment, useEffect } from "react";

const ListSeat = () => {
  const listSeatSelected = useAppSelector(
    (state) => state.booking.listSeatSelected
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    let listSeatSelectedLocal = localStorage.getItem("listSeatSelected");
    if (listSeatSelectedLocal !== null) {
      dispatch(setStatusStepsButtonStore(false));
      dispatch(
        setListSeatSelectedStore(
          JSON.parse(
            decode(listSeatSelectedLocal, process.env.NEXT_PUBLIC_SECRET_KEY)
          )
        )
      );
    }
  }, [dispatch]);
  return (
    <div className="flex  space-x-1  flex-wrap justify-end ml-10">
      {listSeatSelected.map((seat, index) => {
        let stt = Number(seat.stt);
        let sttRow = Math.floor(stt / 16) + (stt % 16 === 0 ? 0 : 1);
        return (
          <Fragment key={index}>
            {index !== 0 && ", "}
            <p className="font-medium ">
              {getAlphabetLetter(sttRow) + convertSeatName(stt.toString())}
            </p>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ListSeat;
