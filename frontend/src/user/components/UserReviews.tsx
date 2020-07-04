import React, { useContext, useState } from 'react'
import ReviewCard from '../../store/components/ReviewCard'
import Pagination from '@material-ui/lab/Pagination'

interface UserReviewsProps {
  reviews: {
    _id: string
    rating: number
    title: string
    description: string
    store: {
      id: string
      name: string
    }
    author: {
      name: string
      _id: string
    };
    avatar?: string
    created: string
    

  }[]
  userReview: boolean
  onChange: (store: object) => void
}
 

const UserReviews: React.FC<UserReviewsProps> = ({ reviews, onChange, userReview }) => {

  const [currentPage, setCurrentPage] = useState(1)
  
  const pageCount = Math.ceil(reviews.length / 5)
  const indexOfLastTodo = currentPage * 5
  const indexOfFirstTodo = indexOfLastTodo - 5
  const currentTodos = reviews.slice(indexOfFirstTodo, indexOfLastTodo)
  
  const pageChangeHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: number) => {
    setCurrentPage(value)
 }
  const reviewList = currentTodos.map(review => {
    if (review.store=== null) {
      return 
    }
    return (
      <ReviewCard 
      storeName={review.store.name}
      review={review}
      onChange={onChange}
      storeId={review.store.id} 
      userReview={userReview}
      key={review._id}/>
    )
  })
  
    return (
      <>
      {reviews && reviewList}
      <Pagination 
          count={pageCount} 
          shape="rounded" 
          page={currentPage}
          onChange={pageChangeHandler}/>
      </>
    );
}
export default UserReviews