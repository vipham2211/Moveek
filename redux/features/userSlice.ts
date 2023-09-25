import { userInfoI } from '@/common.types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
interface userState {

     userInfo:userInfoI
}

// Define the initial state using that type
const initialState: userState = {
	userInfo:{
		taiKhoan: '',
		matKhau: '',
		hoTen: '',
		email: '',
		soDT: '',
		maNhom: '',
		loaiNguoiDung: '',
		thongTinDatVe:[]
	}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    setUserInfo:(state,action:PayloadAction<userInfoI>)=>{
		state.userInfo = action.payload
	}
  },
})

export const {  setUserInfo} = userSlice.actions

export default userSlice.reducer