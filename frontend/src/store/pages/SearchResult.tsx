import React, { useState, useEffect, useContext, useCallback } from 'react'

import StoreList from '../components/StoreList'
import FilterList from '../components/FilterList'
import { AuthContext } from '../../shared/context/authContext'
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
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 
  // TODO - FIX TYPE ANY

  const [loadedStores, setLoadedStores] = useState()
  const [fetchedStores, setFetchedStores] = useState<any>()

  const [checkedList, setCheckedList] = useState([])

  const [hearts, setHearts] = useState()
  console.log(checkedList)
  
  

  useEffect(() => {
    const fetchStores = async() => {
      try { 
        const responseData = await sendRequest('http://localhost:3000/stores')
        setLoadedStores(responseData)
        setFetchedStores(responseData)
      } catch (e) {

      }
    }

    const fetchHearts = async() => {
      try {
        const heartsData = await sendRequest('http://localhost:3000/user/me/hearts', 'GET', null, { 
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
      setLoadedStores(() => fetchedStores.filter((store:any) => checkedList.every(tag => store.tags.includes(tag))))
      // setLoadedStores((prevStores: any) => prevStores.filter((store:any) => store.tags.includes('mexican')))
    } else if (checkedList.length === 0) {
      setLoadedStores(fetchedStores)
    } else {
      return
    }
  }, [checkedList])

  // const queryList = ['tags', 'priceRange', 'ratingsAverage']
  // let updatedStores


  // for (const index in queryList) {
  //   const query :any = queryList[index]

  //   for (const index in prevStores) {
  //     const store : any = prevStores[index]
  //     console.log(store[query])
  //     if (store[query] === undefined ) {
  //     // || checkedList.includes(store[query])
  //     return 
  //   }

  //   updatedStores = prevStores.filter((store: any) => checkedList.includes(store[query]))
  //   console.log(updatedStores)
  // }

  // const test = (query: any) => {
  //   console.log(query)
  //   for (const store in prevStores) {
  //     if (store[query] === undefined ) {
  //     // || checkedList.includes(store[query])
  //     return 
  //   }
  //   updatedStore = prevStores.filter((store: any) => checkedList.includes(store[query]))
  // }

// }
// return updatedStores
  
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

            <div style={{ padding: 8 , width: '80%'}}>
              <StoreList 
              storeList={loadedStores} onDelete={storeDeleteHandler}
              hearts={hearts}
              />
            </div>

          </div>
          )}
        </div>
    
    )
}
export default SearchResult