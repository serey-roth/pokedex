import { createSlice } from "@reduxjs/toolkit";

const pokedex = createSlice({
    name: 'pokedex',
    initialState: {
        list: [],
        region: 'national',
    },
    reducers: {
        updatePokedex(state, action) {
            state.list = action.payload;
        },
        updateRegion(state, action) {
            state.region = action.payload;
        }
    }
})

export const { updatePokedex, updateRegion } = pokedex.actions;
export default pokedex.reducer;