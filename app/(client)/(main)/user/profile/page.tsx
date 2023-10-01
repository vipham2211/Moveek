import { Metadata } from "next";
import React from "react";
import UpdateProfile from "../_components/UpdateProfile";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Cập nhật tài khoản | Moveek `,
  };
}

const page = async () => {
	
  return (
    <div className="p-6 shadow-md border rounded-lg">
		<UpdateProfile />
    </div>
  );
};

export default page;
