import React from 'react'
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import RatingBar from '../../shared/components/UIElements/RatingBar'

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
    flexDirection: 'column' ,
    alignItems: 'center'
  },
  comment: {
    padding: '0 24px'
  }
}));

interface ReviewCardProps {
 review: {
  author: string
  avatar?: string
  rating: number
  created: string
  text: string
  title: string

 }

}


const ReviewCard: React.FC<ReviewCardProps> = (props) => {
  const classes = useStyles()
  const { rating, avatar, author, title, text, created } = props.review
  
    return (
      <div>
        <Divider variant="middle" />
        <div className={classes.review}>
          <div className={classes.user}>
            <Avatar alt='avatar' src={avatar? avatar : "https://images.unsplash.com/photo-1562153889-3847e21e5d3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"} style={{height: 80, width: 80 }}/>
  

            <Typography variant="caption">{author}</Typography>
            <Typography variant="caption">Created: {created}</Typography>
             
          </div>
            

          <div className={classes.comment}>
            <RatingBar rating={rating} readOnly={true}/>
            <Typography variant="h6" style={{ fontWeight: 'normal' }}>{title}</Typography>
            <Typography>{text}</Typography>
            
          </div>

        </div>
      </div>
    );
}
export default ReviewCard