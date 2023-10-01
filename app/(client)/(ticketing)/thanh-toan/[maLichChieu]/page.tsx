import { decode } from "@/common.funcs"; 
import Checkout from "../../_components/Checkout"; 
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import PaymentMethod from "../../_components/PaymentMethod";
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
    title: `Thông tin thanh toán - ${theaterInfo.thongTinPhim.tenCumRap} - ${
      theaterInfo.thongTinPhim.gioChieu +
      "-" +
      theaterInfo.thongTinPhim.ngayChieu
    }`,
  };
}

const page = async ({ params }: PageProps) => {
  const theaterInfo = await fetchTheaterInfoByShowtimeId(
    Number(decode(params.maLichChieu, process.env.NEXT_PUBLIC_SECRET_KEY))
  );

  return (
    <div className=" md:w-8/12  px-3">
      <div className=" w-full mb-6 ">
        <div className="py-4 px-6 rounded-t-lg text-titleTable bg-bgGray text-sm font-medium ">
          Tóm tắt đơn hàng
        </div>
        <div className="shadow-md rounded-b-lg">
          <div className=" flex text-[13px] font-semibold border-b text-titleTable">
            <div className="w-4/12 py-4 pl-6 pr-4 ">MÔ TẢ</div>
            <div className="w-4/12 p-4 text-center">SỐ LƯỢNG</div>
            <div className="w-4/12 py-4 pl-4 pr-6 text-end ">THÀNH TIỀN</div>
          </div>
          <Checkout
            maLichChieu={params.maLichChieu}
            theaterInfo={theaterInfo}
          />
        </div>
      </div>
      <div className=" w-full mb-6 ">
        <div className="py-4 px-6 rounded-t-lg text-titleTable bg-bgGray text-sm font-medium ">
          Hình thức thanh toán
        </div>
        <PaymentMethod />
      </div>
    </div>
  );
};

export default page;
