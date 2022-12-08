import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImSpinner } from 'react-icons/im'

import { types } from '../assets';
import PokemonPlaceHolder from './PokemonPlaceHolder';
import PokemonType from './PokemonType';
import ImagePlaceHolder from './ImagePlaceHolder';

import { usePokemon } from '../features/hooks';

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
            <React.Suspense 
            fallback={
                <div className='sm:w-[200px] flex flex-col self-center 
                h-[300px] sm:h-[180px]'>
                    <ImagePlaceHolder />
                </div>
            }>
                <div className='sm:w-[200px] flex flex-col self-center 
                h-[300px] sm:h-[180px] sm:scale-[80%]'>
                    <PokemonImage 
                    src={data?.sprites?.other['official-artwork'].front_default} />
                </div>
             </React.Suspense>
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