import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import StoreList from '../components/StoreList'
import FilterList from '../components/FilterList'
import { AuthContext } from '../../shared/context/authContext'
import Message from '../../shared/components/UIElements/Message'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHttpClient } from '../../shared/hooks/http-hook'
import UpdateStore from './UpdateStore'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '80px',
    width: '90%'
  },



}))

interface SearchResultProps {

}

const SearchResult: React.FC<SearchResultProps> = () => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { location } = useParams()
  console.log(location)
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 
  // TODO - FIX TYPE ANY

  const [loadedStores, setLoadedStores] = useState<any>()
  const [fetchedStores, setFetchedStores] = useState<any>()
  const [checkedList, setCheckedList] = useState([])
  const [hearts, setHearts] = useState()

  console.log(checkedList) // 7 times??
  // const getUserLocation = async () => { 
  //   console.log('ran')
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       let geoPoints = [position.coords.longitude, position.coords.latitude, ];
  //       console.log(geoPoints);
  //       return geoPoints
        
  //     })
  //   } else { 
  //     console.log("Geolocation is not supported by this browser.")
  //   }
  // }
      

  useEffect(() => {
    const fetchStores = async() => {
      console.log(location)
      try { 
        const responseData = await sendRequest('/api/stores', 'POST', JSON.stringify({ location }), { 
          'Content-Type': 'application/json'
        })
        setLoadedStores(responseData)
        setFetchedStores(responseData)
      } catch (e) {

      }
    }

    const fetchHearts = async() => {
      try {
        const heartsData = await sendRequest('/api/user/me/hearts', 'GET', null, { 
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        })
        
        setHearts(heartsData)
      } catch (e) {

      }
    }
    fetchStores()
    if (auth.token) {

      fetchHearts() //??? right place to put?
    }
  }, [sendRequest, auth.token])
  // TODO - CHANGE AUTH TOKEN?

  const storeDeleteHandler = (storeId: string) => {
    // TODO - CHANG TYPE ANY 
    setLoadedStores((prevStores: any) => prevStores.filter((store: any)=> store.id !== storeId))
  }
  const checkboxHandler = (checkboxId: string, checked: boolean) => {
 
      if (checked) {
        setCheckedList([...checkedList, checkboxId]) 
      } else {
        setCheckedList(checkedList.filter((tag: string) => tag !== checkboxId))
      }
  
  }
  

  useEffect(() => {

    if (checkedList.length> 0 && fetchedStores) {
      const tags = checkedList.filter(tag => !tag.startsWith('$') && isNaN(tag))
      const levels = checkedList.filter(level => !isNaN(level))
      const prices = checkedList.filter(price => price.startsWith('$'))

      setLoadedStores( fetchedStores.filter((store:any) => tags.every(tag => store.tags.includes(tag)) 
      && (prices.length == 0 || prices.includes(store.priceRange)) 
      && (levels.length == 0 || (store.ratingsAverage 
      && levels.includes(store.ratingsAverage.toString()))))
     )

    } else if (checkedList.length === 0) {
      setLoadedStores(fetchedStores)
    } else {
      return
    }
  }, [checkedList])

  const noStoreMessage = () => {

    if (loadedStores.length === 0 || !loadedStores) {
      return (
        <Message message="No store found"/>
      )
    }
  }
  
  return (
  
        <div className={classes.root}>
          {isLoading && (
          <div>
            <CircularProgress />
          </div>
        )}

            <Typography variant='h4' style={{ textAlign: 'center' }}>Search Results</Typography>

            {!isLoading && loadedStores && (
          <div style={{display: 'flex', 
          justifyContent: 'flex-start', alignItems: 'flex-start'}}>

            <div style={{ padding: 8, width: '20%' }}>
              <FilterList onCheckboxChange={checkboxHandler}/>

            </div>
            {error && <Message message={error}/>}
            {noStoreMessage()}
              {loadedStores.length>0 &&
              <div style={{ padding: 8 , width: '80%'}}>
                <StoreList 
                storeList={loadedStores} onDelete={storeDeleteHandler}
                hearts={hearts}
                />
              </div>
              }

          </div>
          )}
        </div>
    
    )
}
export default SearchResult