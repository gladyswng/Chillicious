import React, { useState, useCallback, useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"

import UserPage from './user/pages/UserPage'
import UserSignUp from './user/pages/UserSignUp'

import UpdateStore from './store/pages/UpdateStore'
import Store from './store/pages/Store'
import AddStore from './store/pages/AddStore'
import SearchResult from './store/pages/SearchResult'
import Homepage from './home/page/homePage'
import Layout from './util/Layout'
import { AuthContext } from './shared/context/authContext'
import { makeStyles } from '@material-ui/core/styles';


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    spacing: 4,
    palette: {
        primary: {
            main: '#FEC200'
        },
        secondary: {
            main: '#000000'
        }
    }
})

const useStyles = makeStyles((theme) => ({
  appRoot: {
    marginTop: 64, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    width: '100%'
  },
}));


let logoutTimer:any // Timeout??

const App: React.FC = () => {
  const classes = useStyles()
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



  let routes

  if (token) {
    routes = (
      <Switch>
      <Route path="/" exact>
          <Homepage />
      </Route>


      <Route path="/stores" exact>
          <SearchResult />
      </Route>

      <Route path="/store/add" exact>
          <AddStore />
      </Route>

      <Route path="/store/:slug" exact>
          <Store />
      </Route>


      <Route path="/store/edit/:id" exact>
          <UpdateStore />
      </Route>

      <Route path="/user/signUp" exact>
          <UserSignUp />
      </Route>
  
      <Route path="/user/me" exact>
          <UserPage />
      </Route>

      <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
      <Route path="/" exact>
          <Homepage />
      </Route>

      <Route path="/stores" exact>
          <SearchResult />
      </Route>

      <Route path="/store" exact>
          <Store />
      </Route>
      <Route path="/store/add" exact>
          <AddStore />
      </Route>
      <Route path="/store/:slug" exact>
          <Store />
      </Route>
      <Route path="/store/edit/:id" exact>
          <UpdateStore />
      </Route>



      <Route path="/user/signUp" exact>
          <UserSignUp />
      </Route>

      <Redirect to="/user/signUp" />
          
      </Switch>
    )
  }


  return (
  
  <ThemeProvider theme={theme}>
    {/* Here we bind the value we managed with context, which we initialize to the object in authContext, and bind this initial value to a new value, whenever this value here changes, all the componentes that listen to our context, so that active tap into the context we re-render, not all the components that are wrapped by provider but only the components where we add code to listen to our context. When bind when isLoggedIn changes, new value will be passed down*/}
  <AuthContext.Provider 
    value={{ 
      isLoggedIn: !!token, 
      token: token,
      userId: userId,
      login: login, 
      logout: logout 
    }}>
    <Router>
      <Layout>
        <main className={classes.appRoot}>

        {routes}
      </main>
      </Layout>
    </Router>
  </AuthContext.Provider>
  </ThemeProvider>

  )
    
}
  
export default App;
