import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Coupon } from "../../types/coupon.types";
import { getCoupons } from "../../services/coupon.service"; // וודא שיש לך service כזה

// Thunk לטעינת כל הקופונים מהשרת
export const fetchCoupons = createAsyncThunk("coupon/fetchCoupons", async () => {
    const data = await getCoupons();
    return data;
});

type CouponState = {
    coupons: Coupon[]
}

const initialState: CouponState = {
    coupons: []
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setCoupons: (state, action: PayloadAction<Coupon[]>) => {
            state.coupons = action.payload;
        },
        // שיניתי ללשון יחיד addCoupon
        addCoupon: (state, action: PayloadAction<Coupon>) => {
            state.coupons.push(action.payload);
        },
        updateCoupon: (state, action: PayloadAction<Coupon>) => {
            const index = state.coupons.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.coupons[index] = action.payload;
            }
        },
        deleteCoupon: (state, action: PayloadAction<number>) => {
            state.coupons = state.coupons.filter(coupon => coupon.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
                state.coupons = action.payload;
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                console.error("Failed to fetch coupons:", action.error.message, state);
            });
    }
});

export const { setCoupons, addCoupon, updateCoupon, deleteCoupon } = couponSlice.actions;
export default couponSlice.reducer;