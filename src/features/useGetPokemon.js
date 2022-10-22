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

    const { 
        data: species, 
        isFetching: isFetchingSpecies, 
        error: errorSpecies
    } = useGetPokemonSpeciesQuery(/[a-z]+\-[a-z]+/g.test(query) ? null : query);
    
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