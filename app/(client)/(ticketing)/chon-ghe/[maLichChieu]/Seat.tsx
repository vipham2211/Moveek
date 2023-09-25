"use client";
import { convertSeatName } from "@/common.funcs";
import { useModal } from "@/common.stateFuncs";
import { SeatInterface } from "@/common.types";
import Modal from "@/components/ui/Modal";
import { setListSeatSelectedStore, setTotalCostStore } from "@/redux/features/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { Fragment, useEffect, useState } from "react";

interface SeatProps {
  seat: SeatInterface;
  listSeatSelected:SeatInterface[]

}

const Seat = ({ seat,listSeatSelected }: SeatProps) => {
  
  const [isActive, setIsActive] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const totalCost = useAppSelector(state=>state.booking.totalCost)
  const dispatch = useAppDispatch();
 

useEffect(()=>{
  const find = listSeatSelected.find((item) => seat.maGhe === item.maGhe);
  if(find) return setIsActive(true)
  return setIsActive(false)
},[listSeatSelected,seat.maGhe])
  
  const handleSeatSelection = (seat: SeatInterface) => {
    let array = [...listSeatSelected];
    const find = listSeatSelected.find((item) => seat.maGhe === item.maGhe);
    if (find) {
        let arrFilter = array.filter((item) => item.maGhe !== seat.maGhe)
        dispatch(setTotalCostStore(totalCost-seat.giaVe))
      return  dispatch(setListSeatSelectedStore(arrFilter)) 
    }
    
    dispatch(setTotalCostStore(totalCost+seat.giaVe))
    dispatch(setListSeatSelectedStore([...array, seat])) 
    
  };
  const handleClick = (seat: SeatInterface) => {
    if(!seat.daDat){
        if(listSeatSelected.length >9 && isActive === false){
          return openModal()
         }
        
         handleSeatSelection(seat)
         setIsActive(!isActive)
    }
  
  };
  return (
    <Fragment>
        {isOpen && 
      <Modal isOpen={isOpen} onClose={closeModal} width="w-[498px]"  position={"center"}>
        <div className="p-6">
        Chỉ cho phép đặt tối đa 10 ghế trong 1 lần đặt vé.
        </div>  
     </Modal>
      }
        <span
      className={`w-6 h-6 ${
        isActive
          ? `seat-selected  indent-0 text-white `
          :  `${!seat.daDat && `seat-area indent-6  hover:indent-0 hover:bg-slate-400`} `
      }  ${
        seat.daDat
          ? "taken cursor-not-allowed indent-6 overflow-hidden  "
          : "text-center  overflow-hidden  cursor-pointer"
      }
      ${
        seat.loaiGhe ==='Vip'
          ?`bg-cyan-700  ${!isActive && !seat.daDat && `hover:bg-cyan-900 text-white` } "`
          : "bg-slate-300 "
      }
      `
      
    }
      onClick={() => handleClick(seat)}
    >
      {convertSeatName(seat.tenGhe)}
    </span>
    </Fragment>

  
  );
};

export default Seat;
