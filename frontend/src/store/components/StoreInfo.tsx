import React, { useState, useEffect } from 'react'



import Map from '../../shared/components/UIElements/Map'


import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RatingBar from '../../shared/components/UIElements/RatingBar'
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import RoomIcon from '@material-ui/icons/Room';
// import PhoneIcon from '@material-ui/icons/Phone';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import AccessTimeIcon from '@material-ui/icons/AccessTime'




const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: 6
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  chips: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    
  },
  reviewNumber: {
    fontWeight: 'bold', 
    marginLeft: 6, 
    display: 'inline-block', 
    verticalAlign: 'text-bottom'
  },
  storeInfoContent: {
    padding: 12, 
    height: 250, 
    display: 'flex', 
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      minHeight: 460,
      justifyContent: 'space-between'
    }
    
  },
  wordBreak: {
    wordBreak: 'break-all'
  },
  textSection: {
    width: '60%',
    paddingRight: 10,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  }
}));



interface StoreInfoProps {
  store: {
    id: string;
    name: string;
    description: string;
    rating: number
    priceRange: string
    image?: string;
    address?: string;
    tags?: string[]
    location: {
      coordinates: number[]
    }
    ratingsQuantity: number
    ratingsAverage: number

  }


}

const StoreInfo: React.FC<StoreInfoProps> = (props) => {
  const classes = useStyles()
  const { name, description, ratingsAverage, priceRange, image, address, tags, location, ratingsQuantity } = props.store


  // const [rating, setRating] = useState(ratingsAverage)
  // console.log(rating)

//  useEffect(()=> {
//    setRating(ratingsAverage)
//  }, [ratingsAverage])

  const tagChips = tags.map(tag => {
    return <Chip label={tag} color="primary" key={tag}/>
  })
    return (
      <Paper variant="outlined" className={classes.storeInfoContent}>
        <div className={classes.textSection}>
        <Typography variant="h5" className={classes.wordBreak}>{name}</Typography>
        <Typography className={classes.wordBreak} style={{ maxHeight: 70, overflow: 'scroll'}}>{description}</Typography>


          <Box component="fieldset" mb={3} borderColor="transparent" style={{ margin: 0, padding: 0, display:'inline-block' }}>
           <RatingBar rating={ratingsAverage} readOnly={true} />
           

          <Typography variant="body1" component="span" className={classes.reviewNumber}>{ ratingsQuantity || "0"} {ratingsQuantity>1? 'Reviews' : 'Review'}</Typography>
          </Box>

          <Grid container alignItems="center">

            <Typography>{priceRange}</Typography>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <div className={classes.chips}>
            {tagChips}
            </div>
          </Grid>

          <Typography className={classes.contactInfo}><RoomIcon className={classes.icon}/>{address}</Typography>
        </div>



     
              
          {location.coordinates && <Map center={{ lat: location.coordinates[1], lng: location.coordinates[0]}} zoom={16}/>}

      

        
      </Paper>
    );
}
export default StoreInfo