import { fetchListMovies } from "@/app/lib/actions/moviesAction";
import { Metadata } from "next";
import React, { Fragment } from "react";
import ListMovie from "./ListMovie";

export const metadata: Metadata = {
  title: "Danh sách phim | Mua vé, Lịch chiếu, Review phim, Giá vé",
  description:
    "mua vé, mua vé trực tuyến, mua vé galaxy, mua vé cgv, mua vé bhd, mua vé beta, mua vé cinestar, mua vé mega, mua vé starlight, mua vé rio, mua vé touch, mua vé ddc, mua vé đống đa, mua vé cinemax, đặt vé cgv, đặt vé bhd, đặt vé beta, đặt vé cinestar, đặt vé mega, đặt vé starlight, đặt vé rio, đặt vé touch, đặt vé ddc, đặt vé đống đa, đặt vé cinemax",
};

const page = async () => {

	const listMoviesData = await fetchListMovies();
	
  return (
    <Fragment>
		<div className=" w-full h-44 bg-center bg-cover bg-[url('/assets/tix-banner.png')]">
        <div className="max-w-6xl mx-auto py-6 px-3 ">
          <div className="text-center text-white">
            <h1 className="mb-3 text-[26px] font-medium">Danh sách phim </h1>
            <p>Danh sách các phim hiện đang chiếu tại các hệ thống rạp trên toàn quốc </p>
          </div>
        </div>
      </div>
     
		<ListMovie listMovie={listMoviesData}/>
    </Fragment>
  );
};

export default page;
