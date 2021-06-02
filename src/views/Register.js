import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";
const Register = () => {
  const db = firebase.firestore();
  const [state, setState] = useState({ email: "", password: "", name: "" });
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  console.log("in register");
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  console.log(db);
  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        db.collection("users")
          .doc(user.uid)
          .set({
            name: state.name,
            email: state.email,
            avatar:
              "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
            favorite: [],
          })
          .then(() => {
            db.collection("users")
              .doc(user.uid)
              .get()
              .then((doc) => {
                const newUser = doc.data();
                console.log(doc.data());
                newUser.uid = user.uid;
                setUser(newUser);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        setUser(null);
        setIsLoggedIn(false);
        // ..
      });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    register();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label>
        <p>name</p>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={state.name}
        />
      </label>
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

export default Register;
