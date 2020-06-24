import { useState, useCallback, useEffect } from 'react'

let logoutTimer:any  // Timeout??
export const useAuth = () => {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)
  const [tokenExpirationDate, setTokenExpirationDate] = useState<any>()


  // the function in useCallback will never be recreated
  const login= useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    const tokenExpirationDate = 
    expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 12)

    setTokenExpirationDate(tokenExpirationDate)

    localStorage.setItem(
      'userData', 
      JSON.stringify({ 
        userId: uid, 
        token: token, 
        expiration: tokenExpirationDate.toISOString() })
      // toISOSstring ensure no data gets lost when date is stringified
      
    )
  }, []) // Thanks to useCallback it will only run once
  
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setTokenExpirationDate(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      // setTimeout returns an id of the timer created
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
      // when manual log out, no need timer

    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (
      storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date() // still valid token
      ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
    
  }, [login])

  return {token, login, logout, userId }


}