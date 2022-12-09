import React from 'react'

import { types } from '../../assets'

import { usePokemonContext } from '../../features/pokemonContext';

const StatsProgress = ({ label, proportion, value }) => {
    const { type } = usePokemonContext();
    
    return (
        <div className='flex flex-row gap-1 flex-1 items-center'>
            <p className='text-center font-semibold w-[70px]'>{label}</p>
            <div className='flex-1 rounded-[50px] bg-slate-300/50 mr-2'>
                <div style={{
                    width: `${proportion ? proportion: 0}%`,
                    transition: 'width 1s ease-in-out',
                }} 
                className={`w-1/2 h-full rounded-[50px]
                text-right py-1 ${type && 
                types[type].backgroundColor}`}>
                    <span className='mr-2 font-bold text-white'>
                        {value}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default StatsProgress