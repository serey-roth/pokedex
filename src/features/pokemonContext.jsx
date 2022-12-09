import { useState, useContext, createContext } from "react";

const PokemonContext = createContext({});

export const PokemonContextProvider = ({ children }) => {
    const [baseData, setBaseData] = useState({});
    const [speciesData, setSpeciesData] = useState({});
    const [type, setType] = useState('');

    const handleBaseDataChange = (data) => setBaseData(data);
    const handleSpeciesDataChange = (data) => setSpeciesData(data);
    const handleTypeChange = (type) => setType(type);

    return (
        <PokemonContext.Provider value={{
            baseData, 
            speciesData,
            type,
            handleBaseDataChange,
            handleSpeciesDataChange,
            handleTypeChange,
        }}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemonContext = () => useContext(PokemonContext);