import React, {useState, useEffect, useCallback} from 'react';

import Router from './Router';
import {BrowserRouter} from "react-router-dom";
import {LoginContext} from './Contexts/LoginContext';
import * as jwt from "jsonwebtoken";
import AdminContainer from "./Admin/Admin.container";

const storage = "userStorage"
const App = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null);

  useEffect(() => {

    // @ts-ignore
    const data = JSON.parse(localStorage.getItem(storage));

    // @ts-ignore
    if (data && data.token && (Date.now() / 1000 < jwt.decode(data.token).exp)) {
      setToken(data.token)
      setUserId(data.userId)
    }
  }, [])


  const loginContext = {
    userId: userId,
    token: token,
    setUserId: setUserId as React.SetStateAction<any>,
    setToken: setToken as React.SetStateAction<any>,
  };

  return (<React.StrictMode>
    <BrowserRouter>
      <LoginContext.Provider value={loginContext}>
        <Router/>
      </LoginContext.Provider>
    </BrowserRouter>
  </React.StrictMode>)
}
export default App;