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

    //the pokemons that have been displayed so far based on the scroll position
    const [namesSoFar, updateNamesSoFar] = useState([]);
    //the search input
    const [search, updateSearch] = useState('');
    //the results from the search
    const [searchResults, updateSearchResults] = useState(null);
    //the list of all pokemon names
    const pokedex = useSelector(state => state.pokedex);

    //get the names of all pokemons
    const { data, isFetching, error } = useGetPokemonsQuery(pokedex.length > 0 ? -1 : 1000); 

    useEffect(() => {
        if (data?.results) {
            const entries = data.results.map(result => 
                /[a-z]+\-[a-z]{2,}/g.test(result.name) ? null : result.name)
                .filter(entry => entry !== null);
            dispatch(updatePokedex(entries));
        }
    }, [data]);

    useEffect(() => {
        //the numbers displayed depends on the page number which depends
        //on how far the user has scrolled down the page
        const count = 8 + 4 * pageNum;
        //if there is a search, then show the search results based on the 
        //given count; otherwise, show the pokedex based on the count
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
        //scroll to top of the pokedex for every new search or no search
        window.scrollTo(0, 0);
    }, [search]);

    if (isFetching) return (<Loader />)

    if (error) return (<Error />);

    return (
        <div className='w-full flex flex-col items-start relative'>
            <div className='w-full flex flex-wrap fixed z-10
            items-center justify-center gap-3 bg-black text-yellow-400 p-3'>
                <h1 className='animate-slideleft
                font-bold uppercase text-2xl'>
                    Pokedex
                </h1>    
                <SearchBar search={search} updateSearch={updateSearch} />
            </div>
            <div className='flex flex-col sm:grid mt-[4.5em]
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
                {namesSoFar.map(name => 
                (<PokemonCard key={`pokemon-${name}`} query={name} />))}
            </div>
        </div>
    )
}

export default Pokedex