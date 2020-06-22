import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../../shared/components/UIElements/Message'
import StoreInfo from '../components/StoreInfo'
import { useHttpClient } from '../../shared/hooks/http-hook'  


import { makeStyles } from '@material-ui/core/styles'

import ReviewField from '../components/ReviewField'
import { Typography } from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
  image: {
    height: 320, 
    width: '100%', 
    objectFit: 'cover'
  }

}));



interface StoreProps {

}


const Store: React.FC<StoreProps> = ({}) => {
  const classes = useStyles()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedStore, setLoadedStore] = useState<any>()
  const { slug } = useParams()


  useEffect(()=> {
    const fetchStore = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:3000/store/${slug}`)
  
        const store = responseData

        setLoadedStore(store)
      } catch (e) {

      }
    }
    fetchStore()
  }, [ sendRequest, slug])
  // TODO - CHANGE TYPE
  const changeReviewHandler = (store: any) => {
    setLoadedStore(store)
  }
  
    return (

      <>
        {error && <Message message={error}/>}   
        {!isLoading && loadedStore && (
          <div style={{ marginTop: 80, width: '80%' }}>
          <div style={{width: '100%'}}>
            <img src='https://images.unsplash.com/photo-1577859623802-b5e3ca51f885?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' className={classes.image}/>
          </div>    
            <StoreInfo store={loadedStore}/>
            
          
       
          <ReviewField 
          reviews={loadedStore.reviews} 
          storeId={loadedStore.id}
          onChange={changeReviewHandler}
        
          />
            
            


    
        </div>
        )}
      </>
  
    )
}

export default Store

