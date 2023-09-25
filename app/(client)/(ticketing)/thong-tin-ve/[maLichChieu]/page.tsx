import React from "react";
import { decode } from "@/common.funcs";
import TicketInfo from "./TicketInfo"; 
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {  fetchTheaterInfoByShowtimeId } from "@/app/lib/actions/cinemasAction";




interface PageProps {
  params: { maLichChieu: string };
  searchParams:{status:string}
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // read route params
  const id = decode(params.maLichChieu, process.env.NEXT_PUBLIC_SECRET_KEY);

  // fetch data
  const theaterInfo = await fetchTheaterInfoByShowtimeId(
    Number(id)
  );

  if (!theaterInfo) return notFound();
  return {
    title: `Thông tin vé - ${theaterInfo.thongTinPhim.tenCumRap} - ${
      theaterInfo.thongTinPhim.gioChieu +
      "-" +
      theaterInfo.thongTinPhim.ngayChieu
    }`,
  };
}


const page = async ({params}:PageProps) => {
 
  const theaterInfo = await fetchTheaterInfoByShowtimeId(
    Number(decode(params.maLichChieu, process.env.NEXT_PUBLIC_SECRET_KEY)) 
   );
 

  return (
    <div className="rounded-md w-full mt-20 ">
    
		<TicketInfo  theaterInfo={theaterInfo} />
     
    </div>
  );
};

export default page;
