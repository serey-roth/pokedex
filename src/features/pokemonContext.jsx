import { useState, useContext, createContext } from "react";

const PokemonContext = createContext({});

export const PokemonContextProvider = ({ children }) => {
    const [type, setType] = useState('');
    const [selections, setSelections] = useState({
        variety: '',
        ability: '',
        move: '',
        version: 'red-blue',
    })

    const handleTypeChange = (type) => setType(type);
    
    const handleSelectionsChange = (updatedSelections) => {
        setSelections(prevSelections => ({
            ...prevSelections,
            ...updatedSelections
        }))
    }

    return (
        <PokemonContext.Provider value={{
            type,
            selections,
            handleTypeChange,
            handleSelectionsChange
        }}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemonContext = () => useContext(PokemonContext);