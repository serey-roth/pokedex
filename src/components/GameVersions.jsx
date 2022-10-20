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

const GameVersions = () => {
    const dispatch = useDispatch();
    const type = useSelector(state => state.pokemon.type);
    const gameVersion = useSelector(state => state.pokemon.version);
    
    const setGameVersion = (e) => {
        dispatch(setVersion(e.target.value));
        dispatch(setSelectGeneration(generations[e.target.value]))
    }

    return (
        <select className={`rounded-lg p-2 uppercase bg-white bg-opacity-80
        font-bold ${type && types[type].textColor}
        outline-none border-2`}
        value={gameVersion}
        onChange={setGameVersion}>
        {Object.keys(versions).map(version => (
            <option key={`version-${version}`}
            value={versions[version]} className='text-center'>
                {version.replace(/\-/g, ' ')}
            </option>
        ))}
        </select>
    )
}

export default GameVersions