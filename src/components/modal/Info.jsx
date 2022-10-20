import React from 'react'
import { useSelector } from 'react-redux';

import { types } from '../../assets';

const Info = ({description, effect, shortEffect}) => {
    const type = useSelector(state => state.pokemon.type);

    const textArray = effect?.split('\n\n');

    return (
        <div className='w-full flex flex-col items-center
        justify-center flex-1 gap-2'>
            <p className={`uppercase py-1 px-2 rounded-lg
            ${type && types[type].backgroundColor} text-white`}>
                Flavor Text
            </p>
            <p className='text-center w-full'>{description || 'No flavor text in this game version.'}</p>
            <p className={`uppercase py-1 px-2 rounded-lg
            ${type && types[type].backgroundColor} text-white`}>Effect (Brief)</p>
            <p className='text-center w-full'>{shortEffect}</p>
            <p className={`uppercase py-1 px-2 rounded-lg
            ${type && types[type].backgroundColor} text-white`}>In-depth Effect</p>
            <p className='text-center
            w-full'>{textArray?.map(item => (
                <>
                    {item?.split('\n')?.map(i => (
                        <>
                            {i}
                            <br />
                        </>
                    ))} 
                    <br />
                </>
            ))}</p>
        </div>
    )
}

export default Info