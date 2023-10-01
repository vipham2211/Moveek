import { fetchListMoviesAction } from '@/app/lib/actions/moviesAction'
import React from 'react'
import Content from './_components/ListMovies'



interface pageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}


const page =async ({searchParams}:pageProps) => {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
  const keyword = typeof searchParams.keyword === 'string' ? searchParams.keyword : undefined
  const dataListMovies = await fetchListMoviesAction(page,limit,keyword)

  return (

      <div className="px-4 mb-6 ">
      <div className="text-xl tracking-wide mb-5 font-semibold">
        Manage Movies
      </div>
   <Content dataListMovies={dataListMovies} keyword={keyword} />
    </div>
 
  )
}

export default page