import React, { useState } from 'react'
import StoreCard from './StoreCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination';
import RatingBar from '../../shared/components/UIElements/RatingBar'
import Message from '../../shared/components/UIElements/Message'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress'
import { StepLabel } from '@material-ui/core';


interface StoreListProps {
  storeList: Store[]
  onDelete: (store: string)=> void
}

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
  const [errorMessage, setErrorMessage] = useState<string>()

  const [loading, setLoading] = useState<boolean>()

  const [backdropOpen, setBackdropOpen] = useState(true)
  const handleBackdropClose = () => {
    setBackdropOpen(false)
  }


  if (props.storeList.length === 0) {
    return (
      <Message message="No store found"/>
    )
  }
  const showError = (error: string) => setErrorMessage(error)

  
  const showLoading = (loading: boolean) => setLoading(loading)

 

    return (
      <>
      {errorMessage && (
        <Backdrop open={backdropOpen} className={classes.backdrop} onClick={handleBackdropClose}>
         <Message message={errorMessage}/>
       </Backdrop>
      )}


      {loading && (
        <Backdrop open={backdropOpen}
        className={classes.backdrop}>
         <CircularProgress />
       </Backdrop>
      )}

      <Grid container className={classes.root}>
        <div style={{padding: 0, margin: 0, width: '100%'}}>
          {props.storeList.map((store: Store) => {
            return <StoreCard 
            key={store.id} 
            store={store} 
            onDelete={props.onDelete}
            showError={showError}
            showLoading={showLoading}
            />
          })}
        </div>


        <div className={classes.pagination}>
          <Pagination count={10} shape="rounded" />
         
        </div>

      </Grid>
      </>

    )
}
export default StoreList