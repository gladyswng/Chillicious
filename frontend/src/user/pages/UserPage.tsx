import React, { useState, useRef } from "react"
import TabPanel from '../../shared/components/UIElements/TabPanel'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface UserPageProps {

}

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    
    display: 'flex', flexDirection: 'column', 
    alignItems: 'center',
    width: '100%'
    
  }
}))

const UserPage: React.FC<UserPageProps> = ({}) => {

  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);



  const handleChange = (event: any, newTabValue: any) => {
    setTabValue(newTabValue);
  };

  

  return (
    <div className={classes.pageRoot}>
      <Typography variant="h4">User Page</Typography>
      <Paper style={{ marginTop: 40, width: '80%' }}>
   
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="User Profile" id="profile" />
          <Tab label="Hearted" id="hearted" />
          <Tab label="My Reviews" id="reviews" />
          <Tab label="My Stores" id="stores" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        Item 
      </TabPanel>
           
      </Paper>
    </div>
  );
}

export default UserPage








