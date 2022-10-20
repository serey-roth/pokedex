import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        id: null,
        type: null,
        generation: -1,
        version: 'red-blue',
        color: null,
        base: null,
        species: null,
        evolutions: null,
        typings: {},
        selectGeneration: 1,
        selectMove: null,
        selectAbility: null,
        selectGenera: null,
        moveModal: false,
        abilityModal: false,
    },
    reducers: {
        setId(state, action) {
            state.id = action.payload;
        },
        setType(state, action) {
            state.type = action.payload;
        },
        setVersion(state, action) {
            state.version = action.payload;
        },
        setBase(state, action) {
            state.base = action.payload;
        },
        setSpecies(state, action) {
            state.species = action.payload;
        },
        setEvolutions(state, action) {
            state.evolutions = action.payload;
        },
        setTypings(state, action) {
            state.typings = action.payload;
        },
        setSelectMove(state, action) {
            state.selectMove = action.payload
        },
        setSelectAbility(state, action) {
            state.selectAbility = action.payload
        },
        setMoveModal(state, action) {
            state.moveModal = action.payload
        },
        setAbilityModal(state, action) {
            state.abilityModal = action.payload
        },
        setGeneration(state, action) {
            switch(action.payload) {
                case 'i': { state.generation = 1; break; }
                case 'ii': { state.generation = 2; break; }
                case 'iii': { state.generation = 3; break; }
                case 'iv': { state.generation = 4; break; }
                case 'v': { state.generation = 5; break; }
                case 'vi': { state.generation = 6; break; }
                case 'vii': { state.generation = 7; break; }
                case 'viii': { state.generation = 8; break; }
            }
        },
        setSelectGeneration(state, action) {
            state.selectGeneration = action.payload
        },
    }
})

export const { 
    setId,
    setType,
    setBase,
    setEvolutions,
    setVersion,
    setSpecies,
    setTypings,
    setSelectAbility,
    setSelectMove,
    setMoveModal,
    setAbilityModal,
    setGeneration,
    setSelectGeneration
} = pokemonSlice.actions

export default pokemonSlice.reducer