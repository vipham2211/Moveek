"use client";
import { deleteMovieAction } from "@/app/lib/actions/moviesAction";
import {
  capitalizeFirstLetterEveryWord,
  formatDate,
  formatHours,
  formatYear,
  orderBy,
} from "@/common.funcs";
import { useModal } from "@/common.stateFuncs";
import { DataListMoviesInterface, MovieDetailInterface, newMovieInterface } from "@/common.types";
import Modal from "@/components/ui/Modal";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import EditMovie from "./EditMovie";
import Link from "next/link";

interface MoviesTableProps {
  dataListMoviesState: DataListMoviesInterface;
  setDataListMoviesState: (val: DataListMoviesInterface) => void;
}

const ColumnTitle = [
  { name: "Name", value: "tenPhim", sort: true,responsive:false },
  { name: "Showtime", value: "ngayKhoiChieu", sort: true,responsive:false },
  { name: "Description", value: "moTa", sort: false ,responsive:true},
  { name: "Score", value: "danhGia", sort: true,responsive:true },
  { name: "Status", value: "status", sort: false,responsive:true },
];

const MoviesTable = ({
  dataListMoviesState,
  setDataListMoviesState,
}: MoviesTableProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [sortBy, setSortBy] = useState("");
  const [sortField, setSortField] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [movieState,setMovieState] =  useState<MovieDetailInterface>()

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  const handleSort = (sortBy: "asc" | "desc", sortField: string) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = [...dataListMoviesState.items];
    cloneListUsers = orderBy(cloneListUsers, sortField, sortBy);
    setDataListMoviesState({ ...dataListMoviesState, items: cloneListUsers });
  };

  const deleteMovie = async (id: number) => {
   
    const { statusCode, content } = await deleteMovieAction(id);
    if (statusCode === 200) {
      toast.success("Xóa phim thành công");
    } else {
      toast.error(content);
    }
  };

  const editMovie = (movie:MovieDetailInterface) => {
    openModal();
    setMovieState(movie)
  };

  return (
   
    <Fragment>
 <table className="w-full  border-collapse border border-[#eff0fe] ">
      <thead>
        <tr className="bg-dashboard">
          {ColumnTitle.map((item, index) => {
            return (
              <th
                key={index}
                className={` ${item.responsive && `hidden lg:table-cell`} border select-none  py-4 px-3 text-left border-[#eff0fe] ${
                  item.sort && `cursor-pointer`
                } `}
              >
                <div
                  className="flex items-center justify-between"
                  onClick={() =>
                    item.sort &&
                    handleSort(
                      sortBy === "asc" && sortField === item.value
                        ? "desc"
                        : "asc",
                      item.value
                    )
                  }
                >
                  <p>{item.name}</p>
                  {item.sort && (
                    <div>
                      <ChevronUpIcon
                        className={`w-3 h-3 ${
                          sortBy === "asc" &&
                          sortField === item.value &&
                          `text-black`
                        }`}
                      />
                      <ChevronDownIcon
                        className={`w-3 h-3 ${
                          sortBy === "desc" &&
                          sortField === item.value &&
                          `text-black`
                        }`}
                      />
                    </div>
                  )}
                </div>
              </th>
            );
          })}
          <th className="border py-4 px-3 text-left border-[#eff0fe]">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {dataListMoviesState.items.map((movie, index) => {
          return (
            <tr key={index}>
              <td className=" border py-4 px-3 text-left border-[#eff0fe]">
                <div className="flex items-center space-x-2">
                  <Image
                    src={movie.hinhAnh}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={movie.tenPhim}
                    priority
                    className="w-16 h-auto hidden sm:block"
                  />

                  <p>{capitalizeFirstLetterEveryWord(movie.tenPhim)}</p>
                </div>
              </td>
              <td className=" border py-4 px-3 text-center  border-[#eff0fe]">
                <p >
                  {formatDate(movie.ngayKhoiChieu) +
                    "/" +
                    formatYear(movie.ngayKhoiChieu)}
                </p>
              
              </td>
              <td className="hidden lg:table-cell border py-4 px-3 text-left  max-w-[250px]   border-[#eff0fe]">
				<div className={` ${expandedIndex !== index ? ` overflow-hidden whitespace-nowrap text-ellipsis`:`pr-4 leading-[22px]` } `}>
				{movie.moTa}
				</div>
				{expandedIndex !== index && (
                <button className=" text-yellow-700" onClick={() => handleToggleExpand(index)}>... More</button>
              )}
              {expandedIndex === index && (
                <button className="text-indigo-700" onClick={() => handleToggleExpand(index)}>... Hide</button>
              )}
				
              </td>
              <td className=" hidden lg:table-cell border py-4 px-3 text-center border-[#eff0fe]">
               <span className="text-indigo-700 bg-indigo-100 px-4 py-1  rounded-full">{movie.danhGia}</span> 
              </td>

              <td className=" hidden lg:table-cell border py-4 px-3 w-[200px] text-center border-[#eff0fe]">
                <div className="flex space-x-1 text-[14px]  ">
                  {movie.sapChieu && (
                    <p className="bg-green-100 px-2 py-1 rounded-full text-green-700">
                      Sắp chiếu{" "}
                    </p>
                  )}
                  {movie.dangChieu && (
                    <p className="bg-pink-100 px-2 py-1 rounded-full text-pink-700">
                      Đang chiếu{" "}
                    </p>
                  )}
                </div>
              </td>
              <td className=" text-center py-4 px-3  border border-[#eff0fe]">
                <a title="Delete">
                  <TrashIcon className="w-5 h-5 inline-block hover:text-red-500 cursor-pointer"  onClick={() => deleteMovie(movie.maPhim)} />
                </a>
                <a title="Edit">
                  <PencilSquareIcon className="w-5 h-5 inline-block mx-2 hover:text-green-500 cursor-pointer" onClick={()=> editMovie(movie)} />
                </a>
                <Link title="Showtime" href={`/manage-movies/showtime/${movie.maPhim}`}>
                      <CalendarIcon className="w-5 h-5 inline-block  hover:text-yellow-500 cursor-pointer"/>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <Modal
          isOpen={isOpen}
          onClose={closeModal}
          position={"rightSidebar"}
          heightStyle="heightFullSidebar"
          width="w-[300px] sm:w-[400px]"
        >
     {movieState && <EditMovie movie={movieState} closeModal={closeModal}/>}  
        </Modal>
    </Fragment>
  );
};

export default MoviesTable;
