import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Lesson } from "../../types/lesson.types";
import { getLessons } from "../../services/lesson.service";

// Thunk לטעינת כל השיעורים
export const fetchLessons = createAsyncThunk("lesson/fetchLessons", async () => {
    const data = await getLessons();
    return data;
});

type LessonState = {
    lessons: Lesson[]
}

const initialState: LessonState = {
    lessons: []
}

const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        setLessons: (state, action: PayloadAction<Lesson[]>) => {
            state.lessons = action.payload;
        },
        addLesson: (state, action: PayloadAction<Lesson>) => {
            state.lessons.push(action.payload);
        },
        updateLesson: (state, action: PayloadAction<Lesson>) => {
            const index = state.lessons.findIndex(l => l.id === action.payload.id);
            if (index !== -1) {
                state.lessons[index] = action.payload;
            }
        },
        deleteLesson: (state, action: PayloadAction<number>) => {
            state.lessons = state.lessons.filter(lesson => lesson.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessons.fulfilled, (state, action: PayloadAction<Lesson[]>) => {
                state.lessons = action.payload;
            })
            .addCase(fetchLessons.rejected, (state, action) => {
                console.error("Failed to fetch lessons:", action.error.message, state);
            });
    }
});

export const { setLessons, addLesson, updateLesson, deleteLesson } = lessonSlice.actions;
export default lessonSlice.reducer;