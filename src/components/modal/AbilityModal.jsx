import React, { useEffect } from 'react'

import { types } from '../../assets';
import { useAbility } from '../../features/hooks';
import { usePokemonContext } from '../../features/pokemonContext';

import Info from './Info';
import ModalPortal from './ModalPortal';

const AbilityModal = () => {
    const {
        type,
        selections,
        handleSelectionsChange,
    } = usePokemonContext();

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error
    } = useAbility(selections.ability);

    const effectObj = data?.effect_entries?.find(entry =>
        entry?.language?.name === 'en');

    const textObj = data?.flavor_text_entries?.find(entry =>
        entry?.language?.name === 'en' &&
        entry?.version_group?.name === selections.version);

    const handleClose = () => {
        handleSelectionsChange({
            name: 'ability',
            value: '',
        })
    }

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === 'Escape' ? handleClose() : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        }
    }, [handleClose])

    return (
        <ModalPortal wrapperId='modal-portal'>
            <div className='fixed lg:inset-x-1/4 lg:inset-y-[10%]
            inset-[2%] overflow-auto z-50 backdrop-blur-sm
            mix-blend-luminosity flex animate-slideup
            border border-slate-500/40 rounded-lg bg-white
            flex-col items-center gap-3 p-5'>
                {(isLoading || isFetching) ? (
                    <p>Loading...</p>
                ): (isError && error) ? (
                    <p>Error occurred when fetching data!</p>
                ) :
                (
                <>
                    <h1 className={`font-bold text-xl uppercase
                    ${type && types[type].textColor}`}>
                        {selections.ability?.replace(/\-/g, ' ')}</h1>

                    <Info
                        description={textObj?.flavor_text}
                        effect={effectObj?.effect}
                        shortEffect={effectObj?.short_effect} />

                    <button className={`font-bold uppercase py-1 px-2 rounded-lg
                    ${type && types[type].backgroundColor} text-white`}
                        onClick={handleClose}>close</button>
                </>
                )}
            </div>
        </ModalPortal>
    )
}

export default AbilityModal