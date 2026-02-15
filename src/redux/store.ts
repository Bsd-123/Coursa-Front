import { configureStore } from '@reduxjs/toolkit'
import coupon from './coupon/coupon.slice'
import user from './user/user.slice'
import { useDispatch, useSelector } from 'react-redux'
export const store = configureStore({
    reducer: {
        user,
        coupon,
        
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()