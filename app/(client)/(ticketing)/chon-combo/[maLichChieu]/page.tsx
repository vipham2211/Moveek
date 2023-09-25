import { Metadata } from "next";
import ComboSelection from "./ComboSelection";
import React from "react";
import { decode } from "@/common.funcs";

import { notFound } from "next/navigation";
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
  const theaterInfo = await fetchTheaterInfoByShowtimeId(
    Number(id)
  );

  if (!theaterInfo) return notFound();

  return {
    title: `Chọn Combo - ${theaterInfo.thongTinPhim.tenCumRap} - ${
      theaterInfo.thongTinPhim.gioChieu +
      "-" +
      theaterInfo.thongTinPhim.ngayChieu
    }`,
  };
}

const Page = async ({ params }: PageProps) => {
  const theaterInfo = await fetchTheaterInfoByShowtimeId(
    Number(decode(params.maLichChieu, process.env.NEXT_PUBLIC_SECRET_KEY))
  );

  return (
    <div className=" md:w-8/12  px-3 mb-5">
      <div className="border shadow-md">
        <div className=" flex text-[13px] text--600 font-medium text-titleTable">
          <div className="w-5/12 py-4 pl-6 pr-4 ">COMBO</div>
          <div className="w-3/12 p-4 text-end">GIÁ TIỀN</div>
          <div className="w-4/12 py-4 pl-4 pr-6 text-end ">SỐ LƯỢNG</div>
        </div>

        <ComboSelection
          theaterInfo={theaterInfo}
          maLichChieu={params.maLichChieu}
        />
      </div>
    </div>
  );
};

export default Page;
