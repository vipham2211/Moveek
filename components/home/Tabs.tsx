'use client'
import React,{ useMemo} from "react";
import { Tab } from "@headlessui/react";
import {  CinemasInterface } from "@/common.types";
import ShowTimes from "./ShowTimes";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../ui/Modal";
import { useModal } from "@/common.stateFuncs"; 

type TabsProps = {
  cinemas: CinemasInterface;

};

const Tabs = ({ cinemas }: TabsProps) => {

  const { isOpen, openModal, closeModal } = useModal();

  const categories = [
    { date: "18/8", dayOfWeek: "Th 6" },
    { date: "19/8", dayOfWeek: "Th 7" },
    { date: "20/8", dayOfWeek: "CN" },
    { date: "21/8", dayOfWeek: "Th 2" },
    { date: "22/8", dayOfWeek: "Th 3" },
    { date: "23/8", dayOfWeek: "Th 4" },
  ];
 
  const listMoviesShowTimes = useMemo(() => {
    
    const filteredMovies = cinemas.danhSachPhim.filter((movie) => movie.dangChieu);
    return filteredMovies
  }, [cinemas.danhSachPhim]);


 
  return (
    <div className="w-full ">
      <Tab.Group>
        <Tab.List className="w-full flex  rounded-md justify-center items-center mb-3 bg-bgGray text-textGray">
          {categories.map((category, index) => {
            return (
              <Tab
                key={index}
                className={({ selected }) =>
                  `w-full flex flex-col items-center px-3 py-3   ${
                    selected ?
                    "bg-slate-300 first:rounded-l-md last:rounded-r-md" : "hover:bg-slate-200"
                  }  `
                }
              >
                {category.date}
                <span className="text-sm ">{category.dayOfWeek}</span>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {categories.map((category, index) => {
            return (
              <Tab.Panel key={index}>
                <div className=" flex bg-yellow-500 rounded-md mb-3 px-5 py-3 text-slate-700">
                  <ExclamationCircleIcon
                    className="block h-5 w-5 mr-2"
                    aria-hidden="true"
                  />
                  Nhấn vào suất chiếu để tiến hành mua vé
                </div>
                <div className="px-5 py-3 mb-3 bg-bgGray  rounded-md">
                  <p>{cinemas.tenCumRap} <span className="text-textGray">{category.dayOfWeek}, {category.date}/2023</span> </p>
                  <p className="text-textGray">{cinemas.diaChi}, Tp. Hồ Chí Minh - 
                  <span className="text-blue">Bản đồ</span> 
                  <span className="text-blue cursor-pointer" onClick={openModal} >- Giá vé</span>
                  </p>
                  <Modal
                      isOpen={isOpen}
                      onClose={closeModal}
                      position={"center"}
                    >
                      Image
                    </Modal>
                </div>
                {index === 0 ?
                  <ShowTimes listMoviesShowTimes={listMoviesShowTimes} />
                  : <div className="p-4 shadow-md rounded-md text-sm">
                    Chưa có lịch chiếu cho ngày này. Hãy quay lại sau. Xin cám ơn.
                  </div>
                }
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
