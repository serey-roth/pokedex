import { Routes, Route } from 'react-router-dom';

import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import MoveModal from './components/modal/MoveModal';
import AbilityModal from './components/modal/AbilityModal';

const App = () => {
    return (
        <div className='flex flex-col bg-white/50 w-screen min-h-screen relative'>
            <Routes>
                <Route path='/' element={<Pokedex />} />
                <Route path='/pokemon/:id' element={<Pokemon />} />
            </Routes>
            <MoveModal />
            <AbilityModal />
        </div>
    )
}

export default App;