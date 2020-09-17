import React, { useState, useEffect, useContext, useCallback, useReducer } from 'react'
import { useParams } from 'react-router-dom'

import StoreList from '../components/StoreList'
import FilterList from '../components/FilterList'
import Map from '../../shared/components/UIElements/Map'
import { AuthContext } from '../../shared/context/authContext'
import Message from '../../shared/components/UIElements/Message'
import { useHttpClient } from '../../shared/hooks/http-hook'
import MapModal from '../components/MapModal'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '80px',
    width: '90%'
  },
  storePageContent : {
    display: 'flex', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems:'center'

    }
  },
  filterList: {
    padding: 8, 
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'

    }
  },
  storeList: {
    padding: 8 , 
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'

    }
  }



}))

interface Store {
  id: string
  name: string
  description: string
  image: string
  tags: string[]
  priceRange: string
  address: string
  author: string
  slug: string
  location: {
    coordinates: [number, number]
  }
  ratingsQuantity: number
  ratingsAverage: number
}

interface SearchResultProps {

}

const SearchResult: React.FC<SearchResultProps> = () => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { location }: any = useParams()
  console.log(location)
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 
 
  const [loadedStores, setLoadedStores] = useState<Store[]>()
  const [fetchedStores, setFetchedStores] = useState<Store[]>()
  const [searchCoordinates, setSearchCoordinates] = useState<[number, number]>()
  const [checkedList, setCheckedList] = useState([])
  const [hearts, setHearts] = useState<string[]>()

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
  

  const fetchStores = useCallback(async() => {
     try { 
    
       const responseData = await sendRequest('/api/stores', 'POST', JSON.stringify({ location }), { 
         'Content-Type': 'application/json'
       })
       const { stores, searchCoordinates } = responseData
       setFetchedStores(stores)
       setLoadedStores(stores)
       
       setSearchCoordinates(searchCoordinates)
     } catch (e) {
      
     }
  }, [])

      
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

  
  useEffect(() => {
    if (location) {
    fetchStores()
    }
    if (auth.token) {

      fetchHearts() //??? right place to put?
    }
  }, [fetchStores, fetchHearts, auth.token, location])
  // TODO - CHANGE AUTH TOKEN?

  const storeDeleteHandler = (storeId: string) => {
    setLoadedStores((prevStores) => prevStores.filter((store: Store)=> store.id !== storeId))
  }


  const heartChangeHandler = (storeId: string) => {

    if (hearts.includes(storeId)) {
      setHearts((prevHearts)=> prevHearts.filter(store => store!== storeId))
    } else {
      setHearts([...hearts, storeId])
    }
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

      setLoadedStores( fetchedStores.filter((store) => tags.every(tag => store.tags.includes(tag)) 
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

        {error && !loadedStores && <Message message={error}/>}
        {searchCoordinates && 
        <MapModal 
          searchCoordinates={searchCoordinates}
          loadedStores={loadedStores}
          wholeScreenModal
        />
    
        // <Map 
        //   center={{ lat: searchCoordinates[1], lng: searchCoordinates[0]}} 
        //   zoom={12}
        //   pin='multiple'
        //   style={{ width: '100%', height: 300 }}
        //   storeList={loadedStores}
        //   />
        }
        {location && !isLoading && loadedStores &&  (
      <div className={classes.storePageContent}>


        <div className={classes.filterList}>
        <Hidden smUp>
        <Accordion style={{ boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="filter"
            id="filter"
          >
            <Typography variant="button">Filter</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FilterList onCheckboxChange={checkboxHandler}/>
          </AccordionDetails>
        </Accordion>
        
        </Hidden>
        <Hidden xsDown>

        <FilterList onCheckboxChange={checkboxHandler}/>
        </Hidden>
        



        </div>

        
          <div className={classes.storeList}>
          {error && loadedStores &&<Message message={error}/>}
          
          {noStoreMessage()}  
            {loadedStores.length>0 &&
            <StoreList 
            storeList={loadedStores} 
            onDelete={storeDeleteHandler}
            onHeartChange={heartChangeHandler}
            hearts={hearts}
            />
            }
          </div>

      </div>
      )}
    </div>
    
  )
}
export default SearchResult