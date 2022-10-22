import React from 'react'

import { BsArrowDown, BsArrowRight } from 'react-icons/bs'

const EvolutionArrow = ({ details }) => {
    return (
    <div className='flex flex-col items-center
    w-[150px] h-[120px] lg:w-50px break-words'>
        {details && (<p className='font-[400] text-md text-center'>
            Level Up
        </p>)}
        <BsArrowRight className='lg:block hidden w-full text-3xl'/>
        <BsArrowDown className='block lg:hidden w-full text-3xl'/>
        {details?.min_level && (
            <p className='font-[400] capitalize  text-md text-center'>
                At {details.min_level} <br />
                {details.turn_upside_down && '(Turn Console Upside Down)'}
            </p>
        )}
        {details?.item && (
            <p className='font-[400] capitalize text-md text-center'>
                Use {details.item.name.replace(/\-/g, ' ')}
            </p>
        )}
        {details?.min_happiness && (
            <>
            <p className='font-[400] capitalize text-md text-center'>
                Happiness {details.min_happiness}+            
            </p>
            {details?.time_of_day && (<p className='font-[400] capitalize text-md text-center'>
                At {details.time_of_day}time
            </p>)}
            </>
        )}
        {details?.min_beauty && (
            <p className='font-[400] capitalize text-md text-center'>
            Beauty {details.min_beauty}+            
            </p>
        )}
        {details?.location && (
            <p className='font-[400] capitalize text-md text-center'>
                At {details.location.name.replace(/\-/g, ' ')}
            </p>
        )}
        {details?.known_move && (
            <p className='font-[400] capitalize text-md text-center'>
                Know {details.known_move.name.replace(/\-/g, ' ')}
            </p>
        )}
        {details?.known_move_type && details?.min_affection && (
            <>
            <p className='font-[400] capitalize text-md text-center'>
                Know {details.known_move_type.name.replace(/\-/g, ' ')} Move 
            </p>
            <p className='font-[400] capitalize text-md text-center'>
                Affection {details.min_affection}+
            </p>
            </>
        )}
        {(details?.trigger?.name === 'trade' || details?.trigger?.name === 'spin')
        && (
            <p className='font-[400] capitalize text-md text-center'>
               By {details?.trigger?.name === 'trade' ? 'Trading' : 'Spinning'}
            </p>
        )}
    </div>
  )
}

export default EvolutionArrow