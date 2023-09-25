import { fetchMovieDetail } from '@/app/lib/actions/moviesAction';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

interface pageProps {
  params:{maPhim:string}
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {


  // fetch data
  const movieDetail = await fetchMovieDetail(params.maPhim);


  return {
    title: ` ${movieDetail.tenPhim} - Thông tin, Lịch chiếu, Mua vé, Review phim`,
  };
}

const page = async ({params}:pageProps) => {

  const movieDetail = await fetchMovieDetail(params.maPhim);

  return (
	<div>
    {movieDetail.trailer.length >0 ?
     <iframe allowFullScreen className="w-full aspect-video ..." src={movieDetail.trailer}></iframe>
     :
     <div>Chưa có Trailer</div>
    }
   
  </div>
  )
}

export default page