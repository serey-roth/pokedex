import React, {  
    useState, 
    useEffect, 
    useLayoutEffect,
    useRef,
    useCallback 
} from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import MoveModal from './components/modal/MoveModal';
import AbilityModal from './components/modal/AbilityModal';
import { updatePage } from './redux/features/uiSlice';

const App = () => {
    const dispatch = useDispatch();

    //the page number determines how many pokemons are displayed to the user 
    //on the screen
    const [pageNum, setPageNum] = useState(1);
    //the element that the intersection observer listens for 
    const lastElement = useRef(null);
    const { page, moveModal, abilityModal } = useSelector(state => state.ui);

    // a callback function that gets triggered when lastElement
    //interesects the viewport, i.e., shows up on the screen 
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            //if the target intersects the viewport, increment the page number
            setPageNum((prev) => {
                return prev + 1;
            });
        }
    }, []);

    //when the user hits the browser back button, 
    //update the page state based on the location path
    useLayoutEffect(() => {
        if (window.location.pathname === '/') {
            dispatch(updatePage('pokedex'));
        } else {
            dispatch(updatePage('pokemon'));
        }
    }, [window.location.pathname])

    //executes when the page state changes
    useLayoutEffect(() => {
        const option = {
          root: null,
          rootMargin: "0px",
          threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (lastElement.current) {
            observer.observe(lastElement.current)
        }
    }, [page]);
    
    //if a modal opens, hide the overflow the underlying page
    useEffect(() => {
        if (moveModal || abilityModal) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [moveModal, abilityModal])

    return (
        <div className='flex flex-col bg-white/50 w-screen min-h-screen relative'>
            <Routes>
                <Route element={<PokedexLayout ref={lastElement} />}>
                    <Route path='/'
                    element={<Pokedex pageNum={pageNum} setPageNum={setPageNum}/>} />
                </Route>
                <Route path='/pokemon/:query' element={<Pokemon />} />
            </Routes>
            <MoveModal />
            <AbilityModal />
        </div>
    )
}

//we don't want the last element to be inside the pokedex component because
//when the component is mounted, we're still loading data so the last element 
//has not been mounted yet so lastElement will be null
//when data is loaded, only the pokedex component renders, not app
//you want it to be outside; then, when the app is mounted, the intersection
//observer knows what to observe 
const PokedexLayout = React.forwardRef((props, ref) => {
    return (
        <>
            <Outlet />
            <div className='w-10 h-10 bg-transparent' ref={ref}></div>
        </>
    )
})

export default App;