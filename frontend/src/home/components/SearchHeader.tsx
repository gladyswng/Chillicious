import React from 'react'
import CusineList from '../components/CusineList'
import SearchLocation from './SearchLocation'
// material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import SearchIcon from '@material-ui/icons/Search';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  searchHeader: {
    backgroundImage: `url(https://images.unsplash.com/photo-1484216287461-d8f62bc4d22a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80)`,
    height: 350,
    width: '100%',

  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    width: '98%',
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 36,
    margin: 4,
  },
  container: {
    margin: 'auto',
    paddingTop: '90px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '74%',
    width: '80%',
    overflow: 'hidden'
  },
  searchWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

interface SearchHeaderProps {

}

const SearchHeader: React.FC<SearchHeaderProps> = ({}) => {
  const classes = useStyles();
    return (
      <div className={classes.searchHeader}>
        <div className={classes.container}>
            <div className={classes.searchWrapper}>
              <div style={{display: "flex", alignItems: "baseline"}}>
                <Typography variant="h4" gutterBottom style={{color: "white", marginRight: "5px"}}>
                  Find out what's hot 
                <WhatshotIcon style={{color: "white", marginLeft: 4 }}/>
                </Typography>
                
              </div>

              <SearchLocation />

              {/* <Paper component="form" className={classes.root}>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  className={classes.input}
                  placeholder="Search Google Maps"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={classes.iconButton} aria-label="myLocation">
                  <MyLocationIcon />
                </IconButton>
              </Paper> */}
          </div>
          <div style={{height: "60%", marginTop: "40px", width: "100%"}}>
            <Typography variant="overline" style={{color: "#FFFFFF"}}>
              Recommendations
            </Typography>
            <CusineList />
          </div>
      </div>

    </div>
    );
}
export default SearchHeader