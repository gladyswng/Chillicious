import React from 'react';
import StoreCardSimple from './StoreCardSimple'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }

}));

interface RecentReviewedProps {
 
}

const RecentReviewed: React.FC<RecentReviewedProps> = () => {
  const classes = useStyles()
  const stores = [
    {
      name: 'Chinese',
      address: 'tofuuu 123',
      image: 'https://images.unsplash.com/photo-1564869733874-7c154d5de210?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80'
    },
    {
      name: 'Thai',
      address: 'padtai426',
      image: 'https://images.unsplash.com/photo-1562565651-7d4948f339eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80'
    }, {
      name: 'Indian',
      address: 'curry456',
      image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1545&q=80'
    }, {
      name: 'Mexican',
      address: 'taco756',
      image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    }

  ]

  const storeList = stores.map((store, index) => {
    return (
      <Grid item sm={6} md={3} key={index}>
        <StoreCardSimple 
        storeName={store.name} storeAddress={store.address}
        storeImage={store.image} 
        
         
        />

      </Grid>

    )
  })

  
    return (
      <div style={{paddingTop: '30px', width: '80%'}}> 
          <Typography variant="h6">
            Recently Reviewed
          </Typography>
        <div className={classes.root}>
          <Grid container spacing={4}>
          {storeList}
          </Grid>

        </div>
      </div>

      
    );
}
export default RecentReviewed