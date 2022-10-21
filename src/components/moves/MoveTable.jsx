import React, { useState } from 'react'

import MoveRow from './MoveRow';

import { types } from '../../assets'
import { useSelector } from 'react-redux';
import { ImSpinner } from 'react-icons/im';

//get all the moves based on the learned method and the chosen 
//version of the game
const getMove = (move, versions, learnedMethod, version) => {
    const idx = versions.findIndex(vObj => 
        vObj.version_group.name === version);
    //if there are moves that exist in the given version,
    //check for the moves with the given learned method
    if (idx !== -1 && 
    versions[idx].move_learn_method.name === learnedMethod) {
        return {
            level: versions[idx].level_learned_at,
            name: move.name,
        }
    }
    return null;
}

//sort the moves based on the learned method 
const sortMoves = (learnedMethod, moves) => {
    switch(learnedMethod) {
        case 'level-up': {
            moves.sort((a, b) => a.level < b.level ? -1 : 
            (a.level == b.level ? 0 : 1));
            break;
        }
        default: {
            moves.sort((a, b) => a.name < b.name ? -1 : 
            (a.name == b.name ? 0 : 1));
            break;
        }
    }
}

const MoveTable = ({learnedMethod, moveData, existing}) => {
    const { type, version } = useSelector(state => state.pokemon);

    let moves;

    if (existing) {
        moves = moveData?.map(({move, version_group_details: versions}) =>
        getMove(move, versions, learnedMethod, version))
        .filter(move => move !== null);
    }

    if (moves) {
        sortMoves(learnedMethod, moves);
    } 

    return (
        <>
            <div className={`w-full h-[300px] border-2 border-slate-300/50
            ${type && types[type].backgroundColor} relative
            overflow-auto flex flex-col items-center`}>
                {existing ? (
                <>
                <table className='w-full max-h-full mix-blend-luminosity
                text-center rounded-lg border-collapse'>
                    <thead className={`${type && types[type].backgroundColor}
                    text-white border-b-2 border-slate-300/50`}>
                        <tr>
                            <th>
                            {learnedMethod === 'level-up' ? 'Level' : '-'}
                            </th>
                            <th>Move</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Power</th>
                            <th>PP</th>
                            <th>Accuracy</th>
                            <th>Priority</th>
                            <th>Generation</th>
                        </tr>
                    </thead>
                    <tbody>
                    {moves?.length !== 0 && moves?.map(move => (
                        <MoveRow 
                        key={move.level + '-' + move.name}
                        level={move.level} 
                        name={move.name}  />
                    ))}
                    </tbody>
                </table>
                {moves?.length === 0 && (<p className='flex items-center
                justify-center flex-1 text-white'>
                    This pokemon cannot learn this kind of moves.
                </p>)}
                </>
                ) : (
                <p className='font-semibold absolute top-1/2 -translate-y-1/2
                text-white'>
                    This pokemon does not exist in this version.
                </p>
                )}
            </div>
        </>
    )
}

export default MoveTable