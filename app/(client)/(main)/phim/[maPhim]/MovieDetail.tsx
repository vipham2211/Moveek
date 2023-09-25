"use client";
import { formatDate, formatYear } from "@/common.funcs";
import { useModal } from "@/common.stateFuncs";
import { MovieDetailInterface } from "@/common.types";
import Modal from "@/components/ui/Modal";
import {
  CalendarIcon,
  ClockIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieDetailProps {
  movieDetail: MovieDetailInterface;
}

const MovieDetail = ({ movieDetail }: MovieDetailProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex">
      <div className="w-2/12 px-3 hidden md:block">
        <Image
          className="w-full h-60 rounded-md"
          src={movieDetail.hinhAnh}
          width={0}
          height={0}
          sizes="100vw"
          alt={movieDetail.tenPhim}
          priority
        />
      </div>
      <div className="w-full flex flex-col items-center md:items-start md:w-10/12 px-3">
        <h3 className="text-xl font-semibold">{movieDetail.tenPhim}</h3>
        <p className="text-[#95aac9]">Bad Blood - Comedy, Action, Family</p>
        <div className="flex space-x-1 text-[13px] my-3 ">
          <div className="flex bg-[#edf2f9] text-[#283e59] px-2 py-1 items-center rounded-sm  cursor-pointer hover:bg-[#d0ddef]">
            <HeartIcon className="h-3 w-3 mr-1 " />
            Thích
          </div>
          <div className="flex bg-[#edf2f9] text-[#283e59] px-2 py-1 items-center rounded-sm  cursor-pointer hover:bg-[#d0ddef]">
            <StarIcon className="h-3 w-3 mr-1 " />
            Đánh giá
          </div>
          <div className="border px-2 py-1 rounded-sm  cursor-pointer hover:text-[#283e59] hover:bg-white" onClick={()=> openModal()} >
            Trailer
          </div>
          <Link href={`/phim/${movieDetail.maPhim}/lich-chieu`} prefetch={false} className=" px-2 py-1 rounded-sm bg-[#e63757]  cursor-pointer  hover:bg-[#db1b3f]">
            Mua vé
          </Link>
        </div>
        <div className="leading-6 mb-3 min-h-[80px]">{movieDetail.moTa}</div>
        <div className="flex w-full md:w-8/12">
          <div className="w-4/12 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start ">
              <HandThumbUpIcon className="w-4 h-4 mr-1" />
             <p className="hidden md:block"> Hài lòng</p>
            </div>
            {movieDetail.danhGia * 10}%
          </div>
          <div className="w-4/12 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start ">
              <CalendarIcon className="w-4 h-4 mr-1" />
             
			  <p className="hidden md:block">  Khởi chiếu</p>
            </div>
            {formatDate(movieDetail.ngayKhoiChieu) +
              `/` +
              formatYear(movieDetail.ngayKhoiChieu)}
          </div>
          <div className="w-4/12 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start ">
              <ClockIcon className="w-4 h-4 mr-1" />
			  <p className="hidden md:block"> Thời lượng</p>
            </div>
            120p
          </div>
          <div className="w-4/12 text-center md:text-left  ">
            <div className="flex items-center justify-center md:justify-start  ">
              <UserIcon className="w-4 h-4 mr-1 " />
			  <p className="hidden md:block">   Giới hạn tuổi</p>
            
            </div>
            T18
          </div>
        </div>
      </div>
	  {isOpen && 
		    <Modal
			isOpen={isOpen}
			onClose={closeModal}
			position={"center"}
			closeButton={false}
			width="w-[798px]"
		  >
		{movieDetail.trailer.length >0 ? 
  <iframe allowFullScreen className="w-full aspect-video ..." src={movieDetail.trailer}></iframe>
    :
    <div className="p-2">
    Chưa có trailer
 </div> 

    }
		 
		  </Modal>
	  }
  
    </div>
  );
};

export default MovieDetail;
