import React, { useState, useEffect, createRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../components/Loader';
import Error from '../components/Error';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import PokedexRegions from '../components/PokedexRegions';

import { usePokedex } from '../features/hooks'

const ITEMS_PER_PAGE = 50;

const Pokedex = () => {
    const [page, setPage] = useState(1);
    const [region, setRegion] = useState('national');
    const [search, updateSearch] = useState('');

    const { 
        data,
        isLoading,
        isError, 
        error,
        isFetching,
        isPreviousData,
    } = usePokedex(region);

    const handleRegionChange = (e) => {
        setRegion(e.target.value.replace(/\'/g, '').replace(/\s/g, ''));
    }

    const handleSearchChange = (e) => {
        if (/^[a-z\-]*$/gi.test(e.target.value)) {
            updateSearch(e.target.value.toLowerCase())
        }
    }

    const handleLoadMore = () => {
        setPage(page => page + 1);
    }

    const visibleData = useMemo(() => {
        if (isPreviousData) return;

        if (data) {
            let pokemons = data.pokemon_entries;

            if (search) {
                pokemons = pokemons.filter(pokemon => 
                pokemon.pokemon_species.name.includes(search.toLowerCase()));
            }

            return pokemons.slice((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
        } else {
            return [];
        }
    }, [page, data, isPreviousData, search]);

    if (isLoading || isFetching) return (<Loader />)

    if (isError && error) return (<Error />);

    return (
        <div className='w-full grid gap-2 relative min-h-screen'>
            <div className='w-full flex flex-wrap items-center px-3 py-1
            bg-black text-white'>
                <h1 className='animate-slideleft font-bold uppercase text-2xl
                flex-1'>
                    Pokedex
                </h1>    
                
                <SearchBar 
                    search={search} 
                    onChange={handleSearchChange} />
            </div>
            
            <span className='justify-self-end mx-2'>
            <PokedexRegions 
                    region={region} 
                    onChange={handleRegionChange} />
            </span>

            <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 mx-2'>
                {visibleData.map(entry => (
                    <PokemonCard query={entry.entry_number} />
                ))}
            </div>

            <button 
            className='border-slate-500 mx-2 mb-2 bg-black text-white
            py-2' 
            onClick={handleLoadMore}>
                Load More
            </button>
        </div>
    )
}

export default Pokedex