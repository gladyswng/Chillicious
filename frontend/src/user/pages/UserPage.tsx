import React, { useState, useRef } from "react"
import UserProfile from '../components/UserProfile'
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
    
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    width: '100%'
    
  }
}))

const UserPage: React.FC<UserPageProps> = ({}) => {

  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const user= {
    avatar: 'https://images.unsplash.com/photo-1562153889-3847e21e5d3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    userName: 'chop',
    email: 'HOOOT@mail.com',
    password: 'asdfasdafasd',
    reviews: [
      {
        name: 'qwer',
        rating: '123',
        title: 'aasdf',
        description: 'asdfasd'
      }

    ],
    hearted: [
      {
        name: 'store123',
        rating: '123234234',
        description: 'this sisss sth',
        image : "https://images.unsplash.com/photo-1577859623802-b5e3ca51f885?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        location: {},
        tags: ['asian']

      }
    ]
    

  }
  

  const handleChange = (event: any, newTabValue: any) => {
    setTabValue(newTabValue);
  };

  

  return (
    <div className={classes.pageRoot}>
      <Typography variant="h4">User Page</Typography>
      <Paper style={{ marginTop: 40, width: '80%' }}>
   
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleChange} aria-label="User Info">
          <Tab label="User Profile" id="profile" />
          <Tab label="Hearted" id="hearted" />
          <Tab label="Reviews" id="reviews" />
          <Tab label="Stores" id="stores" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0} id='profileTab'>
    

        <UserProfile userName={user.userName} email={user.email} password={user.password} avatar={user.avatar}/>


      </TabPanel>
      <TabPanel value={tabValue} index={1} id='heartedTab'>
        Item Two
      </TabPanel>
      <TabPanel value={tabValue} index={2} id='reviewsTab'>
        Item Three
      </TabPanel>
      <TabPanel value={tabValue} index={3} id='storesTab'>
        Item 
      </TabPanel>
           
      </Paper>
    </div>
  );
}

export default UserPage








