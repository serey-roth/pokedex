import React, { useState } from 'react'

import { types } from '../../assets'

import MoveTable from './MoveTable'
import { usePokemonContext } from '../../features/pokemonContext';

const learnedMethods = {
    'level up': 'level-up',
    'tm/hm': 'machine',
    'egg': 'egg',
    'tutor': 'tutor',

}

const generations = {
    'red-blue': 1,
    'yellow': 1 ,
    'gold-silver': 2 ,
    'crystal': 2 ,
    'ruby-sapphire': 3 ,
    'emerald': 3 ,
    'firered-leafgreen': 3 ,
    'diamond-pearl': 4 ,
    'platinum': 4 ,
    'heartgold-soulsilver': 4 ,
    'black-white': 5 ,
    'black-2-white-2': 5 ,
    'x-y': 6 ,
    'omega-ruby-alpha-sapphire': 6 ,
    'sun-moon': 7 ,
    'ultra-sun-ultra-moon': 7 ,
    'lets-go-pikachu-lets-go-eevee': 7 ,
    'sword-shield': 8,
}

const MovePool = ({ moves, pokemonGeneration }) => {
    const { type, selections } = usePokemonContext();
    const [method, setMethod] = useState('level up');
    //check if the pokemon exists in the generation of the game that the user selects
    const existing = pokemonGeneration <= generations(selections.version);

    return (
        <div className='flex flex-col gap-3 w-full items-center
        py-5'>
            <h1 className={`font-bold text-xl uppercase
            ${type && `${types[type].backgroundColor} text-white`}
            rounded-lg p-2`}>
                Move Pool
            </h1> 
            <div className='w-full flex flex-wrap gap-1 justify-evenly'>
                {Object.keys(learnedMethods).map(learned => (
                    <button key={learned}
                    className={`rounded-lg p-2 uppercase
                    font-bold ${type && types[type].hoverColor}
                    transition-colors 
                    ${!existing && 'pointer-events-none'} 
                    ${learned === method && 
                    type && types[type].backgroundColor}`}
                    onClick={(e) => setMethod(e.target.innerText.toLowerCase())}
                    >
                        {learned}
                    </button>
                ))}
            </div>
            <MoveTable type={type} learnedMethod={learnedMethods[method]}
            moveData={moves} existing={existing} version={version} />
        </div>
    )
}

export default MovePool