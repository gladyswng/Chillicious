import React from 'react';
import StoreCardSimple from './StoreCardSimple'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WhatshotIcon from '@material-ui/icons/Whatshot'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  hotBanner: {
    display: 'flex', 
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5
  },
  hotDivider: {
    borderBottom: '1px solid black',
    width: '40%',
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '30%'
    }
  },
  hotTitle: {
    paddingLeft: 10,
    display: 'block',
    width: 120,
    [theme.breakpoints.down('xs')]: {
      width: 400
    }
    
  }


}));

interface TopListProps {
  topList: {
    name: string
    image: string
    address: string
    ratingsAverage: number
    ratingsQuantity: number
    priceRange: string
    tags: string[]
    slug: string

  }[]
}

const TopList: React.FC<TopListProps> = ({ topList }) => {
  const classes = useStyles()

  const storeList = topList.map((store, index) => {
    return (
      <Grid item sm={6} md={3} key={store.slug} style={{ width: '100%' }}>
        <StoreCardSimple store={store}/>

      </Grid>

    )
  })

  
    return (
      <>
      {topList && 
      // <div style={{paddingTop: 30, paddingBottom: 30, width: '80%', height: 'auto' }}> 
      //   <div className={classes.hotBanner}>
      //     <Divider className={classes.hotDivider} />
      //     <Typography variant="h5" className={classes.hotTitle}>
      //       Hot List <WhatshotIcon />
      //     </Typography>
      //     <Divider className={classes.hotDivider}/>

      //   </div>
        <div className={classes.root}>
          <Grid container spacing={4} >
          {storeList}
          </Grid>

        </div>
      // </div>
      }
      </>

      
    );
}
export default TopList