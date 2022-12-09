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

//each new request for the same pokemon must have a new query key
//otherwise, it's going to run forever
export const usePokemon = (id, queryKey=['pokemon']) => {
    return useQuery(
        [...queryKey, id],
        () => pokemonApi.getPokemon(id),
        {
            keepPreviousData: true,
        }
    )
}

export const useEvolutions = (evolutionId) => {
    return useQuery(
        ['evolutions', evolutionId],
        () => pokemonApi.getEvolutions(evolutionId),
        {
            keepPreviousData: true,
        }
    )
}

export const useSpecies = (id) => {
    return useQuery(
        ['species', id],
        () => pokemonApi.getSpecies(id),
        {
            keepPreviousData: true,
        }
    )
}

export const useAbility = (ability) => {
    return useQuery(
        ['ability', ability],
        () => pokemonApi.getAbility(ability),
        {
            keepPreviousData: true,
        }
    )
}

export const useMove = (move) => {
    return useQuery(
        ['move', move],
        () => pokemonApi.getMove(move),
        {
            keepPreviousData: true,
        }
    )
}

export const usePokedex = (pokedex) => {
    return useQuery(
        ['pokedex', pokedex],
        () => pokemonApi.getPokedex(pokedex),
        {
            keepPreviousData: true,
        }
    )
}

export const useType = (type) => {
    return useQuery(
        ['type', type],
        () => pokemonApi.getType(type),
        {
            keepPreviousData: true,
        }
    )
}