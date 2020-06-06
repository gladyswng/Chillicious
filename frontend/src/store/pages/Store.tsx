import React from 'react'
import ReviewCard from '../components/ReviewCard'
import StoreInfo from '../components/StoreInfo'

import Layout from '../../util/Layout'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';

import { fade, makeStyles } from '@material-ui/core/styles'

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ReviewField from '../components/ReviewField'




const useStyles = makeStyles((theme) => ({
  image: {
    height: 320, 
    width: '100%', 
    objectFit: 'cover'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



interface StoreProps {

}


const Store: React.FC<StoreProps> = ({}) => {
  const classes = useStyles()
  const store= {
    id: 'asdf',
    name: 'qwer',
    description: 'wasdfa',
    rating: '3',
    image: [] as string[],
    location: '',
    reviews: [
      {
        author: 'user1',
        avatar: 'https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
        text: 'user1asdfasdf',
        id: 'werw',
        createdAt: '123',
        rating: 3,
        title: '21341234'
  
      }, {
        author: 'user2',
        avatar: 'https://images.unsplash.com/photo-1549436906-fef9e7682ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
        id: 'aasdfasdf',
        text: 'user2asdfasdfasdf',
        createdAt: '123',
        rating: 4,
        title: 'qwerqwer'




      }
    ]


  }

  
    return (

        <div style={{ marginTop: 80, width: '80%' }}>
          <div style={{width: '100%'}}>
            <img src='https://images.unsplash.com/photo-1577859623802-b5e3ca51f885?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' className={classes.image}/>
          </div>

        
          
            <StoreInfo />
            
          


          
          <div>
            <ReviewField reviews={store.reviews}/>
            
          </div> 

    
        </div>
  
    )
}

export default Store

