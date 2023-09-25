"use client";
import { updateProfileAction } from "@/app/lib/actions/userAction";
import { userUpdateSchema } from "@/app/lib/schemas/schema";
import { NewUserInterface } from "@/common.types";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { SubmitButton } from "@/components/ui/SubmitButton";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditUserProps {
  user: NewUserInterface;
  closeModal?: () => void;
}

const roles = [
  { name: "Customer", value: "KhachHang" },
  { name: "Admin", value: "QuanTri" },
];
const EditUser = ({ user, closeModal }: EditUserProps) => {
  const convertUser = {
    taiKhoan: user.taiKhoan,
    matKhau: user.matKhau,
    hoTen: user.hoTen,
    email: user.email,
    soDT: user.soDt,
    maNhom: user.maNhom,
    loaiNguoiDung: user.maLoaiNguoiDung,
  };
  const [message, setMessage] = useState<string>("");
  const [userState, setUserState] = useState(convertUser);
  const [selected, setSelected] = useState(
    userState.loaiNguoiDung === roles[0].value ? roles[0] : roles[1]
  );

  async function editUser(formData: FormData) {
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
    let userUpdate = {
      taiKhoan: user.taiKhoan,
      matKhau: formData.get("_password")?.toString() ?? "",
      email: formData.get("_email")?.toString() ?? "",
      soDt: formData.get("_phone")?.toString() ?? "",
      maNhom: "GP00",
      maLoaiNguoiDung: selected.value,
      hoTen: formData.get("_fullname")?.toString() ?? "",
    };

    const { statusCode, content } = await updateProfileAction(userUpdate);
    if (statusCode === 200) {
      setMessage("");
      setUserState(content);
      toast.success("Cập nhật tài khoản thành công");
    } else {
      setMessage(content);
    }
  }

  return (
    <form
      action={editUser}
      className="p-6   text-[#595983]"
    >
      {message && (
        <div className="py-2 px-5 mb-5 rounded-md text-white  bg-[#e63757] border border-[#e63757]">
          {message}
        </div>
      )}
      <div className="mb-5">
        <label className="mb-2 inline-block">Username</label>
        <Input
          name="_username"
          type="text"
          defaultValue={userState.taiKhoan}
          disabled
          theme="dashboard"
          className="bg-white"
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Email</label>
        <Input
          name="_email"
          type="email"
          defaultValue={userState.email || ""}
          theme="dashboard"
          className="bg-white"
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Fullname</label>
        <Input
          name="_fullname"
          type="text"
          defaultValue={userState.hoTen || ""}
          theme="dashboard"
          className="bg-white"
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Phone</label>
        <Input
          name="_phone"
          type="text"
          defaultValue={userState.soDT || ""}
          theme="dashboard"
          className="bg-white"
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Password</label>
        <Input
          name="_password"
          type="text"
          defaultValue={userState.matKhau}
          theme="dashboard"
          className="bg-white"
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Role</label>
        <Select arr={roles} selected={selected} setSelected={setSelected} />
      </div>

      <div className="flex w-full justify-end space-x-2   `">
        <button
          onClick={closeModal}
          type="button"
          className="py-2 px-4 text-white bg-pink-500 rounded-[0.25rem] hover:bg-pink-700"
        >
          Close
        </button>

        <SubmitButton
          classname=" py-2 px-4  text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
          text="Update"
        />
      </div>
    </form>
  );
};

export default EditUser;
