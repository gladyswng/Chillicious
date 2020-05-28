import React, { useRef } from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import UserProfile from './user/pages/UserProfile'
import UserAccount from './user/pages/UserAccount'
import Store from './store/pages/Store'
import AddStore from './store/pages/AddStore'
import Layout from './util/Layout'

import Homepage from './home/page/homePage'

import SearchResult from './store/pages/SearchResult'

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

    },


})


const App: React.FC = () => {


    return (
        <ThemeProvider theme={theme}>

          
            <Router>
              <Layout>
                <main style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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

                    <Route path="/users/me" exact>
                        <UserAccount />
                        {/* <UserProfile /> */}
                        

                    </Route>

                    <Route path="/store/add" exact>
                        <AddStore />
                    </Route>

         


                    <Redirect to="/" />
                </Switch>
                </main>
              </Layout>
            </Router>
        </ThemeProvider>




    )
    
}
  
export default App;
