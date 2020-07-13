import React, { useState, useEffect } from 'react'

import StoreList from '../../store/components/StoreList'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Message from '../../shared/components/UIElements/Message'

interface Store {
  id: string
  name: string
  description: string
  image?: string
  tags: string[]
  priceRange: string
  address: string
  author: string
  slug: string
  ratingsQuantity?: number;
  ratingsAverage?: number;

}

interface UserStoresProps {
  storeList: Store[]
  onDelete: (store: string)=> void
  heartStores?: boolean
}


const UserStores: React.FC<UserStoresProps> = ({storeList, onDelete, heartStores }) => {
// TODO - REMOVE UNHEARTED STORES AT ONCE??? STATE?
console.log(storeList)
  let heartedList 
  if (heartStores) {
    heartedList = storeList.map(store => store.id)
  }

  if (!storeList || storeList.length === 0) {
    return (
      <Message message='No store found'/>
    )
  }
  return (

      <div style={{ padding: 8 , width: '80%'}}>

        {storeList &&
          <StoreList storeList={storeList} onDelete={onDelete} hearts={heartedList}/>}
      </div>

  )
}
export default UserStores