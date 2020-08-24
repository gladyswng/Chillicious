import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../../shared/components/UIElements/Message'
import StoreInfo from '../components/StoreInfo'
import { useHttpClient } from '../../shared/hooks/http-hook'  
import { AuthContext } from '../../shared/context/authContext'


import ReviewField from '../components/ReviewField'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'

// TODO - component share with store card

const useStyles = makeStyles((theme) => ({

  heartIcon: {
    position: 'absolute', 
    top: 100, 
    right: 200, 
    zIndex: 10, 
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#C0C0C0',
    }
  },


}));





interface StoreHeartProps {
  loadedStore: {
    id: string
  },
  hearts: string[]
}

const StoreHeart: React.FC<StoreHeartProps> = ({ loadedStore, hearts }) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()


  const [hearted, setHearted] = useState<boolean>(false)
  const toggleHeart = () => {
    setHearted(!hearted)
  }

  const heartHandler = () => {
    sendRequest(`/api/api/stores/${loadedStore.id}/heart`, 'POST', null,  { 
      Authorization: 'Bearer ' + auth.token,
      'Content-Type': 'application/json'
    })
    toggleHeart()

  }
  // const fetchHearts = useCallback(async() => {
  //   console.log('fetch hearts')
  //   try {
  //     const heartsData = await sendRequest('/api/user/me/hearts', 'GET', null, { 
  //       Authorization: 'Bearer ' + auth.token,
  //       'Content-Type': 'application/json'
  //     })
      
  //     setHearts(heartsData)
  //   } catch (e) {

  //   }
  // }, [])

  useEffect(()=> {
    if (!auth.token) {
      return
    }
   
    if (hearts && hearts.includes(loadedStore.id)) {
      setHearted(true)
    }
  }, [hearts])

    return (
      <IconButton aria-label="add hearts" 
      className={classes.heartIcon}
      onClick={heartHandler}
      >
        <FavoriteIcon color={hearted? "primary" : "inherit"} fontSize="large"/>
      </IconButton>
    );
}
export default StoreHeart
  
  
  



