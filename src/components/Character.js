import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from "../firebaseConfig.js";
import { AuthContext } from "../context/authContext";

function Character(props) {
  const db = firebase.firestore();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const { character } = props;
  console.log(user);
  const addFavorite = () => {
    
    var userDocument = db.collection("users").doc(user.uid);
    // Set the "capital" field of the city 'DC'
    userDocument
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(character),
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
  return (
    <div>
      {character.status === "Alive" && (
        <Link to={`detail/${character.id}`}>
          <img src={character.image} alt="" />
          <p>{character.name}</p>
          <button onClick={() => addFavorite()}>Like</button>
        </Link>
      )}
    </div>
  );
}
export default Character;
