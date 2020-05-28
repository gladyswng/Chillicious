import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Drawer from './NavDrawer'

import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button'
import AddCommentIcon from '@material-ui/icons/AddComment';
import AddIcon from '@material-ui/icons/Add';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton';
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
              <IconButton >
                <AddCommentIcon />
              </IconButton>
            <NavLink to="/store/add">
              <IconButton >
                  <AddIcon />
              </IconButton>
            </NavLink>

              <IconButton >
                <FavoriteBorderIcon />
              </IconButton>

              <IconButton >
                <AccountCircleIcon />
              </IconButton>

            <NavLink to="/users/me" style={{ textDecoration: 'none', width: 74 }}>
              <Button variant="contained" color="primary" style={{ boxShadow: 'none' }}>
                LogIn
              </Button>
            </NavLink>
        </Hidden>
           


          <Hidden mdUp>
            <Drawer 
            clickHandler={toggleDrawer(true)}
            openHandler={toggleDrawer(true)}
            closeHandler={toggleDrawer(false)}
            open={drawerState}
          
            />
            {/* <React.Fragment>

              {drawerIsOpen && (
                <SideDrawer>
                  <Nav></Nav>
                </SideDrawer>
              )}
            </React.Fragment> */}


          </Hidden>
        


      </div>
    );
}
export default NavLinks