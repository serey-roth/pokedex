import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ImSpinner } from 'react-icons/im'

import { types } from '../assets';
import PokemonPlaceHolder from './PokemonPlaceHolder';
import PokemonType from './PokemonType';
import ImagePlaceHolder from './ImagePlaceHolder';

import { pokemonApi, useGetPokemonQuery } from '../redux/services/pokemonApi'
import { updatePage } from '../redux/features/uiSlice';

//for lazy loading image
const PokemonImage = React.lazy(() => import('./PokemonImage'))

const PokemonCard = ({ query }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, isFetching, error } = useGetPokemonQuery(query);
    
    const handleClick = (pokemon) => {
        if (pokemon) {
            dispatch(updatePage('pokemon'));
            navigate(`/pokemon/${pokemon}`);
        }
    }

    if (isFetching) 
    return (
        <PokemonPlaceHolder>
            <ImSpinner className='w-[50px] h-[50px] animate-spin' />
        </PokemonPlaceHolder>
    )

    if (error) 
    return (
        <PokemonPlaceHolder>
            Error!
        </PokemonPlaceHolder>
    )

    return (
        <div className={`flex flex-col justify-center 
        h-fit p-4 border-2 relative gap-2 backdrop-blur-sm`}>
            <h3 className={`font-[900] text-[2em] italic 
            ${data && types[data.types[0].type.name].textColor}
            absolute top-1`}>
                {data?.id}
            </h3>
            <React.Suspense 
            fallback={
                <div className='sm:w-[200px] flex flex-col self-center 
                h-[300px] sm:h-[200px]'>
                    <ImagePlaceHolder />
                </div>
            }>
                <div className='sm:w-[200px] flex flex-col self-center 
                h-[300px] sm:h-[200px]'>
                    <PokemonImage 
                    src={data?.sprites?.other['official-artwork'].front_default} />
                </div>
             </React.Suspense>
            <div className='flex flex-wrap items-center w-full break-words'>
                <h1 className={`flex-1 capitalize font-bold text-2xl
                cursor-pointer hover:text-black transition-colors
                ${data && types[data.types[0].type.name].textColor}`}
                onClick={() => handleClick(data?.name)}>
                    {data?.name}
                </h1>
                <div className='flex items-center gap-1'>
                {data?.types.map((typeObj) => (
                    <PokemonType key={typeObj.type.name}
                    size='w-[40px] h-[40px]'
                    type={typeObj.type.name} />
                ))}
                </div>
            </div>
        </div>
    )
}

export default PokemonCard