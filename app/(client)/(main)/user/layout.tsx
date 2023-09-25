'use client'
import { fetchUserProfileAction } from "@/app/lib/actions/userAction";
import LoadingComponent from "@/components/shared/LoadingComponent";
import Menu from "@/components/ui/Menu";
import { setUserInfo } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { Fragment, useEffect } from "react";


const navigation = [
  { name: "Tài khoản", href: "/user/profile" },
  { name: "Đổi mật khẩu", href: "/user/change-password" },
  { name: "Vé", href: "/user/orders" },
];

export default  function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const dispatch = useAppDispatch()
  const userInfo= useAppSelector(state => state.user.userInfo)

  useEffect( ()=>{
    if(userInfo.taiKhoan.length ===0){
      const fetchUserInfo = async ()=>{
        const userInfo = await fetchUserProfileAction();
        dispatch(setUserInfo(userInfo))
      }
      fetchUserInfo()
    }
  
  },[dispatch,userInfo])

	
  return (
    <Fragment>
     
        <Image
          src={"/assets/tix-banner.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="tix-banner"
          priority
          className="w-full h-auto"
        />
        <div className="max-w-6xl mx-auto px-3">
          <div className="py-6 mb-8 md:-mt-[4.5rem] border-b border-[#e3ebf6] ">
            <div className="flex space-x-5">
              <Image
                src={"/assets/no-avatar.png"}
                width={0}
                height={0}
                sizes="100vw"
                alt="user-avatar"
                priority
                className="w-20 h-20 md:w-32 md:h-32 rounded-full"
              />
              <div className="flex text-2xl font-medium items-end mb-6">
              {userInfo.taiKhoan }
              </div>
            </div>
            <div className="pt-6">
             <Menu navigation={navigation} padding='py-6'/>
            </div>
          </div>
          <div className="w-full md:w-8/12">
            {userInfo.taiKhoan.length > 0 ? children : <LoadingComponent/>}
          
            </div>
        </div>
    
    </Fragment>
  );
}
