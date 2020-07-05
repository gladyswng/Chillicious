import React, { useState, useRef, useEffect, useContext } from "react"
import UserProfile from '../components/UserProfile'
import UserReviews from '../components/UserReviews'
import Hearted from '../components/Hearted'
import Message from '../../shared/components/UIElements/Message'
import { AuthContext } from '../../shared/context/authContext'
import { useHttpClient } from '../../shared/hooks/http-hook'  
import TabPanel from '../../shared/components/UIElements/TabPanel'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress'
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

  const classes = useStyles()
  const auth = useContext(AuthContext)
  // TODO - CHANGE ANY

  const [loadedUser, setLoadedUser] = useState<any>()
  const [tabValue, setTabValue] = useState(0)
// TODO - FIX ISSUE WITH NOT UNAUTHORIZED WHEN RELOAD PLUS REDIRECT IF RESTRICT ROUTE
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(()=> {
    

    const fetchStore = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:3000/user/me`, 'GET', null , { 
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        })
        clearError()
        const user = responseData

        setLoadedUser(user)

      } catch (e) {

      }
    }
    
    fetchStore()
  }, [ sendRequest, auth.token ])

  const handleTabChange = (event: any, newTabValue: any) => {
    setTabValue(newTabValue);
  };

  const storeDeleteHandler = (storeId: string) => {
    // TODO - CHANG TYPE ANY 
    setLoadedUser((prevUser: any) => prevUser.hearts.filter((store: any)=> store.id !== storeId))
  }

  const changeReviewHandler = (updateReview: any) => {

    setLoadedUser((prevUser: any) => {
      const user = {...prevUser}
     const reviewIndex = user.reviews.findIndex((review: any) => review._id === updateReview._id)
     user.reviews[reviewIndex] = updateReview
     
      return user
    })
    
  }

  const deleteReviewHandler =(deletedReview: any) => {
    setLoadedUser((prevUser: any) => prevUser.reviews.filter((review: any) => review._id === deletedReview._id))
  }

  return (
    <>
   
    <div className={classes.pageRoot}>
      <Typography variant="h4">User Page</Typography>
      {isLoading && (
          <div>
            <CircularProgress />
          </div>

      )}
      {error && <Message message={error}/>}
      {!isLoading && loadedUser && auth.token && (
      <Paper style={{ marginTop: 40, width: '80%' }}>
   
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="User Info">
          <Tab label="User Profile" id="profile" />
          <Tab label="Hearted" id="hearted" />
          <Tab label="Reviews" id="reviews" />
          <Tab label="Stores" id="stores" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0} id='profileTab'>
    

        <UserProfile userName={loadedUser.name} email={loadedUser.email} password={loadedUser.password} avatar={loadedUser.avatar}/>


      </TabPanel>
      <TabPanel value={tabValue} index={1} id='heartedTab'>
        <Hearted 
        storeList={loadedUser.hearts}
        onDelete={storeDeleteHandler}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2} id='reviewsTab'>
        <UserReviews 
        reviews={loadedUser.reviews} 
        onChange={changeReviewHandler} 
        onDelete={deleteReviewHandler}
        userReview={true}/>
      </TabPanel>
      <TabPanel value={tabValue} index={3} id='storesTab'>
        Item 
      </TabPanel>
           
      </Paper>
      )}
    </div>
    
    </>
  );
}

export default UserPage








