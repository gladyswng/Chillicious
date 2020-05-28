import React from 'react'
import StoreCard from './StoreCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination';
import RatingBar from '../components/RatingBar'

interface StoreListProps {
  storeList: Store[]
}

interface Store {
  id: string,
  name: string,
  description: string,
  image?: string,
  tags: string[],
  location: Object

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
  }
}));

const StoreList: React.FC<StoreListProps> = (props) => {
  const classes = useStyles()


  if (props.storeList.length === 0) {
    return (
      <div>
        <h2>No store found.</h2>
      </div>
    )
  }
    return (
      <Grid container className={classes.root}>
        <div style={{padding: 0, margin: 0, width: '100%'}}>
          {props.storeList.map((store: Store) => {
            return <StoreCard key={store.id} store={store}/>
          })}
        </div>

        <div className={classes.pagination}>
          <Pagination count={10} shape="rounded" />
         
        </div>

      </Grid>
    )
}
export default StoreList