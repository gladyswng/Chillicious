import React from 'react';
import { NavLink } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden';
import SearchBar from '../UIElements/SearchBar'
import NavLinks from './NavLinks'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


import Typography from '@material-ui/core/Typography';

import { fade, makeStyles } from '@material-ui/core/styles';

// menu
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// icon
import logo from '../../../../logo.svg'

import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    zIndex: 1000
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    paddingRight: theme.spacing(1),

  },

  logo: {
    width: '120px',
    height: '60px',
    paddingRight: theme.spacing(3)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(1),
    width: '100%',
    height: '35px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(2em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
    height: '30px'
  },
  menu: {
    marginRight: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  iconButtonLabel: {
    borderRadius: '5%',
    
    
  },


}));

const Header: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: { currentTarget: any; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.menu}>
            <NavLink to="/">

              <img src={logo} className={classes.logo}/>
            </NavLink>
            <SearchBar />
            <div>

              <Button className={classes.iconButtonLabel} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Hidden smDown>

                  <Typography >{'recommendations'}</Typography>
                </Hidden>

                <RestaurantMenuIcon />
              </Button>
              <Menu 
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

                <MenuItem>Chinese</MenuItem>
                <MenuItem>Japanese</MenuItem>
                <MenuItem>Thai</MenuItem>
                <MenuItem>Indian</MenuItem>
                <MenuItem>Italian</MenuItem>
                <MenuItem>Mexican</MenuItem>

              </Menu>
            </div>
          </div>


          <NavLinks />

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header