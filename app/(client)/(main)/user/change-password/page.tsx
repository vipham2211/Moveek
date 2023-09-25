import { Metadata } from 'next';
import React from 'react'
import ChangePassword from './ChangePassword';


export async function generateMetadata(): Promise<Metadata> {
	return {
	  title: `Đổi mật khẩu | Moveek `,
	};
  }

const page = async() => {

  return (
	<div className="p-6 shadow-md border rounded-lg mb-5">
	<ChangePassword />
	</div>
  )
}

export default page