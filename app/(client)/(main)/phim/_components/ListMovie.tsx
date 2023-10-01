"use client";
import { MovieInterface } from "@/common.types";
import {
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ListBoxMovie from "./ListBoxMovie";
import { formatDate } from "@/common.funcs";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ListMovieProps {
  listMovie: MovieInterface[];
}

const options = [
  { name: "Tất cả" },
  { name: "Đang chiếu" },
  { name: "Sắp chiếu" },
];
const ListMovie = ({ listMovie }: ListMovieProps) => {
  const [selected, setSelected] = useState(options[0]);
  const router = useRouter()
  const listMovieFilter = listMovie.filter((phim) => {
    if (selected.name === "Tất cả") {
      return true;
    }
    if (selected.name === "Đang chiếu") {
      return phim.dangChieu === true;
    }
    if (selected.name === "Sắp chiếu") {
      return phim.sapChieu === true;
    }
  });
 

  return (
    <div className="max-w-6xl mx-auto mt-3 flex flex-col  lg:space-x-2 lg:flex-row" >
      <div className="w-full px-3 md:px-0 mb-5 md:w-6/12 md:mx-auto lg:w-2/12">
        <ListBoxMovie
          selected={selected}
          setSelected={setSelected}
          options={options}
        />
      </div>
      <motion.div  layout  className="w-full mx-auto   grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:w-10/12 lg:grid-cols-6  ">
		<AnimatePresence>
		{listMovieFilter.map((item) => (
          <motion.div
		        layout
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={item.maPhim}
            className="px-2 rounded-md focus-visible:outline-none mb-3"
          >
            <div className="border shadow-md rounded-md">
              <div
                className="relative h-44 w-full cursor-pointer "
              >
                <Image
                  className="w-full h-full object-cover  rounded-md"
                  src={item.hinhAnh}
                  alt={item.tenPhim}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  onClick={()=>router.push(`phim/${item.maPhim}/thong-tin`)}
                />
                <label className="w-full font-light text-sm leading-relaxed cursor-pointer absolute bottom-0 left-0 text-center bg-labelCardColor text-white">
                  Mua vé
                </label>
                <label className="w-2/4 mt-1 font-light text-sm  font-sm absolute top-0 hot text-center bg-labelCardColor text-white">
                  {item.hot && "HOT"}
                </label>
                {item.hot && (
                  <div className=" 3d  preverse absolute top-0  ">
                    <div className="h-5 w-5 sprite bg-red-700"></div>
                  </div>
                )}
              </div>

              <div className="p-2 ">
                <Link href={`/phim/${item.maPhim}/thong-tin`} prefetch={false}>
                <h3 className="mb-2  font-bold font-sans tracking-tight whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer hover:text-[#1657af]  text-stone-900 ">
                  {item.tenPhim}
                </h3>
                </Link>
              
                <div className="flex justify-between items-center">
                  <div className="text-xs font-normal text-gray-400">
                    {formatDate(item.ngayKhoiChieu)}
                  </div>
                  <a className=" flex items-center justify-between text-green-400 text-sm hover:text-green-900  ">
                    <HandThumbUpIcon className="h-4 w-4 mr-1  " />
                    {item.danhGia * 10}%
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
		</AnimatePresence>
       
      </motion.div>
    </div>
  );
};

export default ListMovie;
