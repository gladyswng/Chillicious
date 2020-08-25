import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../../shared/components/UIElements/Message'
import StoreInfo from './StoreInfo'
import { useHttpClient } from '../../shared/hooks/http-hook'  
import { AuthContext } from '../../shared/context/authContext'
import { useSnackbar } from 'notistack'

import Hidden from '@material-ui/core/Hidden'
import ReviewField from './ReviewField'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'

// TODO - component share with store card

const useStyles = makeStyles((theme) => ({

  heartButton: {
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#C0C0C0',
    },
    marginBottom: 10
  },
  heartIcon: {
    [theme.breakpoints.down('xs')]: {
      fontSize: "inherit"
    }
  }
  
}));





interface StoreHeartProps {
  storeId: string
  hearts: string[]
  fontSize: "large" | "small" | "inherit" | "default"
  style?: React.CSSProperties
}

const StoreHeart: React.FC<StoreHeartProps> = ({ storeId, hearts, fontSize }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()


  const [hearted, setHearted] = useState<boolean>(false)
  const toggleHeart = () => {
    setHearted(!hearted)
  }

  const heartHandler = () => {
    sendRequest(`/api/api/stores/${storeId}/heart`, 'POST', null,  { 
      Authorization: 'Bearer ' + auth.token,
      'Content-Type': 'application/json'
    })
    toggleHeart()
    enqueueSnackbar(hearted? 'Removed from hearts' : 'Added to hearts')

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
   
    if (hearts && hearts.includes(storeId)) {
      setHearted(true)
    }

  }, [hearts])

  // useEffect(() => {

  //   enqueueSnackbar(hearted? 'Added to hearts' : 'Removed from hearts')
    
  // }, [hearted])

    return (
      <IconButton aria-label="add hearts" 
      // className={fontSize === "large"? classes.heartButton : null}
      className={classes.heartButton}
      onClick={heartHandler}
      >
        <FavoriteIcon color={hearted? "primary" : "inherit"}  className={classes.heartIcon} fontSize={fontSize}/>

      </IconButton>
    );
}
export default StoreHeart
  
  
  



