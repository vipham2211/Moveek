"use client";
import { fetchListCinemas } from "@/app/lib/actions/cinemasAction";
import { CinemaSystemInterface, CinemasInterface } from "@/common.types";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { SubmitButton } from "@/components/ui/SubmitButton";
import Flatpickr from "react-flatpickr";
import React, { useEffect, useRef, useState } from "react";
import { createShowtimeAction } from "@/app/lib/actions/moviesAction";
import { revalidateTagAction } from "@/app/lib/actions/userAction";
import { toast } from "react-toastify";

interface CinemasProps {
  listCinemaSystems: Array<CinemaSystemInterface>;
  maPhim:number
}

const CreateShowtime = ({ listCinemaSystems ,maPhim}: CinemasProps) => {
  const convertedArrCinemaSystems = listCinemaSystems.map((cinema) => {
    return { name: cinema.tenHeThongRap, value: cinema.maHeThongRap };
  });

  const [cinemaSystems, setCinemaSystems] = useState<{
    name: string;
    value: string;
  }>(convertedArrCinemaSystems[0]);
  const [arrCinema, setArrCinema] = useState<{ name: string; value: string }[]>(
    []
  );
  const [cinema, setCinema] = useState<{ name: string; value: string }>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchCinema = async () => {
      const cinemas = await fetchListCinemas(cinemaSystems.value);

      const convertedArrdefaultCinemas = cinemas.map(
        (cinema: CinemasInterface) => {
          return { name: cinema.tenCumRap, value: cinema.maCumRap };
        }
      );
      setArrCinema(convertedArrdefaultCinemas);
      setCinema(convertedArrdefaultCinemas[0]);
    };
    fetchCinema();
  }, [cinemaSystems]);


  const createShowtime = async (formData:FormData)=>{
    formRef.current?.reset();
      let showtime = {
        maPhim,
        ngayChieuGioChieu: formData.get('ngayChieuGioChieu')?.toString() || '' ,
        maRap: cinema?.value || '',
        giaVe:Number(formData.get('giaVe')) 
      }
    
      const { statusCode,message } = await createShowtimeAction(showtime);
        if(statusCode === 200){
          toast.success('Tạo lịch chiếu thành công')
          revalidateTagAction('listMoviesAdmin')
          revalidateTagAction('listMoviesClient')
          revalidateTagAction('showtime')
          revalidateTagAction('showtimeInfoMovie')
          
          
        }else{
          toast.error(message)
        }
  }

  return (
    <form action={createShowtime}  ref={formRef}>
     
      <div className="mb-5">
        <label className="mb-2 inline-block">Cinema System</label>
        <Select
          arr={convertedArrCinemaSystems}
          selected={cinemaSystems}
          setSelected={setCinemaSystems}
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Cinema </label>
        {cinema && (
          <Select arr={arrCinema} selected={cinema} setSelected={setCinema} />
        )}
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Showtime </label>
     
          <Flatpickr
          
              options={{
                enableTime:true,
                dateFormat: "d-m-Y H:i:S",
              }}
           
              name="ngayChieuGioChieu"
              className=" flex w-full flex-col py-2 px-4 rounded-md cursor-pointer  border text-sm border-indigo-200 focus:border-gray-200 focus:outline-none"
              placeholder="Select Date.."
            />
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Giá vé </label>
        <Input
          name="giaVe"
          type="number"
          min={75000}
          max={200000}
          step={5000}
          className="bg-white select-none"
          theme="dashboard"
        />
      </div>
      <SubmitButton
        classname="py-2 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
        text="Create showtime"
      />
    </form>
  );
};

export default CreateShowtime;
