import React, { useState, useEffect } from 'react'

import StoreList from '../components/StoreList'
import FilterList from '../components/FilterList'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHttpClient } from '../../shared/hooks/http-hook'

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

  const {isLoading, error, sendRequest, clearError} = useHttpClient() 

  const [loadedStores, setLoadedStores] = useState()
  
  useEffect(() => {
    const fetchStores = async() => {
      try { 
        const responseData = await sendRequest('http://localhost:3000/stores')
      
        setLoadedStores(responseData)
      } catch (e) {

      }
    }
    fetchStores()
  }, [sendRequest])

  const storeDeleteHandler = (storeId: string) => {
    // TODO - CHANG TYPE ANY 
    setLoadedStores((prevStores: any) => prevStores.filter((store: any)=> store.id !== storeId))
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
              <FilterList />

            </div>

            <div style={{ padding: 8 , width: '80%'}}>
              <StoreList storeList={loadedStores} onDelete={storeDeleteHandler}/>
            </div>

          </div>
          )}
        </div>
    
    )
}
export default SearchResult