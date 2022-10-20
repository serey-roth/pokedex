import React from 'react'
import { ImSpinner } from 'react-icons/im';

import { useGetPokemonQuery } from '../../redux/services/pokemonApi'

import ImagePlaceHolder from '../ImagePlaceHolder';
import PokemonType from '../PokemonType';

import { types } from '../../assets';
import { useNavigate } from 'react-router-dom';
import EvolutionArrow from './EvolutionArrow';

const PokemonImage = React.lazy(() => import('../PokemonImage'));

const Evolution = ({ name, details }) => {
    const navigate = useNavigate();
    const { data, isFetching } = useGetPokemonQuery(name);

    if (isFetching) 
    return (
        <div className='w-[150px] lg:w-50px flex relative flex-col
        items-center justify-center'>
            <ImagePlaceHolder>
                <ImSpinner className='absolute inset-0
                w-[50px] h-[50px] animate-spin' />
            </ImagePlaceHolder>
        </div>
    )

    return (
        <div className='flex lg:flex-row flex-col items-center justify-center'>
            {details && (
                <EvolutionArrow details={details} />
            )}
            <div className='flex flex-col items-center justify-center gap-2'>
                <React.Suspense fallback={<ImagePlaceHolder />}>
                    <div className='w-[150px] lg:w-50px'>
                        <PokemonImage
                        src={data?.sprites?.other['official-artwork'].front_default} />
                    </div>
                </React.Suspense>
                <div className='flex flex-col items-center gap-1'>
                    <p>#{data?.id}</p>
                    <p className={`font-semibold capitalize cursor-pointer
                    ${data && types[data.types[0].type.name].backgroundColor}
                    text-white rounded-lg p-2`}
                    onClick={() => navigate(`/pokemon/${data?.id}`)}>
                        {data?.name}
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