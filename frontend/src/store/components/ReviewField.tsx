import React, { useContext, useState } from 'react'
import ReviewCard from './ReviewCard'
import { AuthContext } from '../../shared/context/authContext'

import ReviewModal from './ReviewModal'
import LoginModal from '../../user/components/LoginModal'


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
    author: {
      name: string
      avatar?: string
      _id: string
    }
    rating: number;
    created: string;
    description: string;
    title: string;
    _id: string
  }[]
  storeId: string

  onChange: (store: object) => void
}

const ReviewField: React.FC<ReviewFieldProps> = ({ reviews, storeId,  onChange }) => {

  const classes = useStyles()
  const auth = useContext(AuthContext)
  const [sortBy, setSortBy] = useState('Latest')
  const [currentPage, setCurrentPage] = useState(1)
  
  const pageCount = Math.ceil(reviews.length / 5)
  const indexOfLastTodo = currentPage * 5
  const indexOfFirstTodo = indexOfLastTodo - 5
  const currentTodos = reviews.slice(indexOfFirstTodo, indexOfLastTodo)

  const handleChange = (event: any) => {
    setSortBy(event.target.value);
  };
  const pageChangeHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: number) => {
    setCurrentPage(value)
 }
 
  const reviewList = currentTodos.map(review => {
    return (
      <ReviewCard 
      review={review}
      storeId={storeId} 
      onChange={onChange}
      key={review._id}/>
    )
  })

    return (
      <Paper variant="outlined" className={classes.reviewFieldRoot}>
        <div className={classes.reviewTitle}>

          <Typography variant="h5">Reviews</Typography>

          {auth.isLoggedIn && (
            <ReviewModal 
            buttonText="Write a review"
            storeId={storeId} 
            onChange={onChange}
            />
          )}

          {!auth.isLoggedIn && 
          
            <LoginModal buttonText='Login to review' size='small'/>
          }

          
        </div>

        <div className={classes.searchFieldContainer}>

          <Paper variant="outlined" style={{ width: '50%', height: 28 }}>
            <SearchBar />
          </Paper>

        
        <SortByForm sortBy={sortBy} changeHandler={handleChange}/>
        </div>
        

        {reviews.length===0? <Typography variant="h6" style={{ padding: 12 }}>No reviews yet :(</Typography> : reviewList}
        {/* {reviewList} */}
        <Pagination 
          count={pageCount} 
          shape="rounded" 
          page={currentPage}
          onChange={pageChangeHandler}/>
      </Paper>
    );
}
export default ReviewField