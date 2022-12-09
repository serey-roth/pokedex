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

    const handlePageChange = (page) => {
        setPage(page);
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
        <div className='w-full flex flex-col items-start relative min-h-screen'>
            <div className='w-full flex flex-wrap items-center fixed z-10
            justify-center bg-black text-white p-3 gap-3 lg:h-[75px]
            h-fit'>
                <PokedexRegions 
                    region={region} 
                    onChange={handleRegionChange} />
                <h1 className='animate-slideleft
                font-bold uppercase text-2xl'>
                    Pokedex
                </h1>    
                <SearchBar 
                    search={search} 
                    onChange={handleSearchChange} />
            </div>
            <div className='flex items-center justify-center mt-[4.5em]
            flex-wrap w-full'>
                {visibleData.map(entry => (
                    <PokemonCard query={entry.entry_number} />
                ))}
            </div>
        </div>
    )
}

export default Pokedex