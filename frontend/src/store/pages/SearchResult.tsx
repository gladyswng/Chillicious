import React from 'react'

import StoreList from '../components/StoreList'
import FilterList from '../components/FilterList'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '80px',
    width: '90%'
  },



}))

interface SearchResultProps {

}




const SearchResult: React.FC<SearchResultProps> = () => {
  const classes = useStyles()
  const storeList = [
    {
      id: "store1",
      name: "foodiee",
      description: "description1",
      priceRange: '$$$',
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=60",
      location: 'asdfasdf',
      
      tags: ['asian']
    },
    {
      id: "store2",
      name: "Just some food",
      description: "description2",
      image : "https://images.unsplash.com/photo-1577859623802-b5e3ca51f885?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      priceRange: '$$',
      location: 'asdfas',
      tags: ['asian']
    },
    {
      id: "store3",
      name: "Long Noooooodle",
      description: "description2",
      priceRange: '$$$',
      image : "https://images.unsplash.com/photo-1580212206172-dbea2d1b64dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      location: 'asdfa',
      tags: ['asian', '']
    }
  ]
  
    return (
  
        <div className={classes.root}>

            <Typography variant='h4' style={{ textAlign: 'center' }}>Search Results</Typography>

          <div style={{display: 'flex', 
          justifyContent: 'flex-start', alignItems: 'flex-start'}}>


            <div style={{ padding: 8, width: '20%' }}>
              <FilterList />

            </div>

            <div style={{ padding: 8 , width: '80%'}}>
              <StoreList storeList={storeList} />
            </div>

          </div>
        </div>
    
    )
}
export default SearchResult