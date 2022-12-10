import React from 'react'

import { usePokemonContext } from '../../features/pokemonContext'

import { types } from '../../assets'

import BaseInfo from './BaseInfo'
import Breeding from './Breeding'
import Training from './Training'
import Typing from '../Typing'

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
            <div className='flex flex-col md:grid grid-cols-2 lg:grid-cols-4
            items-center md:items-start w-full md:w-[95%] py-5 gap-7 place-items-center'>
                <BaseInfo base={base} species={species} />
                <Training base={base} species={species}/>
                <Breeding species={species}/>
                <Typing pokemonTypes={base?.types}/>
            </div>
        </div>
    )
}

export default Info