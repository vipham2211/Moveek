'use client'
import { addNewUserAction, revalidateTagAction } from "@/app/lib/actions/userAction";
import { userUpdateSchema } from "@/app/lib/schemas/schema";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { SubmitButton } from "@/components/ui/SubmitButton";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const roles = [
  { name: "Customer", value: "KhachHang" },
  { name: "Admin", value: "QuanTri" },
];
interface AddNewUserProps {
  closeModal?: ()=>void
  
}

const AddNewUser = ({closeModal}:AddNewUserProps) => {
  const [selected, setSelected] = useState(roles[0]);
  const [message, setMessage] = useState<string>("");
 

  async function addNewUser(formData: FormData) {
    let newPassword = formData.get("_password");
    let confirmPassword = formData.get("_confirmPassword");

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu mới không khớp với xác minh");
      return;
    }
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
    let newUser = {
      taiKhoan: formData.get("_username")?.toString() ?? "",
      matKhau: formData.get("_password")?.toString() ?? "",
      email: formData.get("_email")?.toString() ?? "",
      soDt: formData.get("_phone")?.toString() ?? "",
      maNhom: "GP00",
      maLoaiNguoiDung: selected.value,
      hoTen: formData.get("_fullname")?.toString()?? "",
    };
 
    const { statusCode, content } = await addNewUserAction(newUser);
    if (statusCode === 200) {
      closeModal && closeModal()
      toast.success('Thêm dùng thành công')
      revalidateTagAction('listUsers')
    } else {
      setMessage(content);
     
    }
   
  }

  return (
  
    <form action={addNewUser}  className="pb-2 text-[#595983]" >
      <div className="p-6 bg-white">
       
        <div className="mb-5">
          <label className="mb-2 inline-block">Username</label>
          <Input
            name="_username"
            type="text"
            className="bg-white"
            theme="dashboard"
            autoComplete="username"
          />
        </div>
        <div className="flex mb-5 space-x-6 ">
        <div className=" w-6/12">
          <label className="mb-2 inline-block">Password</label>
          <Input
            name="_password"
            type="password"
            className="bg-white"
            theme="dashboard"
            autoComplete="password"
          />
        </div>
        <div className=" w-6/12">
          <label className="mb-2 inline-block">Confirm password</label>
          <Input
            name="_confirmPassword"
            type="password"
            className="bg-white"
            theme="dashboard"
            autoComplete="new-password"
          />
        </div>
        </div>
     
        <div className="mb-5">
          <label className="mb-2 inline-block">Fullname</label>
          <Input
            name="_fullname"
            type="text"
            theme="dashboard"
            className="bg-white"
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 inline-block">Email</label>
          <Input
            name="_email"
            type="email"
            theme="dashboard"
            className="bg-white"
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 inline-block">Phone</label>
          <Input
            name="_phone"
            type="text"
            theme="dashboard"
            className="bg-white"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label className="mb-2 inline-block">Role</label>
          <Select arr={roles}  selected={selected} setSelected={setSelected}/>
        </div>
        {message && (
          <div className="py-2 px-5 mb-5 rounded-md text-white  bg-[#e63757] border border-[#e63757]">
            {message}
          </div>
        )}
        <div className={`flex ${closeModal && `justify-end space-x-2 `} `}>
        {closeModal && 
        <button onClick={closeModal} type="button" className="py-2 px-4 text-white bg-pink-500 rounded-[0.25rem] hover:bg-pink-700">Close</button>
        }
        <SubmitButton
          classname="py-2 px-5 leading-5  text-white bg-indigo-500 rounded-[0.25rem] hover:bg-indigo-700"
          text={`${closeModal ? `Add`:`Create `}`}
        />
      
        </div>
       
      </div>
     
    </form>
  );
};

export default AddNewUser;
