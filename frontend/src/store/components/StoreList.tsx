import React, { useState, useContext, useEffect } from 'react'
import StoreCard from './StoreCard'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/authContext'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination';
import RatingBar from '../../shared/components/UIElements/RatingBar'
import Message from '../../shared/components/UIElements/Message'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress'
import { StepLabel } from '@material-ui/core';

interface Store {
  id: string
  name: string
  description: string
  image?: string
  tags: string[]
  priceRange: string
  address: string
  author: string
  slug: string
  ratingsQuantity?: number;
  ratingsAverage?: number;

}

interface StoreListProps {
  storeList: Store[]
  hearts?: string[]
  onDelete: (store: string)=> void

}



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  pagination : {
    '& > *': {
      marginTop: theme.spacing(2),
    }
  },
  backdrop: {
    zIndex: 2000,
    color: "#fff"
  }
}));

const StoreList: React.FC<StoreListProps> = (props) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  
  const [backdropOpen, setBackdropOpen] = useState(true)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  
  if (!props.storeList || props.storeList.length === 0 ) {
    return (
      <Message message='No store found'/>
    )
  }
  
  const handleBackdropClose = () => {
    setBackdropOpen(false)
  }


  const pageCount = Math.ceil(props.storeList.length / 5)
  const indexOfLastStore = currentPage * 5
  const indexOfFirstStore = indexOfLastStore - 5
  const currentStores = props.storeList.slice(indexOfFirstStore, indexOfLastStore)

  const pageChangeHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: number) => {
    setCurrentPage(value)

 }


  useEffect(() => {
  
      if (props.storeList) {

        setCurrentPage(1)
    
      }
  }, [props.storeList])

  const sendDeleteRequestHandler = async (storeId: string) => {
    await sendRequest(`/api/store/${storeId}`, 'DELETE', null , { 
      Authorization: 'Bearer ' + auth.token
    })

  }


 

    return (
      <>
      {error && (
        <Backdrop open={backdropOpen} className={classes.backdrop} onClick={handleBackdropClose}>
         <Message message={error}/>
       </Backdrop>
      )}


      {isLoading && (
        <Backdrop open={backdropOpen}
        className={classes.backdrop}>
         <CircularProgress />
       </Backdrop>
      )}

  
      <Grid container className={classes.root}>
        {currentStores && 
        <div style={{padding: 0, margin: 0, width: '100%'}}>
          {currentStores.map((store: Store) => {
            return <StoreCard 
            key={store.id} 
            store={store} 
            hearts={props.hearts}
            onDelete={props.onDelete}
            sendDeleteRequest={sendDeleteRequestHandler}
 
            />
          })}
        </div>}


        <div className={classes.pagination}>
          <Pagination 
          count={pageCount} 
          shape="rounded" 
          page={currentPage}
          onChange={pageChangeHandler}/>
         
        </div>

      </Grid>
 
      </>

    )
}
export default StoreList