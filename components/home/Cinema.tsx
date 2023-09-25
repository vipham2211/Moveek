import React, { Fragment } from "react";
import { CinemasInterface } from "@/common.types";

interface CinemaProps  {
  listCinemas:CinemasInterface[],
  activeCinema: CinemasInterface | null | undefined;
  setActiveCinema: (val: CinemasInterface | null) => void;
  setShowingMoviesList: (val: CinemasInterface) => void;
};


const Cinema =  ({listCinemas,activeCinema,setActiveCinema,setShowingMoviesList}: CinemaProps) => {
 

  const handleCinemaClick = (cinema: CinemasInterface) => {
    setActiveCinema(cinema);
    setShowingMoviesList(cinema);
  };

  return (
    
    <Fragment>
      { listCinemas?.map((cinema: CinemasInterface, index:number) => {
        const isActive = cinema === activeCinema;
        if (index > 10) return;
        return (
          <div
          key={cinema.maCumRap}
          className={`py-3 px-5  ${
            isActive
              ? "bg-blue text-white"
              : "bg-white hover:bg-bgGray text-textGray cursor-pointer"
          }`}
          onClick={()=>handleCinemaClick(cinema)}
        >
          {cinema.tenCumRap}
        </div>
        );
      })
      }
    </Fragment>
  );
};

export default Cinema;
