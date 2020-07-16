import React, { useState, useRef, useEffect, useContext } from "react"
import UserProfile from '../components/UserProfile'
import UserReviews from '../components/UserReviews'
import UserStores from '../components/UserStores'
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
  console.log(loadedUser)
  
  useEffect(()=> {
    

    const fetchStore = async () => {
      try {
        const responseData = await sendRequest(`/api/user/me`, 'GET', null , { 
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

  const heartDeleteHandler = (storeId: string) => {
    // TODO - CHANG TYPE ANY 
    setLoadedUser((prevUser: any) => {
      console.log(storeId)
      const user = {...prevUser}
      user.hearts = prevUser.hearts.filter((store: any)=> store.id !== storeId)
      return user
    })
  }
  const storeDeleteHandler = (storeId: string) => {
    // TODO - CHANG TYPE ANY 
    setLoadedUser((prevUser: any) => {
      const user = {...prevUser}
      user.stores = prevUser.stores.filter((store: any)=> store.id !== storeId)
      return user
    })
  }

  const changeReviewHandler = (updatedUser: any) => {
    console.log(updatedUser)
    setLoadedUser(updatedUser)
    
  }
  const onAvatarChange = (userProfile: any) => {
    setLoadedUser((prevUser: any) => {
      const user = {...prevUser}
      user.name = userProfile.name,
      user.avatar = userProfile.avatar
      return user
    })
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
    

        <UserProfile 
        userName={loadedUser.name} 
        email={loadedUser.email} 
        password={loadedUser.password} 
        avatar={loadedUser.avatar}
        avatarChange={onAvatarChange}
        />


      </TabPanel>
      <TabPanel value={tabValue} index={1} id='heartedTab'>
        <UserStores
        heartStores={true}
        storeList={loadedUser.hearts}
        onDelete={heartDeleteHandler}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2} id='reviewsTab'>
        <UserReviews 
        reviews={loadedUser.reviews} 
        onChange={changeReviewHandler} 
        userReview={true}/>
      </TabPanel>
      <TabPanel value={tabValue} index={3} id='storesTab'>
      <UserStores
        storeList={loadedUser.stores}
        onDelete={storeDeleteHandler}
        />
      </TabPanel>
           
      </Paper>
      )}
    </div>
    
    </>
  );
}

export default UserPage








