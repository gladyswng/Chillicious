import React from 'react'
import ReviewCard from './ReviewCard'
import SearchBar from '../../shared/components/UIElements/SearchBar'
import SortByForm from '../../shared/components/UIElements/SortByForm'

import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';

import { fade, makeStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button';

import RateReviewIcon from '@material-ui/icons/RateReview';
import Pagination from '@material-ui/lab/Pagination'





const useStyles = makeStyles((theme) => ({
  reviewFieldRoot: { 
    padding: 12, 
    margin: '12px auto',

  },
  reviewTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  
  },
  searchFieldContainer: { 
    display: 'flex', 
    height: 34, 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop: 30,
    paddingBottom: 10
    
  }
}));

interface ReviewFieldProps {
  reviews: {
    author: string;
    avatar: string;
    rating: number;
    createdAt: string;
    text: string;
    title: string;
    id?: string
  }[]
}

const ReviewField: React.FC<ReviewFieldProps> = ({reviews}) => {

  const classes = useStyles()
  const [sortBy, setSortBy] = React.useState('Latest')
  const handleChange = (event: any) => {
    setSortBy(event.target.value);
  };

  const reviewList = reviews.map(review => {
    return (
      <ReviewCard 
      review={review}
      key={review.id}/>
    )
  })

    return (
      <Paper variant="outlined" className={classes.reviewFieldRoot}>
        <div className={classes.reviewTitle}>

          <Typography variant="h5">Reviews</Typography>
          <Button variant="contained" color="primary" size="small" >
            <RateReviewIcon style={{ marginRight: 4}}/>
            Write a review
          </Button>
        </div>

        <div className={classes.searchFieldContainer}>

          <Paper variant="outlined" style={{ width: '50%', height: 28 }}>
            <SearchBar />
          </Paper>

        
        <SortByForm sortBy={sortBy} changeHandler={handleChange}/>
        </div>
        


        {reviewList}
        <Pagination count={5} shape="rounded" />
      </Paper>
    );
}
export default ReviewField