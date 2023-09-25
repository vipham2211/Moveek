import React, { Fragment } from "react";
import Content from "./Content";
import { fetchListMoviesAction } from "@/app/lib/actions/moviesAction";
import { Metadata } from "next";


interface pageProps {
  searchParams: { page: string; limit: string; keyword: string };
}

export async function generateMetadata(): Promise<Metadata> {
 
	return {
	  title:`Moveek list movies`
	};
  } 

const page = async ({ searchParams }: pageProps) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const keyword =
    typeof searchParams.keyword === "string" ? searchParams.keyword : undefined;
  const dataListMovies = await fetchListMoviesAction(page, limit, keyword);

  return (
    <Fragment>
      <div className="text-xl tracking-wide mb-5 font-semibold">
        List movies
      </div>
      <Content dataListMovies={dataListMovies} keyword={keyword} />
    </Fragment>
  );
};

export default page;
