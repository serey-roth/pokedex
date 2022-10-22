import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        id: null,
        type: null,
        form: null, 
        generation: -1, //generation in which the pokemon is introduced
        version: 'red-blue',
        color: null,
        base: null,
        species: null,
        evolutions: null,
        typings: {},
        selectGeneration: 1, //the generation of the game that the user chooses
        selectMove: null,
        selectAbility: null,
        selectGenera: null,
    },
    reducers: {
        setId(state, action) {
            state.id = action.payload;
        },
        setType(state, action) {
            state.type = action.payload;
        },
        setForm : {
            reducer: (state, action) => {
                state.form = action.payload;
            },
            prepare(form) {
                let payload;
                if (/[a-z]+\-[a-z]{2,}/g.test(form)) {
                    payload = form;
                }
                return { payload };
            }
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
    setForm,
    setBase,
    setEvolutions,
    setVersion,
    setSpecies,
    setTypings,
    setSelectAbility,
    setSelectMove,
    setGeneration,
    setSelectGeneration
} = pokemonSlice.actions

export default pokemonSlice.reducer