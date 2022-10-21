import React from 'react'

import { types } from '../../assets';
import { useSelector, useDispatch } from 'react-redux';
import { setAbilityModal, setSelectAbility } from '../../redux/features/pokemonSlice';

const convertToFootInch = (heightMeter) => {
    return `(${Math.floor(heightMeter * 3.281)}''${Math.floor((heightMeter * 3.281 % 1) * 12)}')`;
}

const getImgUrl = (icon) => {
    return new URL(`../../assets/icons/${icon}`, 
        import.meta.url).href;
}

const BaseInfo = () => {
    const dispatch = useDispatch();
    const { type, base } = useSelector(state => state.pokemon);
    
    const handleClick = (name) => {
        dispatch(setAbilityModal(true));
        dispatch(setSelectAbility(name))
    }

    return (
        <div className='flex flex-col flex-wrap gap-2'>
            <h2 className='font-semibold text-lg w-full text-center'>
            Base Information
            </h2>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[70px]'>No.</p>
                <p className='flex-1'>{base?.id}</p>
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[70px]'>Height</p>
                <p className='flex-1'>
                {base?.height && base.height * 100}m &nbsp;
                {base?.height && convertToFootInch(base.height)}
                </p>
            </span>
            <span className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[70px]'>Weight</p>
                <p className='flex-1'>
                {base?.weight && (base.weight / 10)}kg &nbsp;
                {base?.weight && `(${(base.weight / 10 * 2.20462).toFixed(2)}lbs)`}
                </p>
            </span>
            <div className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[70px]'>Abilities</p>
                <span className='flex flex-wrap gap-2 flex-1'> 
                {base && base.abilities?.map(({is_hidden, ability}) => (
                    <p key={ability.name}
                    className={`capitalize rounded-md py-1 px-2 text-center
                    ${type && types[type].backgroundColor} cursor-pointer
                    ${is_hidden ? 
                    'bg-opacity-50 font-thin' : 'bg-opacity-100 font-semibold'}
                    text-white`}
                    onClick={() => handleClick(ability.name)}>
                        {ability.name.replace(/\-/g, ' ')}
                    </p>
                ))}
                </span>
            </div>
            <div className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[70px]'>Types</p>
                <span className='flex flex-wrap gap-2 flex-1'>
                {base && base.types?.map(({type}) => (
                    <div key={type.name} 
                    className={`h-[40px] p-2 rounded-lg
                    text-white flex gap-2 items-center
                    justify-center
                    ${types[type.name].backgroundColor}`}>
                        <p className='capitalize font-semibold'>{type.name}</p>
                        <img src={getImgUrl(types[type.name].icon)} 
                        alt='pokemon-type' 
                        className='max-h-full scale-70 bg-inherit' />
                    </div>
                ))}
                </span>
            </div>
            <div className='flex gap-2 items-center'>
                <p className='text-center font-semibold text-black
                w-[70px]'>Forms</p>
                <span className='flex flex-wrap gap-2 flex-1'>
                {base && base.forms?.map(form => (
                    <p key={form.name} 
                    className={`capitalize font-semibold text-center
                    rounded-md py-1 px-2 text-white 
                    ${type && types[type].backgroundColor} `}>
                        {form.name}
                    </p>
                ))}
                </span>
            </div>
        </div>
    )
}

export default BaseInfo