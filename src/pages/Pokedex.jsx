import React, { useState, useEffect, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../components/Loader';
import Error from '../components/Error';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';

import { useGetPokemonsQuery } from '../redux/services/pokemonApi';
import { updatePokedex } from '../redux/features/pokedexSlice';

const Pokedex = ({ pageNum, setPageNum }) => {
    const dispatch = useDispatch();

    const [namesSoFar, updateNamesSoFar] = useState([]);
    const [search, updateSearch] = useState('');
    const [searchResults, updateSearchResults] = useState(null);
    const pokedex = useSelector(state => state.pokedex);

    const { data, isFetching, error } = useGetPokemonsQuery(pokedex.length > 0 ? -1 : 1000); 

    useEffect(() => {
        if (data?.results) {
            const entries = data.results.map(result => result.name);
            dispatch(updatePokedex(entries));
        }
    }, [data]);

    useEffect(() => {
        const count = 8 + 4 * pageNum;
        if (searchResults) updateNamesSoFar(searchResults.slice(0, count));
        else updateNamesSoFar(pokedex.slice(0, count));
    }, [pageNum, searchResults, pokedex]);

    useEffect(() => {
        if (search && pokedex.length > 0) {
            const results = pokedex.filter(name => name.includes(search));
            updateSearchResults(results);
        }
        if (!search) {
            updateSearchResults(null);
        }
        setPageNum(0);
        window.scrollTo(0, 0);
    }, [search]);

    if (isFetching) return (<Loader />)

    if (error) return (<Error />);

    return (
        <div className='w-full flex flex-col min-h-[110vh] items-start relative'>
            <div className='w-full flex flex-wrap fixed z-10
            items-center justify-center gap-3 bg-black text-yellow-400 p-3'>
                <h1 className='animate-slideleft
                font-bold uppercase text-2xl'>
                    Pokedex
                </h1>    
                <SearchBar search={search} updateSearch={updateSearch} />
            </div>
            <div className='flex-1 flex flex-col sm:grid mt-[4.5em]
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
                {namesSoFar.map(name => 
                (<PokemonCard key={`pokemon-${name}`} query={name} />))}
            </div>
        </div>
    )
}

export default Pokedex