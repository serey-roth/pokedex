import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import MoveModal from './components/modal/MoveModal';
import AbilityModal from './components/modal/AbilityModal';

const App = () => {
    const [pageNum, setPageNum] = useState(1);
    const lastElement = useRef(null);
    const { moveModal, abilityModal } = useSelector(state => state.pokemon);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPageNum((prev) => {
                return prev + 1;
            });
        }
    }, []);
    
    useEffect(() => {
        const option = {
          root: null,
          rootMargin: "0px",
          threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (lastElement.current) observer.observe(lastElement.current);
    }, [handleObserver]);
    
    useEffect(() => {
        if (moveModal || abilityModal) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [moveModal, abilityModal])

    return (
        <div className='flex flex-col bg-white w-screen min-h-screen 
        justify-center relative'>
            <Routes>
                <Route element={<PokedexLayout ref={lastElement} />}>
                    <Route path='/'
                    element={<Pokedex pageNum={pageNum} setPageNum={setPageNum}/>} />
                </Route>
                <Route path='/pokemon/:id' element={<Pokemon />} />
            </Routes>
            <MoveModal />
            <AbilityModal />
        </div>
    )
}

const PokedexLayout = React.forwardRef((props, ref) => {
    return (
        <>
            <Outlet />
            <div className='w-10 h-10 bg-transparent' ref={ref}></div>
        </>
    )
})

export default App;