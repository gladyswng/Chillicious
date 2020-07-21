import React from 'react';
import StoreCardSimple from './StoreCardSimple'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WhatshotIcon from '@material-ui/icons/Whatshot'
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }

}));

interface TopListProps {
  topList: {
    name: string
    image: string
    address: string
    ratingsAverage: number
    priceRange: string
    tags: string[]
    slug: string
  }[]
}

const TopList: React.FC<TopListProps> = ({ topList }) => {
  const classes = useStyles()

  const storeList = topList.map((store, index) => {
    return (
      <Grid item sm={6} md={3} key={index} style={{ width: '100%' }}>
        <StoreCardSimple store={store}/>

      </Grid>

    )
  })

  
    return (
      <>
      {topList && 
      <div style={{paddingTop: 30, paddingBottom: 30, width: '80%', height: 'auto' }}> 
          <Typography variant="h5" >
            Hot List <WhatshotIcon />
          </Typography>
        <div className={classes.root}>
          <Grid container spacing={4} >
          {storeList}
          </Grid>

        </div>
      </div>}
      </>

      
    );
}
export default TopList