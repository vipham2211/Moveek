import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import React from "react";
import Register from "../_components/Register";
import { Metadata } from "next";
import { fetchCinemaSystems } from "@/app/lib/actions/cinemasAction";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản | Moveek",
  description:
    "mua vé, mua vé trực tuyến, mua vé galaxy, mua vé cgv, mua vé bhd, mua vé beta, mua vé cinestar, mua vé mega, mua vé starlight, mua vé rio, mua vé touch, mua vé ddc, mua vé đống đa, mua vé cinemax, đặt vé cgv, đặt vé bhd, đặt vé beta, đặt vé cinestar, đặt vé mega, đặt vé starlight, đặt vé rio, đặt vé touch, đặt vé ddc, đặt vé đống đa, đặt vé cinemax",
};


const page = async() => {
  const listCinemaSystems= await fetchCinemaSystems();

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <Image
          src={"/assets/tix-banner.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="tix-banner"
          className="w-full h-auto object-cover"
        />
    <section className="flex-1 flex flex-col ">
    <div className="w-12/12 md:max-w-6xl md:w-full flex-1 mx-auto  px-3 my-5   flex items-center ">
      <div className="w-full  md:w-6/12 my-5    ">
        <h3 className="text-3xl font-semibold text-center px-3 mb-3">Đăng ký</h3>
        <Register/>
      </div>
      <div className="w-6/12 hidden  md:flex   justify-center">
        <Image
          src={`/assets/mascot.png`}
          width={262}
          height={236}
          alt="mascot"
          priority
        />
      </div>
    </div>
   
    </section>
    <Footer listCinemaSystems={listCinemaSystems} />
  </div>
  
  );
};

export default page;
