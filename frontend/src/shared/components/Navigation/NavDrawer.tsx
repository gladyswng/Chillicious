import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { NavLink } from 'react-router-dom'


import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCommentIcon from '@material-ui/icons/AddComment';
import AddIcon from '@material-ui/icons/Add';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

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

  const drawerList = () => {


    return (
    <div
     
      role="presentation"
      onClick={props.closeHandler}
      onKeyDown={props.closeHandler}
    >
      <List>
        <NavLink to='/users/me' className={classes.navLinks} >
          
          <ListItem button >
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary={'Log In'} />
          </ListItem>
        </NavLink>
       </List>
      <Divider />
      <List>
        <ListItem button >
         <ListItemIcon><AddIcon /></ListItemIcon>
         <ListItemText primary={'Add Store'} />
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