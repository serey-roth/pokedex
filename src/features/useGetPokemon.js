import {
    useGetPokemonQuery,
    useGetPokemonSpeciesQuery,
} from '../redux/services/pokemonApi'

export const useGetPokemon = (id) => {
    const { 
        data: base, 
        isFetching: isFetchingBase, 
        error: errorBase
    } = useGetPokemonQuery(id);

    const { 
        data: species, 
        isFetching: isFetchingSpecies, 
        error: errorSpecies
    } = useGetPokemonSpeciesQuery(id);
    
    return {
        base,
        isFetchingBase,
        errorBase,
        species,
        isFetchingSpecies,
        errorSpecies
    }
}