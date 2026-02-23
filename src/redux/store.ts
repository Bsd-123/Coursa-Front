import { configureStore } from '@reduxjs/toolkit'
import coupon from './coupon/coupon.slice'
import user from './user/user.slice'
import owner from './owner/owner.slice'
import course from './course/course.slice'
import  contentType  from './contentType/contentType.slice'
import { useDispatch, useSelector } from 'react-redux'
import progress from './progress/progress.slice'
import skill from './skill/skill.slice'
import enrollment from './enrollment/enrollment.slice'
import lesson  from './lesson/lesson.slice'
export const store = configureStore({
    reducer: {
        user,
        course,
        contentType,
        progress,
        enrollment,
        skill,
        owner,
        coupon,
        lesson
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()