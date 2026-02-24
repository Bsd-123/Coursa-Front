import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Enrollment } from "../../types/enrollment.types";
import { getEnrollments } from "../../services/enrollment.service";

// Thunk לטעינת כל ההרשמות
export const fetchEnrollments = createAsyncThunk("enrollment/fetchMyEnrollments", async () => {
    const data = await getEnrollments();
    return data;
});

type EnrollmentState = {
    enrollments: Enrollment[]
}

const initialState: EnrollmentState = {
    enrollments: []
}

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {
        setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
            state.enrollments = action.payload;
        },
        addEnrollment: (state, action: PayloadAction<Enrollment>) => {
            state.enrollments.push(action.payload);
        },
        // עדכון לפי מפתח מורכב
        updateEnrollment: (state, action: PayloadAction<Enrollment>) => {
            const index = state.enrollments.findIndex(
                e => e.userId === action.payload.userId && e.courseId === action.payload.courseId
            );
            if (index !== -1) {
                state.enrollments[index] = action.payload;
            }
        },
        // מחיקה לפי מפתח מורכב (צריך את שני ה-IDs)
        deleteEnrollment: (state, action: PayloadAction<{ userId: number, courseId: number }>) => {
            state.enrollments = state.enrollments.filter(
                e => !(e.userId === action.payload.userId && e.courseId === action.payload.courseId)
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
                state.enrollments = action.payload;
            })
            .addCase(fetchEnrollments.rejected, (state, action) => {
                console.error("Failed to fetch enrollments:", action.error.message, state);
            });
    }
});

export const { setEnrollments, addEnrollment, updateEnrollment, deleteEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;