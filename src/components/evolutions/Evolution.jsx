import React from 'react'
import { useNavigate } from 'react-router-dom';

import PokemonType from '../PokemonType';

import { types } from '../../assets';
import EvolutionArrow from './EvolutionArrow';
import { usePokemon } from '../../features/hooks';
import LoadedImage from '../LoadedImage';

import { usePokemonContext } from '../../features/pokemonContext';

const Error = <div className='bg-rose-300 animate-pulse w-full sm:w-[200px] h-[300px] rounded-lg'></div>

const Evolution = ({ evolution }) => {
    const navigate = useNavigate();
    const { type } = usePokemonContext();
    const { id, name, details } = evolution;
    const {
        data,
        isFetching,
        isLoading,
        isError,
        error
    } = usePokemon(id, ['pokemon', 'evolution']);

    const Loading = <div className={`${type && types[type].backgroundColor} 
    animate-pulse w-full sm:w-[200px] h-[300px] rounded-lg`}></div>

    return (
        <div className='flex lg:flex-row flex-col items-center justify-center'>
            {(isLoading || isFetching) ? Loading
                : (isError && error) ? Error
                    : (
                        <>
                            {details && (
                                <EvolutionArrow details={details} />
                            )}
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <LoadedImage
                                    height={150}
                                    src={data?.sprites?.other['official-artwork'].front_default} />
                                <div className='flex flex-col items-center gap-1'>
                                    <p>#{data?.id}</p>
                                    <p className='font-semibold capitalize cursor-pointer rounded-lg p-2'
                                        onClick={() => navigate(`/pokemon/${data?.id}`)}>
                                        {name}
                                    </p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    {data?.types.map((typeObj) => (
                                        <PokemonType size='w-[35px] h-[35px]' key={typeObj.type.name}
                                            type={typeObj.type.name} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
        </div>
    )
}

export default Evolution