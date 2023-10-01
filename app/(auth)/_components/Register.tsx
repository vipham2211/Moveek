"use client";
import { userUpdateSchema } from "@/app/lib/schemas/schema";
import { registerAction } from "@/app/lib/actions/userAction";
import Input from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [message, setMessage] = useState<string>("");


  async function register(formData: FormData) {

    const check = userUpdateSchema.safeParse({
      email: formData.get("_email"),
      hoTen: formData.get("_fullname"),
      soDt: formData.get("_phone"),
    });
	let password = formData.get("_password");
    let confirmPassword = formData.get("_confirmPassword");
    if (!check.success) {
      const errorMessage = check.error.errors;
      setMessage(errorMessage[0].message);
      return;
    }
	  if (password !== confirmPassword) {
		setMessage("Mật khẩu không khớp với xác minh");
		return;
	  }
    const { statusCode, content } = await registerAction(formData);

	if (statusCode === 200) {
        setMessage("");
        toast.success('Đăng kí thành công')
       
    } else {
      setMessage(content);
    }
  }
  return (
    <form action={register}>
      <div className="flex space-x-6 mb-5">
        <div className="w-1/2">
          <label className="mb-2 inline-block">Email</label>
          <Input name="_email" type="email" />
        </div>
        <div className="w-1/2">
          <label className="mb-2 inline-block">Tên đăng nhập</label>
          <Input name="_username" type="text" />
        </div>
      </div>
      <div className="flex space-x-6 mb-5">
        <div className="w-1/2">
          <label className="mb-2 inline-block">Số điện thoại</label>
          <Input name="_phone" type="text" />
        </div>
        <div className="w-1/2">
          <label className="mb-2 inline-block">Họ và tên</label>
          <Input name="_fullname" type="text" />
        </div>
      </div>
      <div className="flex space-x-6 mb-5">
        <div className="w-1/2">
          <label className="mb-2 inline-block">Mật khẩu</label>
          <Input name="_password" type="password" />
        </div>
        <div className="w-1/2">
          <label className="mb-2 inline-block">Xác minh</label>
          <Input name="_confirmPassword" type="password" />
        </div>
      </div> 
	  {message && 
		  <div className="flex space-x-6 mb-5">
		<div className="py-2 px-5 rounded-md text-white  bg-[#e63757] border border-[#e63757]">
            {message}
          </div>
		  </div>
	  }
	
      <div className="flex justify-between mb-5">
        <SubmitButton classname={` px-3 py-2 w-full rounded-md  text-center bg-[#12263f] text-white  hover:bg-[#0a1421] hover:border-[#070e17]`} text="Tạo tài khoản" />
      </div>
	  <div className="flex justify-center">
	  	<small>Đã có tài khoản ?  <Link className="text-blue" href={`/login`} prefetch={false}>Đăng nhập</Link></small>
      </div>
	  
    </form>
  );
};

export default Register;
