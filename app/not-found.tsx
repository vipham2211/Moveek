import React, { Fragment } from "react";
import Carousel from "@/components/shared/Carousel";
import { fetchListMovies } from "./lib/actions/moviesAction"; 
import Navbar from "@/components/shared/Navbar";

export default async function NotFound() {
  const listMovies = await fetchListMovies();

  return (  
    <Fragment>
      <Navbar/>
      <Carousel listMovies={listMovies} />
    </Fragment>
  );
}
