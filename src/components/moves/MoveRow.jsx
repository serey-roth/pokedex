import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useGetPokemonMoveQuery } from '../../redux/services/pokemonApi'
import { types } from '../../assets';

import { setMoveModal, setSelectMove } from '../../redux/features/pokemonSlice';

import PokemonType from '../PokemonType';
import { ImSpinner } from 'react-icons/im';

const MoveRow = ({ level, name, setIsFetching}) => {
    const dispatch = useDispatch();
    const type = useSelector(state => state.pokemon.type);
    const { data, isFetching, error } = useGetPokemonMoveQuery(name);

    const handleClick = () => {
        dispatch(setSelectMove(name));
        dispatch(setMoveModal(true))
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