import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Home from "./screen/Home";
import Signup from "./screen/Signup";
import { auth } from "./firebase/firebase";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { UserProvider, UserContext } from "./screen/componentes/UserContext";

const ProtectedRouts = ({ component: Component, ...rest }) => {
  const userAuth = useContext(UserContext);
  const [authUser, setAuthuser] = useState();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userAuth) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Signup} />
            <ProtectedRouts exact path="/Home" component={Home} />
            <Route path="/das" component={() => "404 not fount"} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
