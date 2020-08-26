import React, { useContext, useState, useEffect } from 'react'
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
    paddingBottom: 10
  
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

interface IReview {
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
}

interface ReviewFieldProps {
  reviews: IReview[]
  storeId: string

  onChange: (store: object) => void
  // onReviewDelete?: (review: object) => void
}

const ReviewField: React.FC<ReviewFieldProps> = ({ reviews, storeId, onChange }) => {

  const classes = useStyles()
  const auth = useContext(AuthContext)
  const [sortBy, setSortBy] = useState()
  // TODO - set hook
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewList, setReviewList] = useState(reviews)

  const pageCount = Math.ceil(reviews.length / 5)
  const indexOfLastTodo = currentPage * 5
  const indexOfFirstTodo = indexOfLastTodo - 5

  const currentTodos = reviewList.slice(indexOfFirstTodo, indexOfLastTodo)

  // useEffect(() => {
  //   setReviewList(reviews)
  

  // }, [reviews])

  const handleSortChange = (event: any) => {
    const value = event.target.value
    setSortBy(value)
    switch(value) {
      case 'Latest': 
        setReviewList(reviews.sort((a, b) => a.created > b.created ? -1: 1))
        break
      case 'Oldest': 
        setReviewList(reviews.sort((a, b) => a.created < b.created ? -1: 1))
        break
      case 'Heighest':
        setReviewList(reviews.sort((a, b) => a.rating > b.rating ? -1: 1))
        break
      case 'Lowest':
      setReviewList(reviews.sort((a, b) => a.rating < b.rating ? -1: 1))
    }
  }

  const pageChangeHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: number) => {
    setCurrentPage(value)
 }
 
  const reviewCardList = currentTodos.map(review => {
    return (
      <ReviewCard 
      review={review}
      storeId={storeId} 
      // onReviewDelete={onReviewDelete}
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
            <div style={{ paddingBottom: 10 }}>

              <LoginModal buttonText='Login to review' size='small'/>
            </div>
          }

          
        </div>

        {/* <div className={classes.searchFieldContainer}>

          <Paper variant="outlined" style={{ width: '50%', height: 28 }}>
            <SearchBar />
          </Paper> */}

        
        <SortByForm sortBy={sortBy} changeHandler={handleSortChange}/>
        {/* </div> */}
        

        {reviews.length===0? <Typography variant="h6" style={{ padding: 12 }}>No reviews yet :(</Typography> : reviewCardList}
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