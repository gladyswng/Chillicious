import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../../shared/components/UIElements/Message'
import StoreInfo from '../components/StoreInfo'
import { useHttpClient } from '../../shared/hooks/http-hook'  
import { AuthContext } from '../../shared/context/authContext'
import HeartButton from '../components/HeartButton'
import ShareButton from '../components/ShareButton'

import ReviewField from '../components/ReviewField'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  image: {
    height: 320, 
    width: '100%', 
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: 200
    },
    borderRadius: 4
  },
  storeContent: {
    marginTop: 20, 
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      marginTop: 10, 
      width: '90%',
    }
  },
  // heartIcon: {
  //   position: 'absolute', 
  //   top: 100, 
  //   right: 200, 
  //   zIndex: 10, 
  //   backgroundColor: '#FFFFFF'
  // }
  shareLikeButtons: {
    position: 'absolute', 
    top: 120, 
    right: 180, 
    zIndex: 10, 
    [theme.breakpoints.down('md')]: {
      top: 120, 
      right: 120,
    },
    [theme.breakpoints.down('xs')]: {
      top: 80, 
      right: 50

    }
  }

}));

interface Review {
  author: {
    name: string
    avatar?: string
    _id: string
  };
  rating: number
  created: string
  description: string
  title: string
  _id: string
}

interface Store {
  id: string
  name: string
  description: string
  rating: number
  priceRange: string
  image?: string
  address?: string
  tags?: string[]
  slug: string
  location: {
      coordinates: number[]
  };
  ratingsQuantity: number
  ratingsAverage: number
  reviews: Review[]
}
interface StoreProps {

}


const Store: React.FC<StoreProps> = ({}) => {
  const classes = useStyles()

  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedStore, setLoadedStore] = useState<Store>()

  const [hearts, setHearts] = useState<string[]>()

  const { slug } = useParams()


  const fetchHearts = useCallback(async() => {
    console.log('fetch hearts')
    try {
      const heartsData = await sendRequest('/api/user/me/hearts', 'GET', null, { 
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'application/json'
      })
      
      setHearts(heartsData)
    } catch (e) {

    }
  }, [auth.token])


  const fetchStore = useCallback(async (mounted) => {
    try {
      if (slug) {

        const store = await sendRequest(`/api/store/${slug}`)
        if (mounted) {
          setLoadedStore(store)
        }
  
      }

  
    } catch (e) {

    }
  }, [slug])


  useEffect(()=> {
    let mounted = true
   
    fetchStore(mounted)
    if (auth.token) {
      fetchHearts()

    }
 
    return () => {
      mounted = false
    }
  }, [fetchStore])
  

  const changeReviewHandler = (store: Store) => {
    setLoadedStore(store)
  }



  // const reviewDeleteHandler = (store: any) => {
  //   setLoadedStore(store)
  // }

  
    return (

      <>
        {error && <Message message={error}/>}   
        {!isLoading && loadedStore && (
        <div className={classes.storeContent}>
          <div style={{width: '100%'}}>
            <img src={loadedStore.image} className={classes.image}/>
            <div className={classes.shareLikeButtons}>

              {hearts && <HeartButton storeId={loadedStore.id} hearts={hearts} fontSize="large"/>}
              <ShareButton storeSlug={loadedStore.slug}/>
            </div>
          </div>    
          
            <StoreInfo store={loadedStore}/>
            
          
       
          <ReviewField 
          reviews={loadedStore.reviews} 
          storeId={loadedStore.id}
          onChange={changeReviewHandler}
          // onReviewDelete={changeReviewHandler}
          />
            
            


    
        </div>
        )}
      </>
  
    )
}

export default Store

