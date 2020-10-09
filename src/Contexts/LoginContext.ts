import React from "react"

export const LoginContext = React.createContext({
  userId: null,
  token: null,
  setUserId: () => {
  },
  setToken: () => {
  },
});

LoginContext.displayName = 'LoginContext';