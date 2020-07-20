import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import LoginModal from '../../../user/components/LoginModal'
import { AuthContext } from '../../context/authContext'

import Drawer from './NavDrawer'

import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button'
import AddCommentIcon from '@material-ui/icons/AddComment';
import AddIcon from '@material-ui/icons/Add';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu'


const useStyles = makeStyles((theme) => ({
  menu: {
    marginRight: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  

}));

interface NavLinksProps {

}

const NavLinks: React.FC<NavLinksProps> = ({}) => {
  const classes = useStyles()
  // useContext allow us to tap into a context to listen to it. Here we can call use context and pass in the auth context, what we get back is an obj which will hold the latest context and this component will re-render whenever the context we're listening to changes

  const auth = useContext(AuthContext)

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState(open);
  };

  return (
      <div className={classes.menu}>
        
        <Hidden smDown>
          {auth.isLoggedIn && (
            <IconButton >
              <AddCommentIcon />
            </IconButton>
          )}

          {auth.isLoggedIn && (
            <IconButton component={ NavLink } to="/store/add">
                <AddIcon />
            </IconButton>
          )}
        
          {auth.isLoggedIn && (
            <IconButton >
              <FavoriteBorderIcon />
            </IconButton>
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
          <Button onClick={auth.logout}>Logout</Button>
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