import React from 'react'

const PokemonImage = ({ src }) => {
    return (
        <img src={src} 
        alt='pokemon-image'
        className='flex-1 max-w-full
        max-h-full object-contain rounded-lg'
        />
    )
}

export default PokemonImage