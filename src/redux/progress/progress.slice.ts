import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Progress } from "../../types/progress.types";
import { getProgresses } from "../../services/progress.service";

// Thunk לטעינת כל ההתקדמויות
export const fetchProgresses = createAsyncThunk("progress/fetchProgresses", async () => {
    const data = await getProgresses();
    return data;
});

type ProgressState = {
    progresses: Progress[]
}

const initialState: ProgressState = {
    progresses: []
}

const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        setProgresses: (state, action: PayloadAction<Progress[]>) => {
            state.progresses = action.payload;
        },
        addProgress: (state, action: PayloadAction<Progress>) => {
            state.progresses.push(action.payload);
        },
        // עדכון התקדמות (לפי userId ו-lessonId כי זה מפתח מורכב)
        updateProgress: (state, action: PayloadAction<Progress>) => {
            const index = state.progresses.findIndex(
                p => p.userId === action.payload.userId && p.lessonId === action.payload.lessonId
            );
            if (index !== -1) {
                state.progresses[index] = action.payload;
            }
        },
        // מחיקה לפי מפתח מורכב
        deleteProgress: (state, action: PayloadAction<{ userId: number, lessonId: number }>) => {
            state.progresses = state.progresses.filter(
                p => !(p.userId === action.payload.userId && p.lessonId === action.payload.lessonId)
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProgresses.fulfilled, (state, action: PayloadAction<Progress[]>) => {
                state.progresses = action.payload;
            })
            .addCase(fetchProgresses.rejected, (state, action) => {
                console.error("Failed to fetch progresses:", action.error.message ,state);
            });
    }
});

export const { setProgresses, addProgress, updateProgress, deleteProgress } = progressSlice.actions;
export default progressSlice.reducer;