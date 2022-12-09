import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { types } from '../assets';

import { setSelectGeneration, setVersion } from '../redux/features/pokemonSlice';

const versions = {
    'red/blue': 'red-blue',
    'yellow': 'yellow' ,
    'gold/silver': 'gold-silver' ,
    'crystal': 'crystal' ,
    'ruby/sapphire': 'ruby-sapphire' ,
    'emerald': 'emerald' ,
    'fire-red/leaf-green': 'firered-leafgreen' ,
    'diamond/pearl': 'diamond-pearl' ,
    'platinum': 'platinum' ,
    'heart-gold/soul-silver': 'heartgold-soulsilver' ,
    'black/white': 'black-white' ,
    'black-2/white-2': 'black-2-white-2' ,
    'x/y': 'x-y' ,
    'omega-ruby/alpha-sapphire': 'omega-ruby-alpha-sapphire' ,
    'sun/moon': 'sun-moon' ,
    'ultra-sun/ultra-moon': 'ultra-sun-ultra-moon' ,
    'lets-go-pikachu/lets-go-eevee': 'lets-go-pikachu-lets-go-eevee' ,
    'sword/shield': 'sword-shield',
}

const GameVersions = ({ version, onChange }) => {
    return (
        <select className={`rounded-lg p-2 uppercase bg-white bg-opacity-80
        font-bold outline-none border-2`}
        value={version}
        onChange={onChange}>
        {Object.keys(versions).map(gameVersion => (
            <option key={`version-${gameVersion}`}
            value={versions[gameVersion]} className='text-center'>
                {gameVersion.replace(/\-/g, ' ')}
            </option>
        ))}
        </select>
    )
}

export default GameVersions