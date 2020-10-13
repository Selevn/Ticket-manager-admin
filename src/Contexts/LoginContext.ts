import React from "react"

export const LoginContext = React.createContext({
  userId: null,
  token: null,
  setUserId: (id: any) => {
  },
  setToken: (JWT: any) => {
  },
});

LoginContext.displayName = 'LoginContext';