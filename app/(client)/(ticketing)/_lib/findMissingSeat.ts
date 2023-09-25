import { convertSeatName, getAlphabetLetter } from "@/common.funcs";
import {   SeatInterface } from "@/common.types";


export const findMissingSeat = (danhSachGhe:SeatInterface[],listSeatSelected:SeatInterface[]) => {
  let listSeatSelectedLocal = [...listSeatSelected]
    let sortSeatSelected = listSeatSelectedLocal.sort((a, b) => Number(b.stt) - Number(a.stt));
    

    let minSttSeatSelected = Number(listSeatSelectedLocal[sortSeatSelected.length - 1].stt)
    let maxSttSeatSelected = Number(listSeatSelectedLocal[0].stt)
   
    if ( convertSeatName(sortSeatSelected[sortSeatSelected.length - 1].stt) - 1 ===1 && !danhSachGhe[minSttSeatSelected-2].daDat) {
     
      let sttRow =Math.floor( minSttSeatSelected / 16) +(minSttSeatSelected % 16 === 0 ? 0: 1);
      return (getAlphabetLetter(sttRow) +(convertSeatName(listSeatSelectedLocal[sortSeatSelected.length - 1].stt.toString() ) - 1) );
    }
    if (convertSeatName(sortSeatSelected[0].stt) + 1 === 16 && !danhSachGhe[maxSttSeatSelected].daDat )  {
     
      let sttRow =Math.floor(maxSttSeatSelected / 16) +(maxSttSeatSelected % 16 === 0 ? 0 : 1);
      return ( getAlphabetLetter(sttRow) + (convertSeatName(listSeatSelectedLocal[0].stt.toString()) + 1));
    }
   

    for (let i = 0; i < sortSeatSelected.length ; i++) {
      
     let stt = Number(sortSeatSelected[i].stt);
     let sttRow = Math.floor(stt / 16) + (stt % 16 === 0 ? 0 : 1);
      
    if(stt >= 3 && stt<danhSachGhe.length && minSttSeatSelected!==2){
     
      let findIndexLeft = listSeatSelectedLocal.find(item => (stt-1).toString() === item.stt)
      let findIndexRight = listSeatSelectedLocal.find(item => (stt+1).toString() === item.stt)
                                                                                                     
      let isSelectedSeatLeft = !findIndexLeft && !danhSachGhe[stt-2].daDat && danhSachGhe[stt-3].daDat&& Math.floor((stt-2) / 16) + ((stt-2) % 16 === 0 ? 0 : 1) === sttRow
      let isSelectedSeatRight =  !findIndexRight && !danhSachGhe[stt].daDat && danhSachGhe[stt+1].daDat && Math.floor((stt+2) / 16) + ((stt+2) % 16 === 0 ? 0 : 1) === sttRow
    
     if (isSelectedSeatLeft)return (getAlphabetLetter(sttRow) + convertSeatName((stt - 1).toString()) );
     if (isSelectedSeatRight)return (getAlphabetLetter(sttRow) + convertSeatName((stt +1).toString()) );
    }
      if (i < sortSeatSelected.length-1) {
       
        let isSelectedSeatMiddle = danhSachGhe[stt - 2].daDat;
        let sttAf = Number(sortSeatSelected[i + 1].stt);
        let sttAfRow = Math.floor(sttAf / 16) + (sttAf % 16 === 0 ? 0 : 1);
        
        if (stt - sttAf === 2 && sttRow === sttAfRow && !isSelectedSeatMiddle) return ( getAlphabetLetter(sttRow) + convertSeatName((stt - 1).toString()));
      }
    }

    return undefined;
  };


  export const  updateSeatStatus = (listSeat : SeatInterface[]) => {
    return listSeat.map(seat => {
       if (seat.daDat === false) {
          return { ...seat, daDat: true };
       }
       return seat;
    });
 }
