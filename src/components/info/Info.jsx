import React from 'react'

import { usePokemonContext } from '../../features/pokemonContext'

import { types } from '../../assets'

import BaseInfo from './BaseInfo'
import Breeding from './Breeding'
import Training from './Training'

const Info = ({ base, species }) => {
    const { type } = usePokemonContext();

    return (
        <div className='flex flex-col
        items-center justify-center w-full'>
            <h1 className={`font-bold text-xl uppercase
            rounded-lg p-2
            ${type && `${types[type].backgroundColor} text-white`}`}>
                Pokemon Data
            </h1> 
            <div className='flex flex-col lg:grid grid-cols-3
            items-center lg:items-start lg:w-[80%]
            w-full py-5 gap-7'>
            <BaseInfo base={base} species={species} />
            <Training base={base} species={species}/>
            <Breeding species={species}/>
            </div>
        </div>
    )
}

export default Info