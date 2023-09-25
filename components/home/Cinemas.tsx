"use client";
import React, {useState} from "react";
import Image from "next/image";
import { CinemaSystemInterface, CinemasInterface } from "@/common.types";
import Cinema from "./Cinema";
import Tabs from "./Tabs";
import { fetchListCinemas } from "@/app/lib/actions/cinemasAction";
import LoadingComponent from "../shared/LoadingComponent";

interface CinemasProps {
  listCinemaSystems: Array<CinemaSystemInterface>;
  defaultCinemas: CinemasInterface[];
}
const Cinemas = ({ listCinemaSystems, defaultCinemas }: CinemasProps) => {
  const [activeCinemaSystem, setActiveCinemaSystem] = useState<CinemaSystemInterface>(listCinemaSystems[0]);
  const [listCinemas, setListCinemas] =useState<Array<CinemasInterface>>(defaultCinemas);
  const [activeCinema, setActiveCinema] = useState<CinemasInterface | null>();
  const [cinemas, setCinemas] = useState<CinemasInterface>();
  const [loading, setLoading] = useState(false);
  

  const handleCinemaSystemClick = async (
    cinemaSystem: CinemaSystemInterface
  ) => {
    setActiveCinemaSystem(cinemaSystem);
    setLoading(true);
    setCinemas(undefined)
    let listCinemas = await fetchListCinemas(cinemaSystem.maHeThongRap);
    setListCinemas(listCinemas);
    setLoading(false);
  };



  return (
    <div className="w-full pb-32 max-w-xl md:max-w-6xl mx-auto min-h-[900px] flex flex-col pt-6 pl-3 pr-1 md:flex-row">
      <div className=" w-full md:w-3/12 pr-3  ">
        <div className="flex flex-col rounded-md shadow-md bg-bgGray ">
          <div className="py-3 px-5 text-textGray"> Hệ thống rạp</div>
          {listCinemaSystems.map((cinemaSystem, index) => {
            const isActive = cinemaSystem.maHeThongRap === activeCinemaSystem.maHeThongRap;
     
            return (
              <div key={index} className="flex flex-col cursor-pointer ">
                <div
                  className={`flex py-3 px-5 text-textGray ${
                    isActive ? "bg-blue text-white" : "bg-white hover:bg-bgGray"
                  }`}
                  onClick={() => handleCinemaSystemClick(cinemaSystem)}
                >
                  <Image
                    src={cinemaSystem.logo}
                    width={24}
                    height={24}
                    alt={cinemaSystem.biDanh}
                    className="mr-3"
                    priority
                  />
                  {cinemaSystem.tenHeThongRap}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full pl-0 pr-3 md:w-4/12  md:px-3">
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="rounded-md shadow-md bg-bgGray">
            <div className="py-3 px-5 text-textGray"> Cụm Rạp</div>

            <Cinema
              activeCinema={activeCinema}
              setActiveCinema={setActiveCinema}
              setShowingMoviesList={setCinemas}
              listCinemas={listCinemas}
            />
          </div>
        )}
      </div>

      <div className="w-full pl-0 pr-3 md:w-6/12 md:px-3">
        {cinemas && activeCinema ? (
          <Tabs cinemas={cinemas} />
        ) : (
          <div className="bg-bgGray px-5 py-3 rounded-md">
            Bạn chưa chọn rạp.
          </div>
        )}
      </div>
    </div>
  );
};

export default Cinemas;
