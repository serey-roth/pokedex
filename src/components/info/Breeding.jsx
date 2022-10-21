import React from 'react'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Breeding = () => {
    const { base, species } = useSelector(state => state.pokemon);

    return (
        <div className='flex flex-col flex-wrap gap-2'>
            <h2 className='font-semibold text-lg w-full text-center'>Breeding</h2>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Egg Groups</p>
                <p className='capitalize'>
                {species?.egg_groups?.map(group => group.name + ' ')}
                </p>
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Gender Distribution</p>
                {species?.gender_rate && species?.gender_rate === -1 && (
                    <p>'Gender Unknown'</p>
                )}
                {species?.gender_rate && species?.gender_rate > -1 && (
                    <p className='flex items-center gap-1'>
                        {species?.gender_rate / 8} <BsGenderFemale className='font-bold'/>
                    </p>
                )}
                {species?.gender_rate && species?.gender_rate > -1 && (
                    <p className='flex items-center gap-1'>
                        {(8- species?.gender_rate) / 8} <BsGenderMale className='font-bold'/>
                    </p>
                )}
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Egg Cycles</p>
                <p className='flex-1'>
                {species?.hatch_counter}
                </p>
            </span>
            <h2 className='font-semibold text-lg w-full text-center'>Forms</h2>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[100px]'>Alternative Forms</p>
                <p className='capitalize'>
                {base?.forms?.length > 1 ? 'Yes': 'No'}
                </p>
            </span>
        </div>   
    )
}

export default Breeding