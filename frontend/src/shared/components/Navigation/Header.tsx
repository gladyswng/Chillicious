import React from 'react';
import { NavLink } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden';
import SearchBar from '../UIElements/SearchBar'
import NavLinks from './NavLinks'
import StoreSearchBar from './StoreSearchBar'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHttpClient } from '../../../shared/hooks/http-hook'

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
    width: 120,
    height: 60,
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      width: 90,
      height: 45
    }
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
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 
  const handleClick = (event: { currentTarget: any; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const searchInputChangeHandler = async (event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //   console.log(event.target.value)
  //   try {
  //     const storeList = await sendRequest('/api/search', 'POST', JSON.stringify({
  //       query: event.target.value
  //     }), { 
    
  //       'Content-Type': 'application/json'
  //     })
  //     const storeNameList = storeList.map((store:any) => store.name)
  //     console.log(storeNameList)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.menu}>
            <NavLink to="/">

              <img src={logo} className={classes.logo}/>
            </NavLink>
            <StoreSearchBar />
            {/* <SearchBar onChange={searchInputChangeHandler}/> */}

            {/* <div>

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

              </Menu>
            </div> */}
          </div>


          <NavLinks />

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header