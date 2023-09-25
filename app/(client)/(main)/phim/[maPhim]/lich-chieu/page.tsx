import { fetchTheaterInfoByMovieId } from '@/app/lib/actions/cinemasAction';
import { fetchMovieDetail } from '@/app/lib/actions/moviesAction';
import { Metadata } from 'next';
import React from 'react'
import MovieSchedule from './MovieSchedule';

interface pageProps {
  params:{maPhim:string}
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {


  
  const movieDetail = await fetchTheaterInfoByMovieId(params.maPhim)


  return {
    title: `Lịch chiếu ${movieDetail.tenPhim} - Thông tin, Lịch chiếu, Mua vé, Review phim`,
  };
}

const page = async ({params}:pageProps) => {

  const movieDetail = await fetchTheaterInfoByMovieId(params.maPhim)

  if( movieDetail.heThongRapChieu.length > 0){
   return (
    <div className='min-h-[500px]'>
         <MovieSchedule movieDetail={movieDetail}/>
    </div>
   
   ) 
  }
  return (
    <div>
     Chưa có lịch chiếu
    </div>
  )


}

export default page