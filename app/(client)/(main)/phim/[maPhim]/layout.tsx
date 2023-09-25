import React, { Fragment } from 'react'
import MovieDetail from './MovieDetail';
import { fetchMovieDetail } from '@/app/lib/actions/moviesAction';
import Menu from '@/components/ui/Menu';

interface layoutProps {
	params: { maPhim: string };
	children: React.ReactNode;
  }

const layout =async ({params,children}:layoutProps) => {

	const movieDetail = await fetchMovieDetail(params.maPhim);
	const navigation = [
		{ name: "Thông tin phim", href: `/phim/${params.maPhim}/thong-tin` },
	  { name: "Lịch chiếu", href:`/phim/${params.maPhim}/lich-chieu` },
	  ];
  return (
	<Fragment>
      <div className="bg-[#12263f]">
        <div className="max-w-6xl mx-auto p-3 text-white">
          <MovieDetail movieDetail={movieDetail}/>
        </div>
      </div>
	 <div className='border-b pb-[19px]'>
	 <div className="max-w-6xl mx-auto   ">
	  <Menu navigation={navigation} padding='py-4' />
	  </div>
	 </div>
	
	  <div className='max-w-6xl mx-auto p-3  '>
	<div className='w-full md:w-8/12'>
	{children}
	</div>
	 
	  </div>
    </Fragment>
  )
}

export default layout