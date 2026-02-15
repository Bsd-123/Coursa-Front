import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Skill } from "../../types/skill.types";
import { getSkills } from "../../services/skill.service"

export const fetchSkills = createAsyncThunk("skill/fetchSkills", async () => {
    const data = await getSkills();
    return data;
})

type SkillState = {
    skills: Skill[]
}

const initialState: SkillState = {
    skills: []
}

const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        setSkills: (state, action: PayloadAction<Skill[]>) => {
            console.log(action);
            state.skills = action.payload
        },
        addSkill: (state, action: PayloadAction<Skill>) => {
            state.skills.push(action.payload)
        },
        updateSkill: (state, action: PayloadAction<Skill>) => {
            const index = state.skills.findIndex(c => c.id === action.payload.id)
            if (index !== -1) {
                state.skills[index] = action.payload
            }
        },
        deleteSkill: (state, action: PayloadAction<number>) => {
            state.skills = state.skills.filter(skill => skill.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<Skill[]>) => {
                state.skills = action.payload;
            })
            .addCase(fetchSkills.rejected, (state, action) => {

               console.error("Redux error: Failed to fetch skills", action.error.message ,state);
            });
    }
})

export const { setSkills, addSkill, updateSkill, deleteSkill } = skillSlice.actions
export default skillSlice.reducer
