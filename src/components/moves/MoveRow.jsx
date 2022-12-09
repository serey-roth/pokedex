import React from 'react'

import { types } from '../../assets';

import { setSelectMove } from '../../redux/features/pokemonSlice';
import { setMoveModal } from '../../redux/features/uiSlice';

import PokemonType from '../PokemonType';
import { useMove } from '../../features/hooks';
import { usePokemonContext } from '../../features/pokemonContext';

const MoveRow = ({ level, name }) => {
    const { type } = usePokemonContext();
    const { data, isFetching, error } = useMove(name)

    const handleClick = () => {
    }

    return (
        <tr className={`${type && types[type].hoverColor} hover:text-white
        transition-colors cursor-pointer`} 
        onClick={handleClick}>
            <td>{level || '-'}</td>
            <td className='capitalize'>{data ? name.replace(/\-/g, ' ') : '-'}</td>
            <td className='capitalize flex item-center justify-center'>
                {data ? (<PokemonType size='w-[20px] h-[20px]'
                type={data?.type?.name}/>) : '-'}
            </td>
            <td className='capitalize'>{data?.damage_class?.name || '-'}</td>
            <td>{data?.power || '-'}</td>
            <td>{data?.pp || '-'}</td>
            <td>{data?.accuracy || '-'}</td>
            <td>{data?.priority || '-'}</td>
            <td className='uppercase'>{data?.generation?.name.replace(/generation\-/g, ' ') || '-'}</td>
        </tr>
    )
}

export default MoveRow