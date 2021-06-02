import React, { useState, useEffect, useContext } from "react";
import HelloWorld from "../components/HelloWorld.js";
import Button from "react-bootstrap/Button";
import Character from "../components/Character.js";
import Loading from "../components/Loading.js";
import { CharactersContext } from "../context/charactersContext";
function Home() {
  const [name, setName] = useState("Ottavia");
  const [age, setAge] = useState(27);
  const { characters } = useContext(CharactersContext);
  console.log("in navabar", characters);
  const handleClick = (e) => {
    console.log(e);
    setName("Moe");
  };

  const myStyledDiv = {
    backgroundColor: "lightgrey",
  };
  return (
    <div style={myStyledDiv}>
      <h1>Hello {name}</h1>
      <Button variant="primary" onClick={handleClick}>
        Click me!
      </Button>

      <HelloWorld myAge={age} />
    </div>
  );
}
export default Home;
