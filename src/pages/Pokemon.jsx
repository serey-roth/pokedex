import React, { useEffect, createRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiChevronLeft } from 'react-icons/fi'
import { ImSpinner } from 'react-icons/im'
import { useGetPokemon } from '../features/useGetPokemon'

import { types } from '../assets'
import { 
    setAbilityModal, 
    setBase,
    setMoveModal, 
    setSpecies, 
    setType,
    setGeneration
} from '../redux/features/pokemonSlice'

import ImagePlaceHolder from '../components/ImagePlaceHolder'
import Info from '../components/info/Info'
import GameVersions from '../components/GameVersions'
import ErrorBoundary from '../components/ErrorBoundary'
import Loader from '../components/Loader'
import Error from '../components/Error'

const PokemonImage = React.lazy(() => import('../components/PokemonImage'));
const Stats = React.lazy(() => import('../components/stats/Stats'));
const MovePool = React.lazy(() => import('../components/moves/MovePool'));
const EvolutionChain = React.lazy(() => import('../components/evolutions/EvolutionChain'));
const Typing = React.lazy(() => import('../components/Typing'));

const PokedexEntry = ({version, text, type}) => (
    <div className='flex flex-col gap-1 lg:w-[80%]'>
        <h2 className={`font-semibold uppercase
        ${type && types[type].textColor} text-center`}>
            pokemon {version.replace(/\-/g, ' ')}
        </h2>
        <p className='italic text-center'>
            {text ? text : 'This pokemon does not exist in this version.'}
        </p>
    </div>
)

const Pokemon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { base, species, isFetchingBase, 
        isFetchingSpecies, errorBase, errorSpecies } = useGetPokemon(id)
    const { type, version } = useSelector(state => state.pokemon);
    const pokemonRef = createRef();

    useEffect(() => {
        const handleClick = () => {
            dispatch(setAbilityModal(false));
            dispatch(setMoveModal(false));
        }
        if (pokemonRef.current) {
            pokemonRef.current.addEventListener('click', handleClick);
        }
        return () => {
            if (pokemonRef.current) {
                pokemonRef.current.removeEventListener('click');
            }
        }
    }, [dispatch]);


    useEffect(() => {
        if (base) {
            const type = base.types[0].type.name;
            dispatch(setType(type));
            dispatch(setBase(base));
        }
    }, [dispatch, base]);
    
    useEffect(() => {
        if (species) {
            dispatch(setSpecies(species));
            dispatch(setGeneration(species?.generation?.name?.replace(/generation\-/g, '')));
        }
    }, [dispatch, species]);

    if (isFetchingBase || isFetchingSpecies) return (<Loader />);

    if (errorBase) return (<Error />)

    return (
        <ErrorBoundary>
            <div className='w-screen min-h-screen flex flex-col items-center 
            gap-10 animate-slidedown relative' ref={pokemonRef}>
                <div className={`fixed w-screen z-10 flex items-center flex-wrap
                p-3 ${type && types[type].backgroundColor}
                text-black gap-3 justify-center`}>
                    <FiChevronLeft className='font-bold text-xl cursor-pointer' 
                    onClick={() => navigate('/')}/>
                    <h1 className='font-bold uppercase text-2xl'>
                        Pokedex
                    </h1>
                    <GameVersions />
                </div>
                <div className='flex flex-col items-center 
                w-full justify-center gap-1 lg:mt-10 mt-20'>
                    <React.Suspense fallback={
                        <div className='w-[50%] lg:w-[420px] lg:h-[420px] 
                        flex items-center justify-center self-center mt-10'>
                            <ImagePlaceHolder />
                        </div>
                    }>
                        <div className='w-[50%] lg:w-[420px] lg:h-[420px] 
                        flex items-center justify-center self-center mt-10'>
                            <PokemonImage 
                            src={base?.sprites?.other['official-artwork'].front_default} />
                        </div>
                    </React.Suspense>
                    <h1 className={`font-bold text-2xl uppercase
                    ${type && types[type].textColor}`}>
                        {base?.name}
                    </h1>
                    <p className={`font-semibold text-lg cursor-pointer
                    ${type && types[type].backgroundColor}
                    text-white rounded-lg p-2`}
                    onClick={() => dispatch(setSelectGenera(
                    species?.genera[7]?.genus))}>
                        {species?.genera[7]?.genus}
                    </p>
                </div>
                <div className='flex flex-col px-5 items-center gap-3 w-full'>
                    <h1 className={`font-bold text-xl uppercase 
                    ${type && types[type].backgroundColor} text-white
                    rounded-lg p-2`}>
                        Pokedex Entries
                    </h1>
                    {getPokedexEntries(getVersions(version), species).map(entry => (
                    <PokedexEntry 
                    key={entry.version} 
                    version={entry.version}
                    type={type}
                    text={entry.text} />
                    ))}
                </div>
                <div className='flex flex-col items-center
                w-full px-5'>
                    <Info />
                    <React.Suspense fallback={<ImSpinner />}>
                        <Typing />
                        <Stats />
                        <EvolutionChain />
                        <MovePool />
                    </React.Suspense>
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