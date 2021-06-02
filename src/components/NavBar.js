import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";

export default function NavBar() {
  const db = firebase.firestore();

  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            const newUser = doc.data();
            console.log(doc.data());
            newUser.uid = user.uid;
            setUser(newUser);
            setIsLoggedIn(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // No user is signed in.
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  };
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {isLoggedIn && <li>LogOut</li>}
      </ul>

      {user && <p>Welcome {user.name}</p>}
    </nav>
  );
}
