import React, { useState, useContext, useCallback } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import LoginModal from '../../../user/components/LoginModal'
import { AuthContext } from '../../context/authContext'
import { useHttpClient } from '../../../shared/hooks/http-hook'
import { useSnackbar } from 'notistack'

import Link from '@material-ui/core/Link'
import Drawer from './NavDrawer'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddCommentIcon from '@material-ui/icons/AddComment'
import AddIcon from '@material-ui/icons/Add'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu'


const useStyles = makeStyles((theme) => ({
  menu: {
    marginRight: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  

}))

interface Store {
  id: string
  name: string
  image?: string
  address: string
  slug: string
}

interface NavLinksProps {

}

const NavLinks: React.FC<NavLinksProps> = ({}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  // useContext allow us to tap into a context to listen to it. Here we can call use context and pass in the auth context, what we get back is an obj which will hold the latest context and this component will re-render whenever the context we're listening to changes

  const auth = useContext(AuthContext)
  const history = useHistory()
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 

  const [drawerState, setDrawerState] = useState(false);
  const [heartList, setHeartList] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)


  const getHearts = async () => {
    const response = await sendRequest('/api/user/hearts', 'GET', null, { 
      Authorization: 'Bearer ' + auth.token
    })
    setHeartList(response)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  

  const storeClickHandler = (storeSlug: string) => {
    history.push(`/store/${storeSlug}`)
  }

  const storeBar = () => {
    if (!heartList || heartList.length === 0) {
      return (
        <Typography variant="body2" style={{ padding: '0 10px 0 10px', color: '#808080'}}>No Hearted Store</Typography>
      )
    }
    const list = heartList.map((store: Store) => {
      return (
        <MenuItem 
          color='inherit'
          onClick={ () => {
            storeClickHandler(store.slug)
          }}
          >
        <div style={{ display: 'flex' }}>
  
          <img 
          style={{ width: 40, height: 40, borderRadius: 3, marginRight: 10 }}
          src={store.image}/>
          <div >
          <Typography>{store.name}</Typography>
          <Typography variant='caption' style={{ color: '#808080' }}>{store.address}</Typography>
          </div>
        </div>
        </MenuItem>
        
      )
    })

    return list
  }


  const heartClickHandler = (e: any) => {
    setAnchorEl(e.currentTarget)
    getHearts()
  
  }
 

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState(open);
  }


  const logoutHandler = async () => {
    // ????? What's wrong with sending request first? async?
    auth.logout()
    
    enqueueSnackbar(`You're logged out`)
    try {
      await sendRequest('/api/logoutAll', 'GET', null, { 
        Authorization: 'Bearer ' + auth.token
      })

    } catch (e) {
      console.log(e)

    }
    
  }

  return (
      <div className={classes.menu}>
        
        <Hidden smDown>
          {/* {auth.isLoggedIn && (
            <IconButton >
              <AddCommentIcon />
            </IconButton>
          )} */}

          {auth.isLoggedIn && (
            <IconButton component={ NavLink } to="/store/add">
                <AddIcon />
            </IconButton>
          )}
        
          {auth.isLoggedIn && (
            <>
            <IconButton onClick={heartClickHandler} aria-haspopup="true">
              <FavoriteBorderIcon />
            </IconButton>
            <Menu 
            id='heartList' 
            onClose={handleClose}
            open={Boolean(anchorEl)} 
            anchorEl={anchorEl} 
            keepMounted 
            style={{ marginTop: 30 }}>  
            {storeBar()}
            </Menu>
            </>
          )}

          {auth.isLoggedIn && (
            <IconButton component={ NavLink } to="/user/me">
              <AccountCircleIcon />
            </IconButton>
          )}
            
        </Hidden>
        {!auth.isLoggedIn && (
          <LoginModal buttonText='log in' disableElevation={true} />
        )}

        {auth.isLoggedIn && 
          <Hidden smDown>
          <Button onClick={logoutHandler}>Logout</Button>
          </Hidden>
        }

        {auth.isLoggedIn && (
          <Hidden mdUp>
            <Drawer 
            clickHandler={toggleDrawer(true)}
            openHandler={toggleDrawer(true)}
            closeHandler={toggleDrawer(false)}
            open={drawerState}       
            />

          </Hidden>
        )}

      

      </div>
)}
export default NavLinks