import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';

const queryClient = new QueryClient();

const App = () => {
    return (
        <div className='flex flex-col bg-white/50 w-screen min-h-screen relative'>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path='/' element={<Pokedex />} />
                        <Route path='/pokemon/:id' element={<Pokemon />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </div>
    )
}

export default App;