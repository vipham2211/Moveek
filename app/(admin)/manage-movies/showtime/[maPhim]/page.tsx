import React, { Fragment } from 'react'
import CreateShowtime from './CreateShowtime'
import { fetchMovieDetail } from '@/app/lib/actions/moviesAction'
import Image from 'next/image'
import { fetchCinemaSystems, fetchListCinemas } from '@/app/lib/actions/cinemasAction'

interface pageProps{
	params:{maPhim:string}
}

const page =async ({params}:pageProps) => {

	const movieDetailData =  fetchMovieDetail(params.maPhim)
	const listCinemaSystemsData = fetchCinemaSystems();
	const [movieDetail, listCinemaSystems] = await Promise.all([
		movieDetailData,
		listCinemaSystemsData,
	  ]);
  return (
	<Fragment>
	<div className="text-xl tracking-wide mb-5 font-semibold">
	 Create showtime
	</div>
	<div className="flex space-x-10  ">
	
		<div className='w-9/12 p-6 bg-white rounded-lg shadow-lg'>
			<CreateShowtime listCinemaSystems={listCinemaSystems} maPhim={Number(params.maPhim)} />
		</div>
		<div className='p-6 bg-white rounded-lg shadow-lg  w-3/12'>
		<Image
				src={movieDetail.hinhAnh}
				width={0}
				height={0}
				sizes='100vw'
				alt={movieDetail.tenPhim}
				priority
				className='w-full h-full'
				/>
		</div>
	</div>
  </Fragment>
  )
}

export default page