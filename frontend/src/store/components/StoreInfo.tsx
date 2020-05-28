import React from 'react'
import ReviewCard from '../components/ReviewCard'


import Layout from '../../util/Layout'
import { Typography } from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/Whatshot';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import AccessTimeIcon from '@material-ui/icons/AccessTime'


const StyledRating = withStyles({
  iconFilled: {
    color: '#FF351F',
  },
  iconHover: {
    color: '#FC1C04',
  },
  
})(Rating);

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

}

const StoreInfo: React.FC<StoreInfoProps> = ({}) => {
  const classes = useStyles()
    return (
      <Paper variant="outlined" style={{ padding: 12 }}>
        <div>
          <Typography variant="h5">What The Chopsticks</Typography>



          <Box component="fieldset" mb={3} borderColor="transparent" style={{ margin: 0, padding: 0, display:'inline-block' }}>
            <StyledRating
              
              name="customized-color"
              readOnly
              defaultValue={3}
              getLabelText={(value) => `${value} Hot${value !== 1 ? 's' : ''}`}
              precision={0.5}
              icon={<WhatshotIcon fontSize="inherit" />}
            /> 
            
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