import React, {useCallback, useContext} from "react";
import {LoginContext} from "../Contexts/LoginContext";
import * as jwt from "jsonwebtoken";


const storage:string = "userStorage"
export const useAuth = () => {
  const loginContext = useContext(LoginContext)

  const login = useCallback((JWT, id, type) => {
    debugger;
    loginContext.setUserId(id)
    loginContext.setToken(JWT)
    localStorage.setItem(storage, JSON.stringify({userId: id, token: JWT, userType: type}))
  }, [])

  const logout = useCallback(() => {
    loginContext.setUserId(null)
    loginContext.setToken(null)
    localStorage.removeItem(storage)
  }, [])

  const isLoggined = useCallback(() => {
    const data = JSON.parse(<string>localStorage.getItem(storage));
    // @ts-ignore
    return data && data.token && (Date.now() / 1000 < jwt.decode(data.token).exp);
  }, [])

  return {login, logout, isLoggined}
}