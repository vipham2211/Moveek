"use client";
import Image from "next/image";
import React, { useRef } from "react";
import Slider from "react-slick";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { MovieInterface } from "@/common.types";
import { useRouter } from "next/navigation";
import { formatDate } from "@/common.funcs";
import Link from "next/link";


type CarouselProps = {
  listMovies: Array<MovieInterface>;
};

const Carousel = ({ listMovies }: CarouselProps) => {
  const router = useRouter();
 
  const isDraggingRef = useRef(false);
  const settings =
  listMovies.length>7 ? {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    centerPadding: "20px",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
         
        },
      },
    
      
    ],
    beforeChange: () => {
      isDraggingRef.current = true;
    },
    afterChange: () => {
      isDraggingRef.current = false;
    },
  }:{
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    centerPadding: "20px",
  }

  const handleImageClick = (maPhim:number) => {
    if (!isDraggingRef.current) {
      router.push(`/phim/${maPhim}/thong-tin`);
    }
  };

  return (
    <div className="bg-white border-t border-b pt-6 pb-4 ">
      <div className="max-w-xl md:max-w-6xl mx-auto  pl-3 pr-1 ">
        <h1 className="text-title h-12">Mua vé theo phim</h1>

        <Slider {...settings} className="mb-8">
          {listMovies?.map((item) => (
            <div
              key={item.maPhim}
              className="px-2 rounded-md focus-visible:outline-none mb-3"
            >
              <div className="border shadow-md rounded-md">
                <div
                  className="relative h-44 w-full cursor-pointer "
                  onClick={()=>handleImageClick(item.maPhim)}
                >
                  <Image
                    className="w-full h-full object-fill  rounded-md"
                    src={item.hinhAnh}
                    alt={item.tenPhim}
                    width={0}
                    height={0}
                    sizes="100vw"
                    
                  />
                  <label className="w-full font-light text-sm leading-relaxed cursor-pointer absolute bottom-0 left-0 text-center bg-labelCardColor text-white">
                    Mua vé
                  </label>
                  <label className="w-2/4 mt-1 font-light text-sm  font-sm absolute top-0 hot text-center bg-labelCardColor text-white">
                    {item.hot && 'HOT'}
                   
                  </label>
                  {item.hot &&
                  <div className=" 3d  preverse absolute top-0  ">
                  <div className="h-5 w-5 sprite bg-red-700">
                  </div>
                </div>
                  }
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
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
