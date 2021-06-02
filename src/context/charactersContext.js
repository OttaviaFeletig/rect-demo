// 1. import the modules
import React, { createContext, useState } from "react";
// 2. initialize the context
const initCharactersContext = {
  characters: [],
  loading: true,
};
// few words about wrappers

// 3. create context

export const CharactersContext = createContext(initCharactersContext);

// 4. make provider => value / children
export const CharactersContextProvider = ({ children }) => {
  const [characters, setCharacters] = useState(
    initCharactersContext.characters
  );
  const [loading, setLoading] = useState(initCharactersContext.loading);
  // console.log(`characters in context`, characters);
  // console.log(`loading in context`, loading);
  const clearCharacters = () => {
    setCharacters([]);
  };
  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
        clearCharacters,
        loading,
        setLoading,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
