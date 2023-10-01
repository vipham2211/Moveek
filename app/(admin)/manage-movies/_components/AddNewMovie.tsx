"use client";
import Input from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import { toast } from "react-toastify";
import SwitchComponent from "./SwitchComponent";
import { addNewMovieAction } from "@/app/lib/actions/moviesAction";
import { revalidateTagAction } from "@/app/lib/actions/userAction";

interface AddNewMovieProps {
  closeModal?:()=>void
}

const AddNewMovie = ({closeModal}: AddNewMovieProps) => {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [dangChieu, setDangChieu] = useState(false);
  const [sapChieu, setSapChieu] = useState(false);
  const [hot, setHot] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateFile = (file: File | null) => {
    if (file) {
    
      if (
        file.type !== "image/gif" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        setMessage("Please select a valid image file (GIF, JPG, or PNG)");
      } else if (file.size > 1620000) {
        setMessage("File size is too large");
      } else {
        setFile(file);
        setPreview(URL.createObjectURL(file));
        setMessage("");
      }
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    validateFile(file);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    validateFile(file);
  };

  async function addNewMovie(formData: FormData) {
    formRef.current?.reset();

    if (file) {
      formData.append('File',file,file.name)
      formData.append('maNhom','GP00' )
      formData.append('hot',JSON.stringify(hot) )
      formData.append('dangChieu',JSON.stringify(dangChieu))
      formData.append('sapChieu',JSON.stringify(sapChieu))
    
     
    
      const { statusCode,message } = await addNewMovieAction(formData);
      if(statusCode === 200){
        closeModal && closeModal()
        toast.success('Thêm phim thành công')
        revalidateTagAction('listMoviesAdmin')
        revalidateTagAction('listMoviesClient')
      }else{
          toast.error(message)
      }
    } else {
      setMessage("");
      toast.error("Please select a valid image file (JPEG, JPG, or PNG)");
    }
  }

  return (
    <form action={addNewMovie} ref={formRef} className="p-6 bg-white" >
      
        <div className="mb-5">
          <label className="mb-2 inline-block">Movie name</label>
          <Input
            name="tenPhim"
            type="text"
            className="bg-white"
            theme="dashboard"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 inline-block">Description</label>
          <textarea
            name="moTa"
            className="w-full leading-5 py-2 px-4 rounded-md text-gray-800 bg-white border border-indigo-200 overflow-x-auto focus:outline-none focus:border-gray-300"
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 inline-block">
            Image (200x300 png,jpg or gif)
          </label>
          <div className="flex items-center justify-center w-full">
            {preview && file ? (
                <div className="flex flex-col">
                <div className="w-full h-full   group mb-4 ">
                  <div className="relative ">
                    <div className=" z-10  max-w-[200px] max-h-[300px] mb-3 ">
                      <Image
                        alt="image"
                        src={preview}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-auto group-hover:blur"
                      />
                    </div>
                    <div className=" z-20 transition-opacity duration-200 ease-linear  opacity-0 group-hover:opacity-100 text-center text-black/90  absolute top-0 left-0 w-full  ">
                      <span className="bg-white/40 px-2">
                        <strong>{file.size / 1000}KB</strong>
                      </span>
                      <span className="bg-white/40 px-2 block mt-3">
                        <strong>{file.name}</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full text-center">
                  <button
                    type="button"
                    className="cursor-pointer z-50 hover:underline "
                    onClick={() => setPreview("")}
                  >
                    Remove file
                  </button>
                </div>
              </div>
            ) : (
              <div  className="w-full h-full "
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              >
                <label className= {`flex flex-col items-center justify-center w-full h-64 border border-indigo-200 rounded-md cursor-pointer`}>
                  <div className={`flex flex-col items-center justify-center pt-5 pb-6  ${dragging && 'opacity-30'} `}>
                    <CloudArrowUpIcon className="w-10 h-10 text-indigo-500" />
                    <p className="mb-2 text-sm ">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs ">
                      PNG, JPG or GIF (MAX. 600x900px)
                    </p>
                  </div>
                  <div className="ml-20">
                    <input
                      type="file"
                      onChange={handleChangeImage}
                      className=" text-sm  text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                  focus:outline-none
                "
                    />
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className={`flex flex-col ${!closeModal && `lg:flex-row lg:space-x-2`}   mb-5`}>
        <div className={`w-full mb-2 ${!closeModal && `lg:w-3/12 lg:mb-0`}  `}>
            <label className="mb-2 inline-block">Release date</label>
            <Flatpickr
              options={{
                dateFormat: "d-m-Y",
              }}
              name="ngayKhoiChieu"
              className=" flex w-full flex-col py-2 px-4 rounded-md cursor-pointer  border text-sm border-indigo-200 focus:border-gray-200 focus:outline-none"
              placeholder="Select Date.."
            />
          </div>
          <div className={`w-full flex flex-col  ${!closeModal ? `lg:w-3/12` :`mb-2` }  `}>
            <label className="mb-2 inline-block">Đánh giá</label>
            <Input
              name="danhGia"
              type="number"
              min="0"
              max="10" 
              className="bg-white"
              defaultValue="0"
              theme="dashboard"
            />
          </div>
          <div className={`w-full flex flex-col  ${!closeModal && `lg:items-center lg:flex-row lg:w-6/12 `}  `}>
            <div className={`w-4/12 flex flex-col ${!closeModal && `lg:items-center`} `}>
              <label className="mb-2 inline-block">Now playing</label>
              <SwitchComponent value={dangChieu} setValue={setDangChieu} />
            </div>
            <div className={`w-4/12 flex flex-col ${!closeModal && `lg:items-center`} `}>
              <label className="mb-2 inline-block">Coming soon</label>
              <SwitchComponent value={sapChieu} setValue={setSapChieu} />
            </div>
            <div className={`w-4/12 flex flex-col ${!closeModal && `lg:items-center`} `}>
              <label className="mb-2 inline-block">Hot</label>
              <SwitchComponent value={hot} setValue={setHot} />
            </div>
          </div>
       
        </div>

        <div className=" mb-5 ">
          <label className="mb-2 inline-block">Trailer (embed link)</label>
          <Input
            name="trailer"
            type="text"
            className="bg-white"
            theme="dashboard"
          />
        </div>

        {message && (
          <div className="py-2 px-5 mb-5 rounded-md text-white  bg-[#e63757] border border-[#e63757]">
            {message}
          </div>
        )}
        <SubmitButton
          classname="py-2 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
          text="Add new movie"
        />
     
    </form>
  );
};

export default AddNewMovie;
