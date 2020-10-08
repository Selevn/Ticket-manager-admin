import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import {BrowserRouter} from "react-router-dom";
// @ts-ignore
import * as jwt from "jsonwebtoken";

const storage = "userStorage"
const [token, setToken] = useState(null)
const [userType, setUserType] = useState(null)
const [userId, setUserId] = useState(null);

useEffect(() => {
    // @ts-ignore
    const data = JSON.parse(localStorage.getItem(storage));
    if (data && data.token && (Date.now() / 1000 < jwt.decode(data.token).exp)) {
        setToken(data.token)
        setUserId(data.userId)
        setUserType(data.userType)
    }
}, [])

const LoginContext = {
    userId: userId,
    token: token,
    userType: userType,
    setUserId: setUserId,
    setToken: setToken,
    setUserType: setUserType,
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoginContext.Provider value={loginContext}>
                <Router/>
            </LoginContext.Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
