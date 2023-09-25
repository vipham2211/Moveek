import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from '@/redux/features/bookingSlice'
import userReducer from '@/redux/features/userSlice'


export const store = configureStore({
    reducer: {
    booking:bookingReducer,
    user:userReducer
    },
    
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch