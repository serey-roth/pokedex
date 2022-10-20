import React from 'react'
import { useSelector } from 'react-redux'
import { useGetTypingsQuery } from '../redux/services/pokemonApi'
import PokemonType from './PokemonType'

import { types } from '../assets';

const Relation = ({mainType, effect, relation}) => (
    <div className='flex flex-col gap-1'>
        <p className='w-full font-semibold text-md
        text-center'>{effect}</p>
        <div className='flex h-[50px] gap-1 w-full items-center
        justify-center'>
            {relation.length > 0 ? relation.map(type => (
                <PokemonType key={`${mainType}-${effect}-${type.name}`}
                type={type.name} size='w-[40px] h-[40px]'/>
            )) : (<p className='w-full text-center my-1'>None</p>)}
        </div>
    </div>
)

const DamageRelations = ({ type }) => {
    const { data } = useGetTypingsQuery(type);

    return (
        <>
        {data?.damage_relations && (
            <div className='flex flex-col border border-slate-400/50
            rounded-lg px-3 py-2'>
                <p className={`font-bold text-md capitalize
                w-full text-center ${type && types[type].backgroundColor}
                text-white rounded-lg p-2 backdrop-blur-sm`}>{type}</p>

                <Relation 
                mainType={type} 
                effect='0x'
                relation={data?.damage_relations?.no_damage_from} />

                <Relation 
                mainType={type} 
                effect='0.5x'
                relation={data?.damage_relations?.half_damage_from} />

                <Relation 
                mainType={type} 
                effect='2x' 
                relation={data?.damage_relations?.double_damage_from} />
            </div>
        )}
        </>
    )
}

const Typing = () => {
    const base = useSelector(state => state.pokemon.base);

    return (
        <div className='w-full flex flex-col items-center justify-center gap-1'>
            <h2 className='font-semibold text-lg w-full text-center'>Type Defenses</h2>
            <p className='max-w-full flex flex-wrap text-center'>
                *effectiveness of types on this pokemon based on types
                </p>
            <div className='flex lg:flex-row flex-col gap-3 flex-wrap'>  
            {base?.types?.map(typeObj => (
                <DamageRelations key={typeObj.type?.name} 
                type={typeObj.type?.name} />
            ))}
            </div>
        </div>
    )
}

export default Typing