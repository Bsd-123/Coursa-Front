import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../types/course.types";
import { getCourses } from "../../services/course.service";

// Thunk לטעינת כל הקורסים
export const fetchCourses = createAsyncThunk("course/fetchCourses", async () => {
    const data = await getCourses();
    return data;
});

type CourseState = {
    courses: Course[]
}

const initialState: CourseState = {
    courses: []
}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
        },
        addCourse: (state, action: PayloadAction<Course>) => {
            state.courses.push(action.payload);
        },
        updateCourse: (state, action: PayloadAction<Course>) => {
            const index = state.courses.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.courses[index] = action.payload;
            }
        },
        deleteCourse: (state, action: PayloadAction<number>) => {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                console.error("Failed to fetch courses:", action.error.message, state);
            });
    }
});

export const { setCourses, addCourse, updateCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;