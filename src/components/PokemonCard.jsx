import React from 'react'
import { useNavigate } from 'react-router-dom'

import { types } from '../assets';

import { usePokemon } from '../features/hooks';
import LoadedImage from './LoadedImage';

const PokemonCard = ({ id }) => {
    const navigate = useNavigate();

    const { 
        data,
        isFetching,
        isLoading,
        error,
        isError
    } = usePokemon(id);
    
    const handleClick = (pokemon) => {
        if (pokemon) {
            navigate(`/pokemon/${pokemon}`);
        }
    }

    if (!data?.is_default) return null;

    return (
        <div className='flex flex-col p-2 border-[0.5px] relative'>
            {(isLoading || isFetching || (isError && error)) ? (
                <>
                    <span className='w-full h-[80px] bg-slate-50 animate-pulse'></span>
                    <span className='w-full h-[10px] bg-slate-50 animate-pulse'></span>
                </>
            ) : (
                <>
                    <span className='self-center'>
                        <LoadedImage 
                            width={80} 
                            height={80} 
                            name={data?.name}
                            src={data?.sprites?.other['official-artwork'].front_default} />
                    </span>
                    <span className='flex flex-wrap items-center gap-1'>
                        {<h3 className={`font-[700] text-sm
                        ${data && types[data.types[0].type.name].textColor}`}>
                            {data?.id}
                        </h3>}
                        <h1 
                            className={`flex-1 capitalize text-sm truncate
                            cursor-pointer text-right ${data && 
                            types[data.types[0].type.name].textColor}`}
                            onClick={() => handleClick(id)}
                        >
                            {data?.name?.replace(/\-[a-z]{3,}$/g, '')}
                        </h1>
                    </span>
                </>
            )}
        </div>
    )
}

export default PokemonCard