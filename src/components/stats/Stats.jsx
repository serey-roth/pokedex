import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { types } from '../../assets';
import StatsProgress from './StatsProgress';

const calculateHP = (base, iv, ev, level) => {
    return Math.floor((2 * base + iv + Math.floor(ev / 4)) 
    * level / 100) + level + 10;
}

const calculateOtherStat = (base, iv, ev, level, nature) => {
    return Math.floor((Math.floor((2 * base + iv + Math.floor(ev / 4)) 
    * level / 100) + 5) * nature);
}

const StatMode = ({ mode, active, setMode }) => {
    const type = useSelector(state => state.pokemon.type);

    return (
        <button 
        className={`capitalize font-bold w-1/2
        ${active && `${type && types[type].backgroundColor}
        text-white`}
        rounded-xl p-2 ${type && types[type].textColor}
        hover:text-white ${type && types[type].hoverColor}
        transition duration-300 ease-in-out`} 
        onClick={setMode}>{mode}</button>
    )
}

const Stats = () => {
    const [mode, setMode] = useState('base');
    const [stats, setStats] = useState(null);
    const [proportions, setProportions] = useState(null);
    const [level, setLevel] = useState(1);
    
    const { type, base: data } = useSelector(state => state.pokemon);

    useEffect(() => {
        let statsData;
        let proportionData;
        if (data) {
            switch (mode) {
                case 'min': {
                    statsData = data.stats.map((stat, idx) => 
                    idx === 0 ? calculateHP(stat.base_stat, 0, 0, level)
                    : calculateOtherStat(stat.base_stat, 0, 0, level, 0.9))
                    break;
                }
                case 'max' : {
                    statsData = data.stats.map((stat, idx) => 
                    idx === 0 ? calculateHP(stat.base_stat, 31, 252, level)
                    : calculateOtherStat(stat.base_stat, 31, 252, level, 1.1))
                    break;
                } 
                default : {
                    statsData = data.stats.map(stat => stat.base_stat);
                }
            }
            const maxStat = Math.max(...statsData);
            proportionData = {
                hp: Math.floor(statsData[0] / maxStat * 100),
                atk: Math.floor(statsData[1] / maxStat * 100),
                def: Math.floor(statsData[2] / maxStat * 100),
                sp_atk: Math.floor(statsData[3] / maxStat * 100),
                sp_def: Math.floor(statsData[4] / maxStat * 100),
                spd: Math.floor(statsData[5] / maxStat * 100),
            }
        }
        setStats(statsData);
        setProportions(proportionData);
    }, [level, mode, data]);

    return (
        <div className='flex flex-col flex-1 w-full py-5 gap-3 items-center'>
            <h1 className={`font-bold text-xl uppercase
            ${type && types[type].backgroundColor} text-white
            rounded-lg p-2`}>
                Pokemon Stats
            </h1> 
            <div className='flex gap-3 items-center justify-evenly'>
                <StatMode 
                    mode='base'
                    active={mode === 'base'}
                    setMode={(e) => setMode(e.target.innerText.toLowerCase())} />
                <StatMode 
                    mode='min' 
                    active={mode === 'min'}
                    setMode={(e) => {
                        console.log(e.target.innerText)
                        setMode(e.target.innerText.toLowerCase())
                    }} />
                <StatMode 
                    mode='max' 
                    active={mode === 'max'}
                    setMode={(e) => setMode(e.target.innerText.toLowerCase())} />
            </div>
            <div className='w-full lg:w-[80%] flex flex-col gap-1'>
                {mode !== 'base' && (
                    <p className='break-words max-w-full text-center'>
                    {mode === 'min' ? 
                    '*based on a hindering nature, 0 EVs, 0 IVs' 
                    : '*based on a beneficial nature, 252 EVs, 31 IVs'}
                    </p>
                )}
                {mode !== 'base' && (
                <div className='w-full flex items-center py-1 gap-2'>
                    <p className='w-[70px] font-semibold text-center'>
                    Level: {level}
                    </p>
                    <input type='range' min={1} max={100} value={level} 
                    onChange={(e) => setLevel(Number.parseInt(e.target.value))} 
                    className={`flex-1 mr-2 appearance-none rounded-lg h-2
                    ${type && types[type].backgroundColor} cursor-pointer`} />
                </div>
                )}
                <StatsProgress 
                    label='HP'
                    proportion={proportions?.hp} 
                    value={stats && stats[0]} />
                <StatsProgress 
                    label='Attack'
                    proportion={proportions?.atk} 
                    value={stats && stats[1]} />
                <StatsProgress 
                    label='Defense'
                    proportion={proportions?.def} 
                    value={stats && stats[2]} />
                <StatsProgress 
                    label='Sp. Atk'
                    proportion={proportions?.sp_atk} 
                    value={stats && stats[3]} />
                <StatsProgress 
                    label='Sp. Def'
                    proportion={proportions?.sp_def} 
                    value={stats && stats[4]} />
                <StatsProgress 
                    label='Speed'
                    proportion={proportions?.spd} 
                    value={stats && stats[5]} />
                <div className='flex items-center w-full gap-1'>
                    <p className='text-center w-[70px]
                    font-semibold'>Total</p>
                    <p className='flex-1 text-left font-semibold'>
                        {stats && 
                        Object.keys(stats).reduce((total, key) => total + stats[key], 0)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Stats