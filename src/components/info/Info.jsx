import React from 'react'
import { useSelector } from 'react-redux'

import BaseInfo from './BaseInfo'
import Breeding from './Breeding'
import Training from './Training'

import { types } from '../../assets'

const Info = () => {
    const type = useSelector(state => state.pokemon.type);

    return (
        <div className='flex flex-col
        items-center justify-center w-full'>
            <h1 className={`font-bold text-xl uppercase
            ${type && types[type].backgroundColor} text-white
            rounded-lg p-2`}>
                Pokemon Data
            </h1> 
            <div className='flex flex-col lg:grid grid-cols-3
            items-center lg:items-start lg:w-[80%]
            w-full py-5 gap-7'>
            <BaseInfo />
            <Training />
            <Breeding />
            </div>
        </div>
    )
}

export default Info