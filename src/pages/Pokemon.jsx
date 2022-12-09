import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiChevronLeft } from 'react-icons/fi'
import { ImSpinner } from 'react-icons/im'
import { useGetPokemon } from '../features/useGetPokemon'

import { types } from '../assets'

import { 
    setBase,
    setSpecies, 
    setType,
    setGeneration,
    setVariety,
    setName
} from '../redux/features/pokemonSlice'

import { setAbilityModal, setMoveModal, updatePage } from '../redux/features/uiSlice'

import ImagePlaceHolder from '../components/ImagePlaceHolder'
import Info from '../components/info/Info'
import GameVersions from '../components/GameVersions'
import ErrorBoundary from '../components/ErrorBoundary'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { usePokemon, useSpecies } from '../features/hooks'
import LoadedImage from '../components/LoadedImage'
import { usePokemonContext } from '../features/pokemonContext'

const PokemonImage = React.lazy(() => import('../components/PokemonImage'));
const Stats = React.lazy(() => import('../components/stats/Stats'));
const MovePool = React.lazy(() => import('../components/moves/MovePool'));
const EvolutionChain = React.lazy(() => import('../components/evolutions/EvolutionChain'));
const Typing = React.lazy(() => import('../components/Typing'));

const generations = {
    'red-blue': 1,
    'yellow': 1 ,
    'gold-silver': 2 ,
    'crystal': 2 ,
    'ruby-sapphire': 3 ,
    'emerald': 3 ,
    'firered-leafgreen': 3 ,
    'diamond-pearl': 4 ,
    'platinum': 4 ,
    'heartgold-soulsilver': 4 ,
    'black-white': 5 ,
    'black-2-white-2': 5 ,
    'x-y': 6 ,
    'omega-ruby-alpha-sapphire': 6 ,
    'sun-moon': 7 ,
    'ultra-sun-ultra-moon': 7 ,
    'lets-go-pikachu-lets-go-eevee': 7 ,
    'sword-shield': 8,
}

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
        handleBaseDataChange, 
        handleSpeciesDataChange, 
        handleTypeChange 
    } = usePokemonContext();

    const pokemonRef = useRef();
    
    const [variety, setVariety] = useState('');
    const [version, setVersion] = useState('red-blue');

    const [moveModal, setMoveModal] = useState(false);
    const [abilityModal, setabilityModal] = useState(false);

    const { 
        data: base,
        isLoading: isLoadingBase,
        isFetching: isFetchingBase,
        isError: isErrorBase, 
        error: errorBase
    } = usePokemon(id);

    const { 
        data: species,
        isLoading: isLoadingSpecies,
        isFetching: isFetchingSpecies,
        isError: isErrorSpecies, 
        error: errorSpecies
    } = useSpecies(id);

    useEffect(() => {
        const handleClick = () => {
            setAbilityModal(false);
            setMoveModal(false);
        }
        //when the user clicks on the pokemon page, closes all the modals
        if (pokemonRef.current) {
            pokemonRef.current.addEventListener('click', handleClick);
        }
        return () => {
            if (pokemonRef.current) {
                pokemonRef.current.removeEventListener('click');
            }                                                                                                                                                     
        }
    }, []);

    useEffect(() => {
        if (base) {
            handleBaseDataChange(base);
            handleTypeChange(base.types[0].type.name);
        }
    }, [base])

    useEffect(() => {
        if (species) handleSpeciesDataChange(species)
    }, [species])

    const handleVersionChange = (e) => {
        setVersion(e.target.value);
    }

    const handleReturn = () => {
        navigate('/');
    }

    let image = base?.sprites?.other['official-artwork'].front_default;
    if (base && /starter/g.test(base.name)) {
        image = new URL(`../assets/artworks/${variety}.png`, 
        import.meta.url).href;
    }

    if (isFetchingBase || isFetchingSpecies || isLoadingBase || isLoadingSpecies) return (<Loader />);

    if ((isErrorSpecies && errorSpecies) || (isErrorBase && errorBase)) return (<Error />)

    return (
        <ErrorBoundary>
            <div className='w-screen min-h-screen flex flex-col items-center 
            gap-5 animate-slidedown relative' ref={pokemonRef}>

                <div className='w-full flex items-center flex-wrap
                p-3 text-black gap-3 justify-center'>
                    <FiChevronLeft 
                        className='font-bold text-xl cursor-pointer' 
                        onClick={handleReturn}/>

                    <GameVersions version={version} onChange={handleVersionChange} />
                </div>

                <div className='flex flex-col items-center w-full justify-center gap-1'>
                    <span className={`flex flex-col items-center
                    font-bold text-2xl uppercase`}>
                        <LoadedImage 
                        src={image}
                        width='100%' />
                        <p>{species?.name}</p>
                    </span>
                    <p className={`font-semibold text-lg cursor-pointer rounded-lg p-2`}>
                        {species?.genera[7]?.genus}
                    </p>
                </div>

                <div className='flex flex-col px-5 items-center gap-3 w-full'>
                    <h1 className={`font-bold text-xl uppercase
                    rounded-lg p-2`}>
                        Pokedex Entries
                    </h1>
                    {getPokedexEntries(getVersions(version), species).map(entry => (
                        <PokedexEntry 
                        key={entry.version} 
                        version={entry.version}
                        text={entry.text} />
                        ))
                    }
                </div>
                <div className='flex flex-col items-center
                w-full px-5'>
                    <Info />
                   {/*  <Typing />
                    <Stats />
                    <EvolutionChain />
                    <MovePool /> */}
                </div> 
            </div> 
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