import { useState } from 'react'
import { useQuery } from 'react-query'
import { pokemonApi } from '../api/pokemonApi';

export const usePokemons = () => {
    const [page, setPage] = useState(1);
    
    const query = useQuery(
        ['pokemons', page], 
        () => pokemonApi.getPokemonsList(page),
        {
            keepPreviousData: true,
        }
    )

    return { 
        ...query,
        page,
        setPage
    }
}

export const usePokemon = (id) => {
    return useQuery(
        ['pokemon', id],
        () => pokemonApi.getPokemon(id),
        {
            keepPreviousData,
        }
    )
}

export const useEvolutions = (speciesId) => {
    return useQuery(
        ['evolutions', speciesId],
        () => pokemonApi.getEvolutions(speciesId),
        {
            keepPreviousData,
        }
    )
}

export const useSpecies = (id) => {
    return useQuery(
        ['species', id],
        () => pokemonApi.getSpecies(id),
        {
            keepPreviousData,
        }
    )
}

export const useAbility = (ability) => {
    return useQuery(
        ['ability', ability],
        () => pokemonApi.getAbility(ability),
        {
            keepPreviousData,
        }
    )
}

export const useMove = (move) => {
    return useQuery(
        ['move', move],
        () => pokemonApi.getMove(move),
        {
            keepPreviousData,
        }
    )
}

export const usePokedex = (pokedex) => {
    return useQuery(
        ['pokedex', pokedex],
        () => pokemonApi.getPokedex(pokedex),
        {
            keepPreviousData,
        }
    )
}

export const useType = (type) => {
    return useQuery(
        ['type', type],
        () => pokemonApi.getType(type),
        {
            keepPreviousData,
        }
    )
}