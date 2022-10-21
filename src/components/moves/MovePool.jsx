import React, { useState } from 'react'

import { types } from '../../assets'
import { useSelector } from 'react-redux';

import MoveTable from './MoveTable'

const learnedMethods = {
    'level up': 'level-up',
    'tm/hm': 'machine',
    'egg': 'egg',
    'tutor': 'tutor',

}
const MovePool = () => {
    const {generation, selectGeneration, type} = useSelector(state => state.pokemon);
    const [method, setMethod] = useState('level up');
    const data = useSelector(state => state.pokemon.base?.moves);

    //check if the pokemon exists in the generation of the game that the user selects
    const existing = generation <= selectGeneration;

    return (
        <div className='flex flex-col gap-3 w-full items-center
        py-5'>
            <h1 className={`font-bold text-xl uppercase
            ${type && types[type].backgroundColor} text-white
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
                    type && types[type].backgroundColor} transition-colors`}
                    onClick={(e) => setMethod(e.target.innerText.toLowerCase())}
                    >
                        {learned}
                    </button>
                ))}
            </div>
            <MoveTable type={type} learnedMethod={learnedMethods[method]}
            moveData={data} existing={existing} />
        </div>
    )
}

export default MovePool