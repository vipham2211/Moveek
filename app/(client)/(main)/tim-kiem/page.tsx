import { fetchListMovies } from "@/app/lib/actions/moviesAction";
import { removeDiacriticalMarks } from "@/common.funcs";
import { MovieInterface } from "@/common.types";
import Carousel from "@/components/shared/Carousel";
import { Metadata } from "next";
import React, { Fragment } from "react";

interface PageProps {
  searchParams: { s: string };
}


export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
 

  return {
    title: `${searchParams.s}: đánh giá phim, review phim ,lịch chiếu phim, mua vé, đặt vé phim.`,
  };
}

const page = async ({ searchParams }: PageProps) => {
  const listMoviesData = await fetchListMovies();
  const filterListMovies = listMoviesData.filter(
    (item: MovieInterface) =>
      searchParams.s.length > 1 &&
      removeDiacriticalMarks(item.tenPhim.toLowerCase()).includes(
        removeDiacriticalMarks(searchParams.s.toLowerCase())
      )
  );

  return (
    <div>
      <div className=" w-full h-44 bg-center bg-cover bg-[url('/assets/tix-banner.png')]">
        <div className="max-w-6xl mx-auto py-6 px-3">
          <div className="text-center text-white">
            <h1 className="mb-3 text-[26px] font-medium">Tìm kiếm</h1>
            <p>Theo từ khóa: {searchParams.s} </p>
          </div>
        </div>
      </div>
      {filterListMovies.length ===0 && 
      <Fragment>
      <div className="max-w-6xl mx-auto text-center font-semibold px-3 py-9">
        <div className="py-3">
          Không tìm thấy kết quả theo từ khóa: {searchParams.s}
        </div>
        
      </div>
      <Carousel listMovies={listMoviesData}/>
      </Fragment>
    
      }
     {filterListMovies.length >0 && <Carousel listMovies={filterListMovies}/>} 
    </div>
  );
};

export default page;
