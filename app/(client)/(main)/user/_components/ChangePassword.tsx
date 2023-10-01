"use client";
import { changePasswordAction } from "@/app/lib/actions/userAction";
import Input from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";


const ChangePassword = () => {
  const [message, setMessage] = useState<string>("");
  const userInfo = useAppSelector((state) => state.user.userInfo);

  

  async function changePassword(formData: FormData) {
	
    let currentPassword = formData.get("_currentPassword");
    let newPassword = formData.get("_newPassword");
    let confirmPassword = formData.get("_confirmPassword");

    if (userInfo.matKhau !== currentPassword) {
      setMessage("Mật khẩu hiện tại không đúng");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu mới không khớp với xác minh");
      return;
    }

    const { statusCode, content } = await changePasswordAction(
      formData,
      userInfo
    );
    if (statusCode === 200) {
        setMessage("");
        toast.success('Đổi mật khẩu thành công')
      
    } else {
      setMessage(content);
    }
  }
 
  return (
    <form  action={changePassword} >
      <div className="flex flex-col space-y-5 mb-5">
        <div className="w-full">
          <label className="mb-2 inline-block">Mật khẩu hiện tại</label>
          <Input name="_currentPassword" type="password" autoComplete='current-password' />
        </div>
        <div className="w-full">
          <label className="mb-2 inline-block">Mật khẩu mới</label>
          <Input name="_newPassword" type="password" autoComplete='new-password' />
        </div>
        <div className="w-full">
          <label className="mb-2 inline-block">Xác minh</label>
          <Input name="_confirmPassword" type="password" autoComplete='new-password' />
        </div>
      </div>

      <div className="flex justify-between">
        <SubmitButton classname={` px-3 py-2 rounded-md  text-center bg-[#12263f] text-white  hover:bg-[#0a1421] hover:border-[#070e17]`} text="Đổi mật khẩu" />
        {message && (
          <div className="py-2 px-5 rounded-md text-white  bg-[#e63757] border border-[#e63757]">
            {message}
          </div>
        )}
		 
    
      </div>
    </form>
  );
};

export default ChangePassword;
