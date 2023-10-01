"use client";
import { userUpdateSchema } from "@/app/lib/schemas/schema";
import { updateProfileAction } from "@/app/lib/actions/userAction";
import Input from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { convertString } from "@/common.funcs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserInfo } from "@/redux/features/userSlice";

const UpdateProfile = () => {
  const [message, setMessage] = useState<string>("");
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [userInfoState, setUserInfoState] = useState(userInfo);
  const dispatch = useAppDispatch();
  async function updateProfile(formData: FormData) {
    const check = userUpdateSchema.safeParse({
      email: formData.get("_email"),
      hoTen: formData.get("_fullname"),
      soDt: formData.get("_phone"),
    });
    if (!check.success) {
      const errorMessage = check.error.errors;
      setMessage(errorMessage[0].message);
      return;
    }
    let maLoaiNguoiDung =
      userInfo.loaiNguoiDung && convertString(userInfo.loaiNguoiDung);
    let userUpdate = {
      taiKhoan: userInfo.taiKhoan?.toString() ?? "",
      matKhau: formData.get("_password")?.toString() ?? "",
      email: formData.get("_email")?.toString() ?? "",
      soDt: formData.get("_phone")?.toString() ?? "",
      maNhom: "GP00",
      maLoaiNguoiDung: maLoaiNguoiDung || "",
      hoTen: formData.get("_fullname")?.toString() ?? "",
    };

    const { statusCode, content } = await updateProfileAction(userUpdate);
    if (statusCode === 200) {
      setMessage("");
      toast.success("Cập nhật tài khoản thành công");
      setUserInfoState(content);
      const { taiKhoan, matKhau, hoTen, email, soDT, maNhom, loaiNguoiDung } = content;
      dispatch(
        setUserInfo({
          taiKhoan,
          matKhau,
          hoTen,
          email,
          soDT,
          maNhom,
          loaiNguoiDung,
          thongTinDatVe: userInfo.thongTinDatVe,
        })
      );
    } else {
      setMessage(content);
    }
  }

  return (
    <form action={updateProfile}>
      <div className="flex space-x-6 mb-5">
        <div className="w-1/2">
          <label className="mb-2 inline-block">Tài khoản</label>
          <Input
            name="_username"
            type="text"
            defaultValue={userInfoState.taiKhoan}
            disabled
          />
        </div>
        <div className="w-1/2">
          <label className="mb-2 inline-block">Email</label>
          <Input
            name="_email"
            type="email"
            defaultValue={userInfoState.email}
          />
        </div>
      </div>
      <div className="flex space-x-6 mb-5">
        <div className="w-1/2">
          <label className="mb-2 inline-block">Họ và tên</label>
          <Input
            name="_fullname"
            type="text"
            defaultValue={userInfoState.hoTen}
          />
        </div>
        <div className="w-1/2">
          <label className="mb-2 inline-block">Số điện thoại</label>
          <Input name="_phone" type="text" defaultValue={userInfoState.soDT} />
        </div>
      </div>
      <div className="flex justify-between">
        <SubmitButton
          classname={` px-3 py-2 rounded-md  text-center bg-[#12263f] text-white  hover:bg-[#0a1421] hover:border-[#070e17]`}
          text="Cập nhật"
        />
        {message && (
          <div className="py-2 px-5 rounded-md text-white  bg-[#e63757] border border-[#e63757]">
            {message}
          </div>
        )}
      </div>
    </form>
  );
};

export default UpdateProfile;
