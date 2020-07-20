import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import LoginModal from '../../../user/components/LoginModal'

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCommentIcon from '@material-ui/icons/AddComment';
import AddIcon from '@material-ui/icons/Add';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'

interface NavDrawerProps {
  clickHandler: (event: any) => void,
  closeHandler: (event: any) => void,
  openHandler: (event: any) => void,
  open: boolean
}

const useStyles = makeStyles((theme) => ({
  navLinks: { 
    textDecoration: 'none',
    color: 'inherit'
  }

}));

const NavDrawer: React.FC<NavDrawerProps> = (props) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)

  const drawerList = () => {


    return (
    <div
     
      role="presentation"
      onClick={props.closeHandler}
      onKeyDown={props.closeHandler}
    >

      <List>
        <NavLink to='/store/add' className={classes.navLinks} >
        <ListItem button >
         <ListItemIcon><AddIcon /></ListItemIcon>
         <ListItemText primary={'Add Store'} />
        </ListItem>
        </NavLink>
      </List>

      <List>
        <NavLink to='/user/me' className={classes.navLinks} >
        <ListItem button >
         <ListItemIcon><AccountCircleIcon /></ListItemIcon>
         <ListItemText primary={'Profile'} />
        </ListItem>
        </NavLink>
      </List>
      <List>

        <ListItem button onClick={auth.logout} >
         <ListItemIcon><ExitToAppIcon /></ListItemIcon>
         <ListItemText primary={'Logout'} />
        </ListItem>
      </List>

      
    </div>
  )}
    
    return (
  
      <React.Fragment >
        
        <IconButton onClick={props.clickHandler}>

        <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={'right'}
          open={props.open}
          onClose={props.closeHandler}
          onOpen={props.openHandler}
          
        >
          {drawerList()}
        </SwipeableDrawer>
      </React.Fragment>

    
    
        
   
  

    );
}
export default NavDrawer