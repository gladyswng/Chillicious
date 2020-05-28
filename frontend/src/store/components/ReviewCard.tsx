import React from 'react'
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import RatingBar from './RatingBar'

const useStyles = makeStyles((theme) => ({
  box: { 
    margin: 0, padding: 0, display:'inline-block' 
  },

  review : {
    padding: 12, 
    display: 'flex'
  },
  user: {
    display: 'flex', 
    flexDirection: 'column' 
  },
  comment: {
    padding: '0 24px'
  }
}));

interface ReviewCardProps {
  rating?: number

}


const ReviewCard: React.FC<ReviewCardProps> = ({ rating }) => {
  const classes = useStyles()
    return (
      <div>
        <Divider variant="middle" />
        <div className={classes.review}>
          <div className={classes.user}>

            <img src='https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1690&q=80' style={{height: 80, width: 80, borderRadius: '50%'}}/>

            <Typography variant="caption">HeresMyName</Typography>
            <Typography variant="caption">4 reviews</Typography>
             
          </div>
            

          <div className={classes.comment}>
            <RatingBar rating={rating}/>
            <Typography variant="h6" style={{ fontWeight: 'normal' }}>Titleee</Typography>
            <Typography>Just some description about the food and spiciness</Typography>
            
          </div>

        </div>
      </div>
    );
}
export default ReviewCard