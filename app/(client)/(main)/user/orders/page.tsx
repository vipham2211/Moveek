import { Metadata } from "next";
import React from "react";
import Orders from "../_components/Orders";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Lịch sử mua vé | Moveek `,
  };
}

const page = async () => {


  return (
	<div className="mb-10">
      <Orders/>
	</div>
    
  );
};

export default page;
