import { configureStore } from '@reduxjs/toolkit'

import { pokemonApi } from './services/pokemonApi';
import uiReducer from './features/uiSlice';
import pokemonReducer from './features/pokemonSlice';
import pokedexReducer from  './features/pokedexSlice';

const store = configureStore({
    reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        'ui': uiReducer,
        'pokemon': pokemonReducer,
        'pokedex': pokedexReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(pokemonApi.middleware),
})

export default store;