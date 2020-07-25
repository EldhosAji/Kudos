import React, { useState, useEffect, createContext } from "react";
import { auth } from "../../firebase/firebase";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userAuth, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    console.log("dascc");
    console.log(userAuth);
  }, [userAuth]);
  return (
    <UserContext.Provider value={userAuth} setUser={setUser}>
      {props.children}
    </UserContext.Provider>
  );
};
