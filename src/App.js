import logo from "./logo.svg";
import "./App.css";
import Home from "./views/Home.js";
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import Characters from "./views/Characters.js";
import NavBar from "./components/NavBar.js";
import Detail from "./components/Detail.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CharactersContextProvider } from "./context/charactersContext";
import { AuthContextProvider } from "./context/authContext";
import React, { useState, useContext, useEffect } from "react";
function App() {
  return (
    // <Wrapper>
    <AuthContextProvider>
      <Router>
        <div className="App">
          <NavBar />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <CharactersContextProvider>
              <Route exact path="/characters">
                <Characters />
              </Route>
            </CharactersContextProvider>
            <Route exact path="/detail/:id" children={<Detail />} />
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
    // </Wrapper>
  );
}

export default App;
