import React from 'react'

import ImagePlaceHolder from './ImagePlaceHolder'
import { PlaceHolder as TypePlaceHolder } from './PokemonType'

const PokemonPlaceHolder = ({ children }) => {
    return (
    <div className='flex flex-col justify-center
    p-4 rounded-lg border-2 relative gap-2
    backdrop-blur-sm h-[500px] sm:h-auto'>
        <h3 className='font-[900] text-[2em] italic 
        text-slate-400 absolute top-1'>
            ID
        </h3>
        {<div className='w-[200px] flex flex-col self-center 
        h-[200px] bg-transparent'>
            <ImagePlaceHolder />
        </div>}
        <div className='flex items-center w-full'>
            <h1 className='flex-1 capitalize font-bold text-2xl
            bg-clip-text text-transparent 
            bg-gradient-to-r from-rose-500 to-indigo-500'>
                Name
            </h1>
            <div className='flex items-center gap-1'>
                <TypePlaceHolder />
                <TypePlaceHolder />
            </div>
        </div>
        <span className='flex items-center justify-center
        absolute inset-0'>
            {children}
        </span>
    </div>
    )
}

export default PokemonPlaceHolder
