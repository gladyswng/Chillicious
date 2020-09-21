import React, { Suspense } from "react"

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"

import { HashRouter } from "react-router-dom";
import useScript from './shared/hooks/useScript'
import { AuthContext } from './shared/context/authContext'
import { ScriptLoadContext } from './shared/context/scriptLoadContext'
import { useAuth } from './shared/hooks/auth-hook'



import Layout from './util/Layout'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Typography } from "@material-ui/core"
import { SnackbarProvider } from 'notistack'

// import UserPage from './user/pages/UserPage'
// import UserSignUp from './user/pages/UserSignUp'
// import UpdateStore from './store/pages/UpdateStore'
// import Store from './store/pages/Store'
// import AddStore from './store/pages/AddStore'
// import SearchResult from './store/pages/SearchResult'
// import Homepage from './home/page/Homepage'

const UserPage = React.lazy(() => import('./user/pages/UserPage'))
const UserSignUp = React.lazy(() => import('./user/pages/UserSignUp'))
const ResetLink = React.lazy(() => import('./user/pages/ResetLink'))
const ResetPassword = React.lazy(() => import('./user/pages/ResetPassword'))
const UpdateStore = React.lazy(() => import('./store/pages/UpdateStore'))
const Store = React.lazy(() => import('./store/pages/Store'))
const AddStore = React.lazy(() => import('./store/pages/AddStore'))
const SearchResult = React.lazy(() => import('./store/pages/SearchResult'))
const Homepage = React.lazy(() => import('./home/page/Homepage'))




const theme = createMuiTheme({
    spacing: 4,
    palette: {
        primary: {
            main: '#FEC200'
        },
        secondary: {
            main: '#C0C0C0'
        }
    },
    // overrides: {
    //   MuiTypography:{
    //     h3: {
    //       [breakpoints.down('xs')]: {
    //         fontSize: '2rem',
    //       }
    //     }
    //   }
    // }
})

// theme.typography.h4 = {
//   fontSize: '4rem',
//   [theme.breakpoints.down('xs')]: {
//     fontSize: '2rem',
//   }
  
// }

const useStyles = makeStyles((theme) => ({
  appRoot: {
    marginTop: 64, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginTop: 56, 
    }
    
  },
}));



// TODO - AUTH WHEN RELOAD FOR EVERY PAGE LIKE EDIT STORE AND PROFILE PAGE
const App: React.FC = () => {
  const classes = useStyles()
  const [loaded, error] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`)

  const { token, login, logout, userId } = useAuth()

  // const [tokenLoaded, setTokenLoaded] = useState<any>()
  
  // useEffect(() => {
  //   setTokenLoaded(token)
  // }, [token])
  let routes
 
  if (token) {
    // TODO - FIX REDIRECTION ISSUE WHEN TOKEN WAS FALSE YET
    
    routes = (
      <Switch>
      <Route path="/" exact>
          <Homepage />
      </Route>


      <Route path="/stores/:location" exact>
          <ScriptLoadContext.Provider value={{ scriptLoaded: loaded, scriptLoadError: error }}>
          <SearchResult />
          </ScriptLoadContext.Provider>
      </Route>

      <Route path="/store/add" exact>
          <AddStore />
      </Route>
      <Route path="/store/:slug" exact>
      <ScriptLoadContext.Provider value={{ scriptLoaded: loaded, scriptLoadError: error }}>
          <Store />
      </ScriptLoadContext.Provider>
      </Route>


      <Route path="/store/edit/:id" exact>
          <UpdateStore />
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
      <Route path="/stores/:location" exact>
          <ScriptLoadContext.Provider value={{ scriptLoaded: loaded, scriptLoadError: error }}>
          <SearchResult />
          </ScriptLoadContext.Provider>
      </Route>

  
      <Route path="/store/:slug" exact>
        <ScriptLoadContext.Provider value={{ scriptLoaded: loaded, scriptLoadError: error }}>
            <Store />
        </ScriptLoadContext.Provider>
      </Route>
  
      <Route path="/user/signUp" exact>
          <UserSignUp />
      </Route>

      <Route path="/user/resetLink" exact>
        <ResetLink />
      </Route>


      <Route path="/user/resetPassword/:token" exact>
          <ResetPassword />
      </Route>
      


      <Redirect to="/" />
      </Switch>
    )
  }


  return (
  
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={2}>
 
    
    {/* Here we bind the value we managed with context, which we initialize to the object in authContext, and bind this initial value to a new value, whenever this value here changes, all the componentes that listen to our context, so that active tap into the context we re-render, not all the components that are wrapped by provider but only the components where we add code to listen to our context. When bind when isLoggedIn changes, new value will be passed down*/}
  <AuthContext.Provider 
    value={{ 
      isLoggedIn: !!token, 
      token: token,
      userId: userId,
      login: login, 
      logout: logout 
    }}>
    <HashRouter>
      <Layout>
        <main className={classes.appRoot}>
        <Suspense fallback={<div><CircularProgress /></div>}>
          {routes}

        </Suspense>
      </main>
      </Layout>
    </HashRouter>
  </AuthContext.Provider>
  </SnackbarProvider>
  </ThemeProvider>

  )
    
}
  
export default App;
