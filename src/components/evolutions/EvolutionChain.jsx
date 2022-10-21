import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useGetPokemonEvolutionsQuery } from '../../redux/services/pokemonApi'

import { types } from '../../assets';

import Evolution from './Evolution';

const EvolutionChain = () => {
    const [id, setId] = useState(null);
    const [chain, setChain] = useState(null);
    const species = useSelector(state => state.pokemon.species);
    const type = useSelector(state => state.pokemon.type);

    const { 
        data: evolutions, 
    } = useGetPokemonEvolutionsQuery(id ? id : null);

    useEffect(() => {
        if (species) {
            //get the evolution id that is used for all pokemons in the chain
            //different from the id of the pokemon
            const eid = species.evolution_chain?.url?.match(/\/(\d+)\//g)[0]
            .replace(/\//g, '');
            setId(eid);
        }
    }, [species]);

    useEffect(() => {
        if (evolutions?.chain) {
            setChain(getEvolutionChain(evolutions));
        }
    }, [evolutions])

    return (
        <div className='flex flex-col w-full
        lg:items-center py-5 gap-5'>
            <h1 className={`font-bold text-xl uppercase w-fit self-center
            ${type && types[type].backgroundColor} text-white
            rounded-lg p-2`}>
                Evolution Chain
            </h1> 
            {chain?.length === 1 ? (
                <p className='w-full text-center
                font-semibold text-lg'>This pokemon does not evolve.</p>
            ) : (
                <div className='flex flex-1 lg:flex-row lg:flex-wrap
                flex-col w-full gap-5 justify-center items-center
                lg:h-[200px]'>
                    {renderEvolutionUI(chain)}
                </div>
            )}
           
        </div>
    )
}

//render the ui for the evolution chain
//note that one pokemon might have multiple 2nd evolutions, such as eevee
const renderEvolutionUI = (chain) => {
    let result = [];
    let index = 0;
    if (!chain) return null;
    while (index < chain.length) {
        let item = chain[index];
        if (item.children <= 1) {
            result.push(<Evolution key={item.name} name={item.name}
                details={item.details} />)
            index++;
        }
        else {
            let children = [];
            for (let i = 1; i <= item.children; i++) {
                const child = chain[index + i];
                children.push(<Evolution key={child.name} name={child.name}
                details={child.details} />)
                //separate the chain into groups with each group 
                //containing the parent and two children
                if (i % 2 === 0) {
                    const group = <div className='flex lg:flex-row flex-col gap-1 
                    items-center justify-center'>
                        <Evolution key={item.name} name={item.name}
                        details={item.details} />
                        <div className='flex lg:flex-col flex-row gap-2 
                        items-center justify-center'>{children}</div>
                    </div>
                    result.push(group)
                    children = [];
                }
            }
            //if there is a leftover, make a group with one parent and one child
            result.push(children.length === 1 && (
                <div className='flex lg:flex-col flex-row gap-2 
                items-center justify-center'>
                <Evolution key={item.name} name={item.name}
                details={item.details} />
                {children[0]}
                </div>))
            index = item.children + 1;
        }         
    }
    return result;
}

//get the evolution chain of a pokemon
//the evolution chain behaves like a multi-child tree so we use a queues to retrieve
//all the pokemons in the chain
//start by checking the chain object for the first pokemon in the chain
//if the evolves_to property is a non-empty array, then there is a next evolution
//repeat the process for the next evolution
const getEvolutionChain = (data) => {
    let chain = data.chain;
    const evolutions = [];
    const queue = [];
    queue.push(chain);
    while (queue.length > 0) {
        const evolution = queue.shift();
        let children = 0;
        //if there is a next evolution, add to the queue
        if (evolution.evolves_to.length > 0) {
            for (let item of evolution.evolves_to) {
                children += 1;
                queue.push(item);
            }
        }
        let details = {};
        //if there is an evolution, get the details for that evolution
        if (evolution.evolution_details.length > 0) {
            Object.entries(evolution.evolution_details[0]).map(([key, value]) => {
                if (value) {
                    details[key] = value;
                }
            })
        }
        if (Object.keys(details).length === 0) details = null;
        evolutions.push({
            name: evolution.species.name,
            id: data?.id,
            details,
            children,
        })
    }
    return evolutions;
}

export default EvolutionChain