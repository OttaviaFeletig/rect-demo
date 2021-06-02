import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(`user in login`, user);
        setUser(user);
        setIsLoggedIn(true);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setUser(null);
        setIsLoggedIn(false);
      });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label>
        <p>email</p>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
      </label>
      <label>
        <p>Password</p>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Login;
