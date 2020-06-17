import React, { createContext } from 'react'



export const AuthContext = createContext({
  isLoggedIn: false, 
  userId: null,
  token: null,
  login: (userId:string, token: string) => {}, 
  logout: () => {}
})

