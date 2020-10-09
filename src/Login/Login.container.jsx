import React, {useState} from "react";
import Login from "./Login.jsx";
//import {backendUrl} from "../../config/default.json";
import {useAuth} from "../customHooks/auth.hook.js";

import 'materialize-css'
import {useHistory} from "react-router";

const LoginContainer = () => {

  const authHook = useAuth()
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const history = useHistory();

  const loginHandler = async () => {
    try {
        let method = "POST",
          body = JSON.stringify({email: email, password: password}),
          headers = {"Content-Type":'application/json'}

      const response = await fetch("http://localhost:3003" + "/api/login/login", {method, body, headers})
      const data = await response.json()
      authHook.login(data.token, data.id, data.userType)
      authHook.isLoggined() && history.push("/")
    } catch (e) {
      window.M.toast({html: e.message, displayLength: 5000, classes: "error"})
    }
  }
  const onMailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Login email={email}
           onMailChange={onMailChange}
           password={password}
           onPasswordChange={onPasswordChange}
           loginHandler={loginHandler}
           />
  )
};


export default LoginContainer;