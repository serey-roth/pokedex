import React, { useState, useEffect, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../components/Loader';
import Error from '../components/Error';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import PokedexRegions from '../components/PokedexRegions';

import { useGetPokedexQuery, useGetPokemonsQuery } from '../redux/services/pokemonApi';
import { updatePokedex } from '../redux/features/pokedexSlice';


const Pokedex = ({ pageNum, setPageNum }) => {
    const dispatch = useDispatch();

    //the pokemons that have been displayed so far based on the scroll position
    const [namesSoFar, updateNamesSoFar] = useState([]);
    //the search input
    const [search, updateSearch] = useState('');
    //the results from the search
    const [searchResults, updateSearchResults] = useState(null);
    const [activeRegionSelect, setActiveRegionSelect] = useState(true);

    //the list of all pokemon names
    const { list: pokedex, region } = useSelector(state => state.pokedex);

    const { data, isFetching, error} = useGetPokedexQuery(region);

    useEffect(() => {
        if (data) {
            const entries = data.pokemon_entries?.map(entry =>
                entry.pokemon_species?.name);
            dispatch(updatePokedex(entries));
        }
    }, [data]);

    useEffect(() => {
        //the numbers displayed depends on the page number which depends
        //on how far the user has scrolled down the page
        const count = 15 + 5 * pageNum;
        //if there is a search, then show the search results based on the 
        //given count; otherwise, show the pokedex based on the count
        if (searchResults) updateNamesSoFar(searchResults.slice(0, count));
        else updateNamesSoFar(pokedex.slice(0, count));
    }, [pageNum, searchResults, pokedex]);

    useEffect(() => {
        if (search && pokedex.length > 0) {
            const results = pokedex.filter(name => name.includes(search));
            updateSearchResults(results);
            setActiveRegionSelect(false)
        }
        if (!search) {
            updateSearchResults(null);
            setActiveRegionSelect(true);
        }
        setPageNum(0);
        //scroll to top of the pokedex for every new search or no search
        window.scrollTo(0, 0);
    }, [search]);

    if (isFetching) return (<Loader />)

    if (error) return (<Error />);

    return (
        <div className='w-full flex flex-col items-start relative min-h-screen'>
            <div className='w-full flex flex-wrap items-center fixed z-10
            justify-center bg-black text-white p-3 gap-3 lg:h-[75px]
            h-fit'>
                <PokedexRegions active={activeRegionSelect} />
                <h1 className='animate-slideleft
                font-bold uppercase text-2xl'>
                    Pokedex
                </h1>    
                <SearchBar search={search} updateSearch={updateSearch} />
            </div>
            <div className='flex items-center justify-center mt-[4.5em]
            flex-wrap w-full'>
                {namesSoFar.map(name => 
                (<PokemonCard key={`pokemon-${name}`} query={name} />))}
            </div>
        </div>
    )
}

export default Pokedex