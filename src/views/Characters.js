import React, { useState, useEffect, useContext } from "react";
import Character from "../components/Character.js";
import Loading from "../components/Loading.js";
import { CharactersContext } from "../context/charactersContext";
function Characters() {
  // const [characters, setCharacters] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { characters, setCharacters, clearCharacters, loading, setLoading } =
    useContext(CharactersContext);
  console.log(`characters`, characters);
  console.log(`loading`, loading);
  const fetchApi = async () => {
    try {
      console.log("fetching");
      setLoading(true);
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/"
      );
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }

    // fetch("https://rickandmortyapi.com/api/character/")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setCharacters(data.results);
    //     setLoading(false);
    //   }).catch(err => console.log(err))
  };

  useEffect(() => {
    if (loading && characters.length == 0) fetchApi();
  }, []);
  return (
    <div>
      <button onClick={clearCharacters}>clear</button>
      {!loading ? (
        characters.map((character, index) => {
          return <Character key={character.id} character={character} />;
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default Characters;
