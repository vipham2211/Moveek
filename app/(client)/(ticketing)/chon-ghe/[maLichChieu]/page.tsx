import { decode } from "@/common.funcs";
import SeatSelection from "../../_components/SeatSelection"; 
import { Metadata } from "next";
import React from "react";
import { fetchTheaterInfoByShowtimeId } from "@/app/lib/actions/cinemasAction";


interface PageProps {
  params: { maLichChieu: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // read route params
  const id = decode(params.maLichChieu, process.env.NEXT_PUBLIC_SECRET_KEY);
  
  // fetch data
  const theaterInfo = await fetchTheaterInfoByShowtimeId(Number(id));
  
 
  return {
    title: `Chọn ghế - ${theaterInfo.thongTinPhim.tenCumRap} - ${theaterInfo.thongTinPhim.gioChieu+'-'+theaterInfo.thongTinPhim.ngayChieu }`,
  };
}

const page = async ({ params }: PageProps) => {

  const theaterInfo = await fetchTheaterInfoByShowtimeId(
   Number(decode(params.maLichChieu, process.env.NEXT_PUBLIC_SECRET_KEY)) 
  );
 

  return (
    <div className=" md:w-8/12  px-3">
     
        <SeatSelection theaterInfo={theaterInfo} maLichChieu={params.maLichChieu} />
    
    </div>
         
  );
};

export default page;
