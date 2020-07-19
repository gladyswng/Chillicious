import React, { useState, useRef, useEffect, useContext, useCallback } from "react"
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
import { stringify } from "querystring"

interface UserPageProps {

}


interface Store {
  id: string,
  name: string,
  priceRange: string
  description: string,
  image?: string,
  tags: string[],
  address: string
  author: string,
  slug: string
  ratingsQuantity?: number
  ratingsAverage?: number
}

interface Review {
  _id: string
  rating: number
  title: string
  description: string
  store: {
    id: string
    name: string
  }
  author: {
    name: string
    _id: string
  };
  avatar?: string
  created: string
  
}

interface User {
  name: string
  email: string
  avatar: string
  hearts: Store[]
  reviews: Review[]
  stores: Store[]
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
  

  const [loadedUser, setLoadedUser] = useState<User>()
  const [tabValue, setTabValue] = useState<number>(0)
  const [hearts, setHearts] = useState<string[]>()
// TODO - FIX ISSUE WITH NOT UNAUTHORIZED WHEN RELOAD PLUS REDIRECT IF RESTRICT ROUTE
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  console.log(loadedUser)

  const fetchUser = useCallback(async () => {
    try {
      const responseData = await sendRequest(`/api/user/me`, 'GET', null , { 
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'application/json'
      })
      clearError()
      const user = responseData
      const heartList = user.hearts.map((store: Store) => store.id)
      setLoadedUser(user)
      if (heartList) {

        setHearts(heartList)
      }

    } catch (e) {

    }
  }, [auth.token])
  
  useEffect(()=> {
    
    fetchUser()
  }, [fetchUser])

  const handleTabChange = (event: React.ChangeEvent<{}>, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  const heartChangeHandler = (storeId: string) => {

    if (hearts.includes(storeId)) {
      setHearts((prevHearts)=> prevHearts.filter(store => store!== storeId))
    } else {
      setHearts([...hearts, storeId])
    }
  }

  const storeDeleteHandler = (storeId: string) => {
    setLoadedUser((prevUser) => {
      const user = {...prevUser}
      user.stores = prevUser.stores.filter((store: Store)=> store.id !== storeId)
      return user
    })
  }

  const changeReviewHandler = (updatedUser: User) => {
    console.log(updatedUser)
    setLoadedUser(updatedUser)
    
  }
  const onAvatarChange = (userProfile:{name: string, avatar: string, email: string}) => {
    setLoadedUser((prevUser: User) => {
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
        avatar={loadedUser.avatar}
        avatarChange={onAvatarChange}
        />


      </TabPanel>
      <TabPanel value={tabValue} index={1} id='heartedTab'>
        <UserStores
        storeList={loadedUser.hearts}
        hearts={hearts}
        onHeartChange={heartChangeHandler}
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








