import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemons: builder.query({ query: (limit) => limit < 0 ? '' : `pokemon/?limit=${limit}` }),
        getPokemon: builder.query({ query: (query) => query ? `pokemon/${query}` : '' }),
        getPokemonEvolutions: builder.query({ query: (speciesId) => speciesId ? `evolution-chain/${speciesId}` : '' }),
        getTypings: builder.query({ query: (type) => `type/${type}` }),
        getPokemonSpecies: builder.query({ query: (query) => query ? `pokemon-species/${query}` : '' }),
        getPokemonMove: builder.query({ query: (move) => move ? `move/${move}` : '' }),
        getPokemonAbility: builder.query({ query: (ability) => ability ? `ability/${ability}` : '' }),
    })
})

export const {
    useGetPokemonsQuery,
    useGetPokemonQuery,
    useGetPokemonEvolutionsQuery,
    useGetPokemonSpeciesQuery,
    useGetPokemonMoveQuery,
    useGetPokemonAbilityQuery,
    useGetTypingsQuery,
} = pokemonApi;
