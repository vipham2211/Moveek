"use client";
import { loginAction } from "@/app/lib/actions/userAction";
import Input from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const Login = () => {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  
  async function login(formData: FormData) {
    const { statusCode, content } = await loginAction(formData);
    if (statusCode === 200) {
      if (content.maLoaiNguoiDung === "KhachHang") {
        return router.push("/");
      }
    
      return router.push("/dashboard ");
    }
    return setMessage(content);
  }

  return (
    <form action={login}>
      {message && (
        <div className="py-3 px-5 rounded-md text-white mb-6  bg-[#e63757] border border-[#e63757]">
          {message}
        </div>
      )}
      <div className="mb-5">
        <label className="mb-2 inline-block">Tài khoản</label>
        <Input name="_username" type="text" />
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block">Mật khẩu</label>
        <Input name="_password" type="password" />
      </div>
      <SubmitButton classname="w-full py-2 px-4 rounded-md  text-center bg-[#12263f] text-white  hover:bg-[#0a1421] hover:border-[#070e17]" text="Đăng nhập" />

      <div className="text-center mt-5">
        <small>
          Chưa có tài khoản?{" "}
          <Link href={"/register"} prefetch={false} className="text-blue">
            Đăng kí ngay
          </Link>
        </small>
      </div>
    </form>
  );
};

export default Login;
