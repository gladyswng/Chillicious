import React, { useContext, useState } from 'react'
import ReviewCard from '../../store/components/ReviewCard'


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
  console.log(reviews)
  const reviewList = reviews.map(review => {
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
      </>
    );
}
export default UserReviews