import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateRegion } from '../redux/features/pokedexSlice';

const regions = ['national', 'kanto',
    'original-johto', 'updated-johto', 'hoenn', 'updated-hoenn',
    'original-sinnoh', 'extended-sinnoh', 'original-unova', 'updated-unova',
    'kalos-central', 'kalos-coastal', 'kalos-mountain',
    'original-ulaula', 'updated-ulaula', 
    'original-melemele', 'updated-melemele',
    'original-akala', 'updated-akala',
    'original-poni', 'updated-poni',
    'galar', 'isle-of-armor', 'crown-tundra', 'hisui'];

const PokedexRegions = ({ active }) => {
    const dispatch = useDispatch();
    const currentRegion = useSelector(state => state.pokedex.region);

    const handleChange = (e) => {
        dispatch(updateRegion(e.target.value.replace(/\'/g, '').replace(/\s/g, '')));
    }

    return (
        <select className={`text-black font-semibold
        text-sm text-center p-2 appearance-none cursor-pointer
        rounded-lg capitalize outline-none 
        ${!active && 'pointer-events-none opacity-50'}`}
        value={currentRegion} onChange={handleChange}>
            {regions.map(region => (
                <option
                key={region} 
                value={region}
                >
                    {region.replace(/\-/g, ' ')}
                </option>
            ))}
        </select>
    )
}

export default PokedexRegions