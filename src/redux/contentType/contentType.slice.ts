import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentType } from "../../types/contentType.types";
import { getContentTypes } from "../../services/contentType.service";

// Thunk לטעינת כל סוגי התוכן מהשרת
export const fetchContentTypes = createAsyncThunk("contentType/fetchContentTypes", async () => {
    const data = await getContentTypes();
    return data;
});

type ContentTypeState = {
    contentTypes: ContentType[]
}

const initialState: ContentTypeState = {
    contentTypes: []
}

const contentTypeSlice = createSlice({
    name: 'contentType',
    initialState,
    reducers: {
        setContentTypes: (state, action: PayloadAction<ContentType[]>) => {
            state.contentTypes = action.payload;
        },
        addContentType: (state, action: PayloadAction<ContentType>) => {
            state.contentTypes.push(action.payload);
        },
        updateContentType: (state, action: PayloadAction<ContentType>) => {
            const index = state.contentTypes.findIndex(ct => ct.id === action.payload.id);
            if (index !== -1) {
                state.contentTypes[index] = action.payload;
            }
        },
        deleteContentType: (state, action: PayloadAction<number>) => {
            state.contentTypes = state.contentTypes.filter(ct => ct.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContentTypes.fulfilled, (state, action: PayloadAction<ContentType[]>) => {
                state.contentTypes = action.payload;
            })
            .addCase(fetchContentTypes.rejected, (state, action) => {
                console.error("Failed to fetch content types:", action.error.message, state);
            });
    }
});

export const { setContentTypes, addContentType, updateContentType, deleteContentType } = contentTypeSlice.actions;
export default contentTypeSlice.reducer;