"use server";
import { convertString } from "@/common.funcs";
import { NewUserInterface, UserInfoInterface } from "@/common.types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function loginAction(formData: FormData) {
  let login = {
    taiKhoan: formData.get("_username"),
    matKhau: formData.get("_password"),
  };

  const res = await fetch(`${process.env.DOMAIN}/QuanLyNguoiDung/DangNhap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json ",
    },
    body: JSON.stringify(login),
  }).then((res) => res.json());

  if (res.statusCode === 200) {
    cookies().set("REMEMBERME", JSON.stringify(res.content), {
      httpOnly: true,
      secure: true,
    });
  }
  return res;
}
export async function registerAction(formData: FormData) {
  let rerister = {
    taiKhoan: formData.get("_username"),
    matKhau: formData.get("_password"),
    email: formData.get("_email"),
    soDt: formData.get("_phone"),
    maNhom: "GP00",
    hoTen: formData.get("_fullname"),
  };

  const res = await fetch(`${process.env.DOMAIN}/QuanLyNguoiDung/DangKy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json ",
    },
    body: JSON.stringify(rerister),
  }).then((res) => res.json());

  return res;
}
export async function fetchUserProfileAction() {
  const userCookie = cookies().get("REMEMBERME");
  if (!userCookie) redirect('/login');
  const { accessToken } = JSON.parse(userCookie.value);
  const res = await fetch(
    `${process.env.DOMAIN}/QuanLyNguoiDung/ThongTinTaiKhoan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["userProfile"] },
    }
  );

  if (!res.ok) {
    
    throw new Error(`${res.status} : Failed to load data user profile`);
  }
  const data = await res.json();

  return data.content;
}

export async function updateProfileAction( userUpdate: NewUserInterface) {
  const userCookie = cookies().get("REMEMBERME");
  if (!userCookie) return;
  const { accessToken } = JSON.parse(userCookie.value);
 
  const res = await fetch(
    `${process.env.DOMAIN}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userUpdate),
    }
  );
  const data = await res.json();
  if (data.statusCode === 200) {
    revalidateTag("userProfile");
    revalidateTag('listUser')
  }
  return data;
}

export async function changePasswordAction(
  formData: FormData,
  userInfo: Partial<UserInfoInterface>
) {
  const userCookie = cookies().get("REMEMBERME");
  if (!userCookie) return;
  const { accessToken } = JSON.parse(userCookie.value);
  let newPassword = formData.get("_newPassword");
  let userUpdate = {
    taiKhoan: userInfo.taiKhoan,
    email: userInfo.email,
    hoTen: userInfo.hoTen,
    matKhau: newPassword,
    soDt: userInfo.soDT,
    maNhom: userInfo.maNhom,
    maLoaiNguoiDung:
      userInfo.loaiNguoiDung && convertString(userInfo.loaiNguoiDung),
  };
  const res = await fetch(
    `${process.env.DOMAIN}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userUpdate),
    }
  );
  const data = await res.json();
  if (data.statusCode === 200) {
   
    revalidateTag("userProfile");
    revalidateTag('listUser')
  }
  return data;
}

export async function fetchListUsersAction(soTrang:number,soPhanTuTrenTrang:number,tuKhoa?:string) {

  const keywordParam =  tuKhoa  ? `&tuKhoa=${tuKhoa}` : '';
  const res = await fetch(
    `${process.env.DOMAIN}/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP00${keywordParam}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    
  );
  if (!res.ok) {
    
    throw new Error(`${res.status} : Failed to load data list users`);
  }
    const data = await res.json();
   

    return data.content
}

export async function addNewUserAction (newUser:NewUserInterface){
  const userCookie = cookies().get("REMEMBERME");
  if (!userCookie) return undefined;
  const { accessToken } = JSON.parse(userCookie.value);

  const res = await fetch(
    `${process.env.DOMAIN}/QuanLyNguoiDung/ThemNguoiDung`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newUser),
    }
  );
  const data = await res.json();
 
 
  return data
}
export async function deleteUserAction (taiKhoan:string){
  const userCookie = cookies().get("REMEMBERME");
  if (!userCookie) return undefined;
  const { accessToken } = JSON.parse(userCookie.value);

  const res = await fetch(
    `${process.env.DOMAIN}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();

  return data
}

export async function checkToken() {
  const userCookie = cookies().get("REMEMBERME");
  if (!userCookie) return undefined;
  const { accessToken } = JSON.parse(userCookie.value);
  return accessToken;
}

export async function revalidateTagAction(tag:string) {
  revalidateTag(tag);
}
