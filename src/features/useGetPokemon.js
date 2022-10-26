import {
    useGetPokemonQuery,
    useGetPokemonSpeciesQuery,
} from '../redux/services/pokemonApi'

export const useGetPokemon = (query) => {
    const { 
        data: base, 
        isFetching: isFetchingBase, 
        error: errorBase
    } = useGetPokemonQuery(query);

    //if the query is non-default form of a pokemon like mega evolutions,
    //then we don't fetch the species data 
    const { 
        data: species, 
        isFetching: isFetchingSpecies, 
        error: errorSpecies
    } = useGetPokemonSpeciesQuery(base?.is_default ? query.replace(/\-[a-z]{3,}$/g, '') : null);
    
    const result = {
        base,
        isFetchingBase,
        errorBase,
    }

    if (species && species.id) {
        return {
            ...result, 
            species,
            isFetchingSpecies,
            errorSpecies
        }
    } else {
        return result;
    }
}