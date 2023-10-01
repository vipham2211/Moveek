import Cinemas from "@/components/home/Cinemas";
import Carousel from "@/components/shared/Carousel";
import { Metadata } from "next";
import { Fragment } from "react";
import {
  fetchCinemaSystems,
  fetchListCinemas,
} from "../../lib/actions/cinemasAction";
import { fetchListMovies } from "../../lib/actions/moviesAction";



export const metadata: Metadata = {
  title: "Mua vé trực tuyến | Mua vé, Lịch chiếu, Review phim, Giá vé",
  description:
    "mua vé, mua vé trực tuyến, mua vé galaxy, mua vé cgv, mua vé bhd, mua vé beta, mua vé cinestar, mua vé mega, mua vé starlight, mua vé rio, mua vé touch, mua vé ddc, mua vé đống đa, mua vé cinemax, đặt vé cgv, đặt vé bhd, đặt vé beta, đặt vé cinestar, đặt vé mega, đặt vé starlight, đặt vé rio, đặt vé touch, đặt vé ddc, đặt vé đống đa, đặt vé cinemax",
};
export default async function HomePage() {
  const listMoviesData = fetchListMovies();
  const listCinemaSystemsData = fetchCinemaSystems();
  const defaultCinemasData = fetchListCinemas("BHDStar");

  const [listMovies, listCinemaSystems, defaultCinemas] = await Promise.all([
    listMoviesData,
    listCinemaSystemsData,
    defaultCinemasData,
  ]);

  return (
    <Fragment>
      <Carousel listMovies={listMovies} />

      <Cinemas
        listCinemaSystems={listCinemaSystems}
        defaultCinemas={defaultCinemas}
      />
     
    </Fragment>
  );
}
