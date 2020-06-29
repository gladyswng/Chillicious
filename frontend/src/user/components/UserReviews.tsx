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
  onChange: (store: object) => void
}
 

const UserReviews: React.FC<UserReviewsProps> = ({ reviews, onChange }) => {

  const [currentPage, setCurrentPage] = useState(1)
  
  const pageCount = Math.ceil(reviews.length / 3)
  const indexOfLastTodo = currentPage * 3
  const indexOfFirstTodo = indexOfLastTodo - 3
  const currentTodos = reviews.slice(indexOfFirstTodo, indexOfLastTodo)

  const pageChangeHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: number) => {
    setCurrentPage(value)
 }
  const reviewList = currentTodos.map(review => {
    return (
      <ReviewCard 
      storeName={review.store.name}
      review={review}
      onChange={onChange}
      storeId={review.store.id} 
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