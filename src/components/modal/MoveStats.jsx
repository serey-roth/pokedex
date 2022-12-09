import React from 'react'

import { types } from '../../assets';
import { usePokemonContext } from '../../features/pokemonContext';

const MoveStats = ({power, pp, accuracy, priority, type, contest, damage}) => { 
    const { type } = usePokemonContext();

    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='w-full flex items-center justify-center
            flex-wrap gap-3'>
                {type && <p className={`p-2 rounded-lg text-white
                capitalize ${type && `${types[type].backgroundColor} text-white`}`}>
                    {type}
                </p>}
                {damage && <p className={`p-2 rounded-lg text-white
                capitalize ${type && `${types[type].backgroundColor} text-white`}`}>
                    {damage}
                </p>}
                {contest && <p className={`p-2 rounded-lg text-white
                capitalize ${type && `${types[type].backgroundColor} text-white`}`}>
                    {contest}
                </p>}
            </div>
            <div className='w-full flex items-center justify-center
            flex-wrap gap-5'>
                <span className='flex flex-col items-center'>
                    <p className={`${type && types[type].textColor} 
                    font-bold`}>{power || 'N/A'}</p>
                    <p>Power</p>
                </span>
                <span className='flex flex-col items-center'>
                    <p className={`${type && types[type].textColor} 
                    font-bold`}>{accuracy || 'N/A'}</p>
                    <p>Accuracy</p>
                </span>
                <span className='flex flex-col items-center'>
                    <p className={`${type && types[type].textColor} 
                    font-bold`}>{pp || 'N/A'}</p>
                    <p>PP</p>
                </span>
                <span className='flex flex-col items-center'>
                    <p className={`${type && types[type].textColor} 
                    font-bold`}>{priority || 'N/A'}</p>
                    <p>Priority</p>
                </span>
            </div>
        </div>
    )
}

export default MoveStats