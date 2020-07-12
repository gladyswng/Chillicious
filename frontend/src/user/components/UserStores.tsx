import React, { useState, useEffect } from 'react'

import StoreList from '../../store/components/StoreList'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'


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
}

const UserStores: React.FC<UserStoresProps> = ({storeList, onDelete}) => {

const heartedList = storeList.map(store => store.id)
// TODO - REMOVE UNHEARTED STORES AT ONCE??? STATE?
    return (
      <div style={{ padding: 8 , width: '80%'}}>
        <StoreList storeList={storeList} hearts={heartedList} onDelete={onDelete} />
      </div>
    )
}
export default UserStores