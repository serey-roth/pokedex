import { createSlice } from "@reduxjs/toolkit";

const pokedex = createSlice({
    name: 'pokedex',
    initialState: [],
    reducers: {
        updatePokedex(state, action) {
            return action.payload;
        }
    }
})

export const { updatePokedex } = pokedex.actions;
export default pokedex.reducer;