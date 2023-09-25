"use client";
import { decode, encode, formatTotalCost } from "@/common.funcs";
import React, { Fragment, useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { useModal } from "@/common.stateFuncs";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { findMissingSeat, updateSeatStatus } from "@/app/(client)/(ticketing)/_lib/findMissingSeat"; 
import {
  setBookingStoretDefault,
  setStatusStepsButtonStore,
  setListSeatSelectedStore,
  setComboDataStore,
} from "@/redux/features/bookingSlice";
import LoadingComponent from "../../../components/shared/LoadingComponent";
import TheaterInfo from "./TheaterInfo";
import LoginComponent from "../../../components/shared/LoginComponent";
import { comboData } from "@/app/(client)/(ticketing)/chon-combo/comboData"; 
import { checkToken } from "@/app/lib/actions/userAction";
import { checkout } from "@/app/lib/actions/cinemasAction";
import { toast } from "react-toastify";


const BookingInfo = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const listSeatSelected = useAppSelector(
    (state) => state.booking.listSeatSelected
  );
  const theaterInfo = useAppSelector((state) => state.booking.theaterInfo);
  const totalCost = useAppSelector((state) => state.booking.totalCost);
  const isActiveButton = useAppSelector(
    (state) => state.booking.statusStepsButtonStore
  );
  const [messageError, setMessageError] = useState<string>("");
  const [loginModal, setLoginModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const pathname = usePathname();

  const paramsMaLichChieu = pathname.substring(pathname.lastIndexOf("/") + 1);
  const paramsStepBooking = pathname.split("/")[1];

  useEffect(() => {
    if (paramsStepBooking !== "thong-tin-ve") {
      let listSeatSelectedLocal = localStorage.getItem("listSeatSelected");
    
      if (listSeatSelectedLocal !== null) {
        let listSeatSeleted = JSON.parse(
          decode(listSeatSelectedLocal, process.env.NEXT_PUBLIC_SECRET_KEY)
        )
        if(listSeatSeleted[0].daDat){
            dispatch(setBookingStoretDefault())
        }else{
          dispatch(
            setListSeatSelectedStore(
              JSON.parse(
                decode(listSeatSelectedLocal, process.env.NEXT_PUBLIC_SECRET_KEY)
              )
            )
          );
        }
      }
    }
  }, [dispatch, paramsMaLichChieu, paramsStepBooking]);

  useEffect(() => {
    if (paramsStepBooking !== "thong-tin-ve") {
      let maLichChieuLocal = localStorage.getItem("maLichChieu");
      if (maLichChieuLocal !== null && paramsMaLichChieu !== maLichChieuLocal) {
        localStorage.removeItem("listSeatSelected");
        localStorage.removeItem("maLichChieu");
        localStorage.removeItem("totalCost");
        localStorage.removeItem("comboData");
        localStorage.removeItem("theaterInfo");
        dispatch(setBookingStoretDefault());
      }

      if (!maLichChieuLocal) {
        dispatch(setListSeatSelectedStore([]));
      }
    }
  }, [dispatch, paramsMaLichChieu, paramsStepBooking]);

  useEffect(() => {
    dispatch(setStatusStepsButtonStore(false));
  }, [dispatch, paramsStepBooking]);

  const handleRouterPush = async () => {
    if (paramsStepBooking === "chon-ghe") {
      localStorage.setItem(
        "listSeatSelected",
        encode(
          JSON.stringify(listSeatSelected),
          process.env.NEXT_PUBLIC_SECRET_KEY
        )
      );

      localStorage.setItem("maLichChieu", paramsMaLichChieu);
      const comboClone = JSON.parse(JSON.stringify(comboData));
      localStorage.removeItem("comboData");
      dispatch(setComboDataStore([...comboClone]));
      dispatch(setStatusStepsButtonStore(true));
      return router.push(`/chon-combo/${paramsMaLichChieu}`);
    }
    if (paramsStepBooking === "chon-combo") {
      dispatch(setStatusStepsButtonStore(true));
      return router.push(`/thanh-toan/${paramsMaLichChieu}`);
    }
    if (paramsStepBooking === "thanh-toan") {
     
      let token = await checkToken();

      if (!token) {
        setLoginModal(true);
        return openModal();
      }

      let listTicket = listSeatSelected.map((item) => ({
        giaVe: item.giaVe,
        maGhe: item.maGhe,
      }));
      let maLichChieu = Number(
        decode(paramsMaLichChieu, process.env.NEXT_PUBLIC_SECRET_KEY)
      );

      let res = await checkout({
        maLichChieu: maLichChieu,
        danhSachVe: listTicket,
      });

      if (res.statusCode === 200) {
        let listSeatSelectedClone = updateSeatStatus(listSeatSelected);
        localStorage.setItem(
          "listSeatSelected",
          encode(
            JSON.stringify(listSeatSelectedClone),
            process.env.NEXT_PUBLIC_SECRET_KEY
          )
        );
       
        dispatch(setStatusStepsButtonStore(true));
         router.push(
          `/thong-tin-ve/${paramsMaLichChieu}`
        );
        toast.success(' Đặt vé thành công');
        return
      } else {
        toast.error(' Đặt vé thất bại');
      }
    }
  };

  const handleClick = async () => {
    if (listSeatSelected.length > 0 && theaterInfo.danhSachGhe) {
      let errorMissingSeat = findMissingSeat(
        theaterInfo.danhSachGhe,
        listSeatSelected
      );

      if (errorMissingSeat) {
        setMessageError(errorMissingSeat);
        openModal();
      } else {
        setMessageError("");
        handleRouterPush();
      }
    }
  };

  if (paramsStepBooking !== "thong-tin-ve") {
    return (
      <div className="w-full md:w-8/12  lg:w-4/12 px-3">
        {(paramsStepBooking === "chon-ghe" ||
          paramsStepBooking === "chon-combo") && (
          <TheaterInfo
            theaterInfo={theaterInfo}
            listSeatSelected={listSeatSelected}
          />
        )}
        <div className="p-6 rounded-md flex bg-white shadow-md mb-6">
          <div className="flex-1 ">
            <p className="text-xs text-textGray">TỔNG ĐƠN HÀNG</p>
            <p className="font-semibold text-lg">
              {formatTotalCost(totalCost)} ₫
            </p>
          </div>
          <div className="flex flex-col flex-1 items-end  border-l">
            <p className="text-xs text-textGray ">THỜI GIAN GIỮ GHẾ </p>
            <p className="font-semibold text-lg">15:00</p>
          </div>
        </div>
        {paramsStepBooking === "thanh-toan" && (
          <div className="p-4 rounded-md bg-white shadow-md mb-6 font-light ">
            Vé đã mua không thể đổi hoặc hoàn tiền. Mã vé sẽ được gửi 01 lần qua
            số điện thoại và email đã nhập. Vui lòng kiểm tra lại thông tin
            trước khi tiếp tục.
          </div>
        )}

        <button
          onClick={handleClick}
          className={`px-4 py-3 w-full bg-slate-800 text-center font-medium rounded-lg text-white  ${
            listSeatSelected.length > 0
              ? `${
                  !isActiveButton
                    ? `opacity-100 cursor-pointer hover:bg-slate-950`
                    : `opacity-70`
                } `
              : `opacity-70`
          }`}
          disabled={isActiveButton}
        >
          {isActiveButton ? (
            <LoadingComponent loading />
          ) : paramsStepBooking === "thanh-toan" ? (
            "Thanh toán"
          ) : (
            "Tiếp tục"
          )}
        </button>
        {messageError && (
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            position={"justify-center item-start mt-7"}
            width="w-[498px]"
            closeButton
          >
            <div className="p-6">Không được bỏ trống ghế {messageError}</div>
          </Modal>
        )}
   
        {paramsStepBooking === "thanh-toan" && loginModal && (
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            position={"leftSidebar"}
            heightStyle="h-full"
            width="max-w-[350px]"
          >
            <LoginComponent onClose={closeModal} />
          </Modal>
        )}
      </div>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default BookingInfo;
