import React from 'react'
import { useSelector } from 'react-redux'

const Training = () => {
    const { base, species } = useSelector(state => state.pokemon);

    return (
        <div className='flex flex-col flex-wrap gap-2'>
            <h2 className='font-semibold text-lg w-full text-center'>Training</h2>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>EV. Yield</p>
                <span className='flex gap-1 items-center'>
                {base?.stats?.filter(stat => stat.effort > 0).map(item => (
                    <p key={item.stat.name} className='capitalize'>
                    {item.effort} <b>{item.stat.name.replace(/\-/g, ' ')}</b></p>
                ))}
                </span>
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Catch Rate</p>
                <p className='flex-1'>
                {species?.capture_rate} / 255 &nbsp;
                {species?.capture_rate && `(${(species.capture_rate / 255 * 100).toFixed(2)}%)`}
                </p>
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Base Happiness</p>
                <p className='flex-1'>
                {species?.base_happiness} / 255 &nbsp;
                {species?.base_happiness && `(${(species.base_happiness / 255 * 100).toFixed(2)}%)`}
                </p>
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Base Experience</p>
                <p className='flex-1'>
                {base?.base_experience}
                </p>
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Growth Rate</p>
                <p className='flex-1 capitalize'>
                {species?.growth_rate?.name.replace(/\-/g, ' ')}
                </p>
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Held Items</p>
                <span className='flex gap-1 items-center'>
                {base?.held_items?.length === 0 ? (<p>None</p>) :
                base?.held_items?.map(held_item => (
                    <p key={held_item.item.name} className='capitalize'>
                    {held_item?.item?.name?.replace(/\-/g, ' ')}</p>
                ))}
                </span>
            </span>
        </div>
    )
}

export default Training