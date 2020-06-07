import React from 'react'
import ReviewCard from '../components/ReviewCard'


import Layout from '../../util/Layout'
import { Typography } from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/Whatshot';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles'
import RatingBar from '../../shared/components/UIElements/RatingBar'
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import AccessTimeIcon from '@material-ui/icons/AccessTime'



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
  }
}));



interface StoreInfoProps {
  store: {
    id: string;
    name: string;
    description: string;
    rating: number
    priceRange: string
    image?: string[];
    address?: string;
    tags?: string[]

  }


}

const StoreInfo: React.FC<StoreInfoProps> = (props) => {
  const { name, description, rating, priceRange, image, address, tags } = props.store
  const classes = useStyles()

  const tagChips = tags.map(tag => {
    return <Chip label={tag} color="primary" />
  })
    return (
      <Paper variant="outlined" style={{ padding: 12 }}>
        <div>
        <Typography variant="h5">{name}</Typography>
        <Typography >{description}</Typography>



          <Box component="fieldset" mb={3} borderColor="transparent" style={{ margin: 0, padding: 0, display:'inline-block' }}>
           <RatingBar rating={rating} readOnly={true} />
            
            <Typography variant="body1" component="span" className={classes.reviewNumber}>50 Reviews</Typography>
          </Box>

          <Grid container alignItems="center">

            <Typography>{priceRange}</Typography>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <div className={classes.chips}>
            {tagChips}
            </div>
          </Grid>
        </div>

        <div>
          <Typography className={classes.contactInfo}><RoomIcon className={classes.icon}/>{address}</Typography>
        </div>

        
      </Paper>
    );
}
export default StoreInfo