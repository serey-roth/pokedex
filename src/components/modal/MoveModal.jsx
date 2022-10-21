import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { types } from '../../assets';
import { useGetPokemonMoveQuery } from '../../redux/services/pokemonApi';
import { setMoveModal } from '../../redux/features/pokemonSlice';

import MoveStats from './MoveStats';
import Info from './Info';
import ModalPortal from './ModalPortal';

const MoveModal = () => {
    const dispatch = useDispatch();
    const {
        type, 
        version, 
        selectMove: move, 
        moveModal: visible
    } = useSelector(state => state.pokemon);
    const { data, isFetching, error } = useGetPokemonMoveQuery(move);

    const effectObj = data?.effect_entries?.find(entry => 
        entry?.language?.name === 'en');

    const textObj = data?.flavor_text_entries?.find(entry => 
        entry?.language?.name === 'en' && 
        entry?.version_group?.name === version);

    const handleClose = () => {
        dispatch(setMoveModal(false));
    }

    //when the user hits the escape key, we want to close the modal
    useEffect(() => {
        const closeOnEscapeKey = e => e.key === 'Escape' ? handleClose() : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        //remove the event listener when the element is unmounted 
        //to prevent memory leak
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        }
    }, [handleClose]);

    if (!visible) return null;

    return (
        <ModalPortal wrapperId='modal-portal'>
            <div className='fixed lg:inset-x-1/4 lg:inset-y-[10%] z-50 
            inset-[2%] overflow-auto  transition-all ease-in-out flex 
            backdrop-blur-sm mix-blend-luminosity animate-slideup
            border border-slate-500/40 rounded-lg bg-white
            flex-col items-center gap-3 p-5'>
                <h1 className={`font-bold text-xl uppercase
                ${type && types[type].textColor}`}>
                {move?.replace(/\-/g, ' ')}</h1>
                <MoveStats 
                power={data?.power}
                pp={data?.pp}
                accuracy={data?.accuracy}
                priority={data?.priority}
                contest={data?.contest_type?.name}
                damage={data?.damage_class?.name}
                type={data?.type?.name} />
                <Info 
                description={textObj?.flavor_text} 
                effect={effectObj?.effect?.replace(/\$effect\_chance/g, `${data.effect_chance}`)}
                shortEffect={effectObj?.short_effect?.replace(/\$effect\_chance/g, `${data.effect_chance}`)} />
                <button className={`font-bold uppercase py-1 px-2 rounded-lg
                ${type && types[type].backgroundColor} text-white`}
                onClick={handleClose}>close</button>
            </div>
        </ModalPortal>
    )
}

export default MoveModal