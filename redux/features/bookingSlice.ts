import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SeatInterface, TheaterInfoInterface } from '@/common.types'
import { comboData } from '@/app/(client)/(ticketing)/chon-combo/comboData'  

// Define a type for the slice state
interface BookingState {
    listSeatSelected: SeatInterface[],
    comboData:any[],
    totalCost :number,
    totalCostPlus:number,
    totalCostMinus:number,
    theaterInfo:Partial<TheaterInfoInterface>
    statusStepsButtonStore:boolean,
  
     
}

// Define the initial state using that type
const initialState: BookingState = {
    theaterInfo: {},
    comboData:comboData,
    listSeatSelected: [],
    totalCost :0,
    totalCostPlus :0,
    totalCostMinus:0,
    statusStepsButtonStore:false,
   
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
   
    
    setListSeatSelectedStore: (state, action: PayloadAction<SeatInterface[]>) => {
      state.listSeatSelected = action.payload
     
    },
    setTotalCostStore:(state,action:PayloadAction<number>)=>{
      state.totalCost = action.payload
     
    },
    setTheaterInfoStore:(state,action:PayloadAction<TheaterInfoInterface>)=>{
      state.theaterInfo=action.payload
     
    },
    setBookingStoretDefault: (state)=>{
      state.totalCost = 0
      state.listSeatSelected=[]
      state.comboData=comboData
   
    },
    setComboDataStore : (state,action:PayloadAction<any>)=>{
          state.comboData = action.payload
        
    },
    setStatusStepsButtonStore : (state,action:PayloadAction<boolean>)=>{
      state.statusStepsButtonStore = action.payload
    },
 

  },
})

export const {  setListSeatSelectedStore,setTotalCostStore ,setTheaterInfoStore,setBookingStoretDefault,setComboDataStore,setStatusStepsButtonStore} = bookingSlice.actions

export default bookingSlice.reducer