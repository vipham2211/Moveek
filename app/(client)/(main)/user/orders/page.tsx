import { Metadata } from "next";
import React from "react";
import Content from "./Content";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Lịch sử mua vé | Moveek `,
  };
}

const page = async () => {


  return (
	<div className="mb-10">
	
      <Content/>
   
		

	</div>
    
  );
};

export default page;
