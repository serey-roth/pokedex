import React from 'react'

import { types } from '../../assets';

import Evolution from './Evolution';
import { useEvolutions } from '../../features/hooks';
import { usePokemonContext } from '../../features/pokemonContext';

const EvolutionChain = ({ species }) => {
    const { type } = usePokemonContext();
    const { 
        data: evolutions, 
        isFetching,
        isLoading,
        isError,
        error
    } = useEvolutions(species.evolution_chain?.url?.match(/\/(\d+)\//g)[0]
    .replace(/\//g, ''));

    const chain = getEvolutionChain(evolutions);

    const children = chain?.map((link, index) => (
        <div key={`link-${index}`}
        className='flex flex-row lg:flex-col overflow-auto py-2'>
            {link.map(item => (
                <Evolution key={item.name} evolution={item} />
            ))}
        </div>
    ))

    return (
        <div className='flex flex-col w-full lg:items-center gap-5'>
            <h1 className={`font-bold text-xl uppercase w-fit self-center
            rounded-lg p-2 ${type && `${types[type].backgroundColor} text-white`}`}>
                Evolution Chain
            </h1> 
            {(isLoading || isFetching) ? (<p>Loading...</p>)
            : (isError && error) ? (<p>Error occured when fetching data!</p>)
            : chain?.length === 1 ? (
                <p className='w-full text-center
                font-semibold text-lg'>This pokemon does not evolve.</p>
            ) : (
                <div className='flex flex-1 lg:flex-row lg:flex-wrap
                flex-col w-full gap-5 justify-center items-center'>
                {children}
                </div>
            )}
        </div>
    )
}

//get the evolution chain of a pokemon
//the evolution chain behaves like a multi-child tree so we use a queues to retrieve
//all the pokemons in the chain
//start by checking the chain object for the first pokemon in the chain
//if the evolves_to property is a non-empty array, then there is a next evolution
//repeat the process for the next evolution
const getEvolutionChain = (data) => {
    if (!data) return null;
    const evolutions = [];
    const queue = [];
    queue.push(data.chain);
    while (queue.length > 0) {
        const evolution = queue.shift();
        let children = 0;
        //if there is a next evolution, add to the queue
        for (let item of evolution.evolves_to) {
            queue.push(item);
            children++;
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
            id: evolution.species.url.match(/\/(\d+)\//g)[0]
            .replace(/\//g, ''),
            details,
            children,
        })
    }
    //separate the chain based on evolution stage
    const stages = [];
    stages.push([evolutions[0]]);
    if (evolutions.length > 1) {
        stages.push(evolutions.slice(1, evolutions[0].children + 1),
        evolutions.slice(evolutions[0].children + 1));
    }
    return stages;
}

export default EvolutionChain