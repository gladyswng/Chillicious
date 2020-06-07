import React from 'react'
import ReviewCard from '../components/ReviewCard'


import Layout from '../../util/Layout'
import { Typography } from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/Whatshot';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles'
import RatingBar from '../../shared/components/UIElements/RatingBar'
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
  }
}));



interface StoreInfoProps {
  store: {
    id: string;
    name: string;
    description: string;
    rating: number
    image?: string[];
    location?: string;

  }


}

const StoreInfo: React.FC<StoreInfoProps> = (props) => {
  const { name, description, rating, image, location } = props.store
  const classes = useStyles()
    return (
      <Paper variant="outlined" style={{ padding: 12 }}>
        <div>
    <Typography variant="h5">{name}</Typography>



          <Box component="fieldset" mb={3} borderColor="transparent" style={{ margin: 0, padding: 0, display:'inline-block' }}>
           <RatingBar rating={rating} readOnly={true} />
            
            <Typography variant="body1" component="span" style={{ fontWeight: 'bold', marginLeft: 6, display: 'inline-block', verticalAlign: 'text-bottom' }}>50 Reviews</Typography>
          </Box>

          <Grid container alignItems="center">

            <Typography>$$</Typography>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Typography component="span">Asian, Noodle</Typography>
          </Grid>
        </div>

        <div>
          <Typography className={classes.contactInfo}><RoomIcon className={classes.icon}/>Fork 13, Knives 14567, Plates</Typography>

          <Typography className={classes.contactInfo}><PhoneIcon className={classes.icon} />+47 123456789</Typography>
          <Typography className={classes.contactInfo}><LaptopMacIcon className={classes.icon} />www.noooodle.com</Typography>
          <Typography className={classes.contactInfo}><AccessTimeIcon className={classes.icon} />Opening Hours</Typography>

        </div>

        
      </Paper>
    );
}
export default StoreInfo