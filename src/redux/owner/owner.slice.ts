import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Owner } from "../../types/owner.types";
import { getOwners } from "../../services/owner.service";

// Thunk לטעינת כל הבעלים
export const fetchOwners = createAsyncThunk("owner/fetchOwners", async () => {
    const data = await getOwners();
    return data;
});

type OwnerState = {
    owners: Owner[]
}

const initialState: OwnerState = {
    owners: []
}

const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwners: (state, action: PayloadAction<Owner[]>) => {
            state.owners = action.payload;
        },
        addOwner: (state, action: PayloadAction<Owner>) => {
            state.owners.push(action.payload);
        },
        updateOwner: (state, action: PayloadAction<Owner>) => {
            const index = state.owners.findIndex(o => o.id === action.payload.id);
            if (index !== -1) {
                state.owners[index] = action.payload;
            }
        },
        deleteOwner: (state, action: PayloadAction<number>) => {
            state.owners = state.owners.filter(owner => owner.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOwners.fulfilled, (state, action: PayloadAction<Owner[]>) => {
                state.owners = action.payload;
            })
            .addCase(fetchOwners.rejected, (state, action) => {
                console.error("Failed to fetch owners:", action.error.message, state);
            });
    }
});

export const { setOwners, addOwner, updateOwner, deleteOwner } = ownerSlice.actions;
export default ownerSlice.reducer;