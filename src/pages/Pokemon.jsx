import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'

import { types } from '../assets'

import Info from '../components/info/Info'
import GameVersions from '../components/GameVersions'
import ErrorBoundary from '../components/ErrorBoundary'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { usePokemon, useSpecies } from '../features/hooks'
import LoadedImage from '../components/LoadedImage'
import { usePokemonContext } from '../features/pokemonContext'

import Stats from '../components/stats/Stats'
import MovePool from '../components/moves/MovePool'
import EvolutionChain from '../components/evolutions/EvolutionChain'
import AbilityModal from '../components/modal/AbilityModal'
import MoveModal from '../components/modal/MoveModal'

const PokedexEntry = ({ version, text }) => (
    <div className='flex flex-col gap-1 lg:w-[80%]'>
        <h2 className={`font-semibold uppercase text-center`}>
            pokemon {version.replace(/\-/g, ' ')}
        </h2>
        <p className='italic text-center'>
            {text ? text : 'This pokemon does not exist in this version.'}
        </p>
    </div>
)

const Pokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { 
        selections,
        handleTypeChange,
        handleSelectionsChange,
    } = usePokemonContext();

    const pokemonRef = useRef();

    const { 
        data: base,
        isLoading: isLoadingBase,
        isFetching: isFetchingBase,
        isError: isErrorBase, 
        error: errorBase
    } = usePokemon(selections.variety ? selections.variety : id);

    const { 
        data: species,
        isLoading: isLoadingSpecies,
        isFetching: isFetchingSpecies,
        isError: isErrorSpecies, 
        error: errorSpecies
    } = useSpecies(id);

    useEffect(() => {
        const handleClick = () => {
            handleSelectionsChange({
                ability: '',
                move: '',
            })
        }
        //when the user clicks on the pokemon page, closes all the modals
        if (pokemonRef.current) {
            pokemonRef.current.addEventListener('click', handleClick);
        }
        return () => {
            if (pokemonRef.current) {
                pokemonRef.current.removeEventListener('click', handleClick);
            }                                                                                                                                                     
        }
    }, []);

    useEffect(() => {
        if (base) {
            handleTypeChange(base.types[0].type.name);
        }
    }, [base])

    //if a modal opens, hide the overflow the underlying page
    useEffect(() => {
        if (selections.move || selections.ability) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [selections.move, selections.ability])
    
    const handleReturn = () => {
        navigate('/');
    }

    if (isFetchingBase || isFetchingSpecies || isLoadingBase || isLoadingSpecies) return (<Loader />);

    if ((isErrorSpecies && errorSpecies) || (isErrorBase && errorBase) || (!base || !species)) return (<Error />)

    let image = base?.sprites?.other['official-artwork'].front_default;
    if (base && selections.variety && /starter/g.test(base.name)) {
        image = new URL(`../assets/artworks/${selections.variety}.png`, 
        import.meta.url).href;
    }

    const type = base?.types[0]?.type.name;

    return (
        <ErrorBoundary>
            <div className='w-screen min-h-screen flex flex-col items-center 
            gap-5 animate-slidedown relative' ref={pokemonRef}>

                <div className='w-full flex items-center flex-wrap
                p-3 text-black gap-3 justify-center'>
                    <FiChevronLeft 
                        className='font-bold text-xl cursor-pointer' 
                        onClick={handleReturn}/>

                    <GameVersions />
                </div>

                <div className='flex flex-col items-center w-full justify-center gap-1'>
                    <span className={`flex flex-col items-center
                    font-bold text-2xl uppercase w-2/3 sm:w-[300px]`}>
                        <LoadedImage 
                        src={image} />
                        <p>{species?.name}</p>
                    </span>
                    <p className='font-semibold text-lg cursor-pointer rounded-lg p-2'>
                        {species?.genera[7]?.genus}
                    </p>
                </div>

                <div className='flex flex-col px-5 items-center gap-3 w-full'>
                    <h1 className={`font-bold text-xl uppercase
                    rounded-lg p-2 ${type && `${types[type].backgroundColor} text-white`}`}>
                        Pokedex Entries
                    </h1>
                    {getPokedexEntries(getVersions(selections.version), species).map(entry => (
                        <PokedexEntry 
                        key={entry.version} 
                        version={entry.version}
                        text={entry.text} />
                        ))
                    }
                </div>

                <div className='flex flex-col items-center
                w-full px-5'>
                    <Info base={base} species={species} />
                    <Stats base={base}/>
                    <EvolutionChain species={species}/>
                    <MovePool 
                    moves={base?.moves}
                    pokemonGeneration={getGenerationNumber(species.generation.name.replace(/generation\-/g, ''))}
                    />
                </div> 
            </div> 

            {selections.ability && (<AbilityModal />)}

            {selections.move && (<MoveModal />)}
        </ErrorBoundary>
    )
}

const getVersions = (version) => {
    switch(version) {
        case 'black-2-white-2': {
            return ['black-2', 'white-2'];
        }
        case 'ultra-sun-ultra-moon': {
            return ['ultra-sun', 'ultra-moon'];
        }
        case 'omega-ruby-alpha-sapphire': {
            return ['omega-ruby', 'alpha-sapphire'];
        }
        case "lets-go-pikachu-lets-go-eevee": {
            return ["lets-go-pikachu", "lets-go-eevee"];
        }
        default: {
            return version.split('-');
        }
    }
}

const getGenerationNumber = (generation) => {
    switch(generation) {
        case 'i': { return 1 }
        case 'ii': { return 2 }
        case 'iii': { return 3 }
        case 'iv': { return 4 }
        case 'v': { return 5 }
        case 'vi': { return 6 }
        case 'vii': { return 7 }
        case 'viii': { return 8 }
    }
}

//get the text entry for the pokemon
const getPokedexEntries = (versionArray, species) => {
    const set = new Set();
    versionArray.map(version => set.add(species?.flavor_text_entries?.find(entry => 
        entry?.language?.name === 'en' &&
        entry?.version?.name === version)?.flavor_text));
    if (set.size === 0) {
        return [{version: versionArray.join('/'), text: "This pokemon does not exist in this version."}];
    } else {
        const iterator = set.values();
        if (set.size === 1) {
            return [{version: versionArray.join('/'), text: iterator.next().value}];
        } else {
            return [{version: versionArray[0], text: iterator.next().value},
                    {version: versionArray[1], text: iterator.next().value}];
        }
    }
}

export default Pokemon