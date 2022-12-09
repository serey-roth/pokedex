import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImSpinner } from 'react-icons/im'

import { types } from '../assets';
import PokemonPlaceHolder from './PokemonPlaceHolder';
import PokemonType from './PokemonType';
import ImagePlaceHolder from './ImagePlaceHolder';

import { usePokemon } from '../features/hooks';
import LoadedImage from './LoadedImage';

//for lazy loading image
const PokemonImage = React.lazy(() => import('./PokemonImage'))

const PokemonCard = ({ query }) => {
    const navigate = useNavigate();

    const { 
        data,
        isFetching,
        isLoading,
        error,
        isError
    } = usePokemon(query);

    const handleClick = (pokemon) => {
        if (pokemon) {
            navigate(`/pokemon/${pokemon}`);
        }
    }

    if (isLoading && isFetching) 
    return (
        <PokemonPlaceHolder>
            <ImSpinner className='w-[50px] h-[50px] animate-spin' />
        </PokemonPlaceHolder>
    )

    if (isError && error) 
    return (
        <PokemonPlaceHolder>
            Error!
        </PokemonPlaceHolder>
    )

    if (!data?.is_default) return null;

    return (
        <div className={`flex flex-col justify-center sm:w-fit w-full
        h-fit p-2 border-2 relative backdrop-blur-sm
        `}>
            <h3 className={`font-[900] text-[2em] italic 
            ${data && types[data.types[0].type.name].textColor}
            absolute top-1`}>
                {data?.id}
            </h3>

            <LoadedImage 
                width={100} 
                height={100} 
                name={data?.name}
                src={data?.sprites?.other['official-artwork'].front_default} />
    
            <h1 className={`text-center flex-1 capitalize font-bold text-xl
            cursor-pointer hover:text-black transition-colors
            ${data && types[data.types[0].type.name].textColor}`}
            onClick={() => handleClick(data?.name)}>
                {data?.name?.replace(/\-[a-z]{3,}$/g, '')}
            </h1>
            <div className='flex flex-col items-center gap-1 absolute
            top-2 right-2'>
            {data?.types.map((typeObj) => (
                <PokemonType key={typeObj.type.name}
                size='w-[40px] h-[40px]'
                type={typeObj.type.name} />
            ))}
            </div> 
        </div>
    )
}

export default PokemonCard