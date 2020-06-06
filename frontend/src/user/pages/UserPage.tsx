import React, { useState, useRef } from "react"
import TabPanel from '../../shared/components/UIElements/TabPanel'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface UserPageProps {

}

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    
    display: 'flex', flexDirection: 'column', 
    alignItems: 'center',
    
  }
}))

const UserPage: React.FC<UserPageProps> = ({}) => {

  const classes = useStyles();
  const [value, setValue] = useState(0);



  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  

  return (
    <div className={classes.pageRoot}>
      <Typography variant="h4">User Page</Typography>
      <div style={{ marginTop: 40 }}>
   
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
           
      </div>
    </div>
  );
}

export default UserPage








