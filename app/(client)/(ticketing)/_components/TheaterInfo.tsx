import { convertSeatName, getAlphabetLetter } from '@/common.funcs';
import { SeatInterface, TheaterInfoInterface } from '@/common.types';
import React,{Fragment} from 'react'


interface TheaterInfoProp {
	theaterInfo:Partial<TheaterInfoInterface>,
	listSeatSelected:SeatInterface[]
}

const TheaterInfo =  ({theaterInfo,listSeatSelected}:TheaterInfoProp) => {

	

  return (
	<div className="p-4 rounded-md bg-white shadow-md mb-6 font-light ">
	<p>{theaterInfo.thongTinPhim?.tenPhim}</p>
	<p className="font-semibold">{theaterInfo.thongTinPhim?.tenCumRap}</p>
	<p>
	  Suất{" "}
	  <span className="font-semibold">
		{theaterInfo.thongTinPhim?.gioChieu}
	  </span>{" "}
	  - <span>{theaterInfo.thongTinPhim?.ngayChieu}</span>
	</p>
	<p className="whitespace-nowrap overflow-hidden text-ellipsis">
	  {theaterInfo.thongTinPhim?.tenRap} - Ghế{" "}
	  <span className="font-semibold">
		{listSeatSelected.map((seat, index) => {
		  let stt = Number(seat.stt);
		  let sttRow = Math.floor(stt / 16) + (stt % 16 === 0 ? 0 : 1);
		  return (
			<Fragment key={index}>
			  {index !== 0 && ", "}
			  {getAlphabetLetter(sttRow) + convertSeatName(stt.toString())}
			</Fragment>
		  );
		})}
	  </span>
	</p>
  </div>
  )
}

export default TheaterInfo