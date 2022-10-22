import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
    name: 'ui',
    initialState: {
        page: 'pokedex',
        moveModal: false,
        abilityModal: false,
    },
    reducers: {
        updatePage(state, action) {
            state.page = action.payload;
        },
        setMoveModal(state, action) {
            state.moveModal = action.payload
        },
        setAbilityModal(state, action) {
            state.abilityModal = action.payload
        },
    }
})

export const { updatePage, setAbilityModal, setMoveModal } = ui.actions;

export default ui.reducer;