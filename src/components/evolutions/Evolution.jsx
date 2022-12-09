import React from 'react'

import PokemonType from '../PokemonType';

import { types } from '../../assets';
import { useNavigate } from 'react-router-dom';
import EvolutionArrow from './EvolutionArrow';
import { usePokemon } from '../../features/hooks';
import LoadedImage from '../LoadedImage';

const Evolution = ({ evolution }) => {
    const navigate = useNavigate();
    const { id, name, details } = evolution;
    const { data } = usePokemon(id, ['pokemon', 'evolution']);

    return (
        <div className='flex lg:flex-row flex-col items-center justify-center'>
            {details && (
                <EvolutionArrow details={details} />
            )}
            <div className='flex flex-col items-center justify-center gap-2'>
                <LoadedImage 
                height={200}
                src={data?.sprites?.other['official-artwork'].front_default} />
                <div className='flex flex-col items-center gap-1'>
                    <p>#{data?.id}</p>
                    <p className={`font-semibold capitalize cursor-pointer
                    text-white rounded-lg p-2`}
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
        </div>
    )
}

export default Evolution