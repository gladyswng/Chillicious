import React, { useState, useContext, useEffect } from 'react';

import Modal from '../../shared/components/UIElements/Modal'
import Message from '../../shared/components/UIElements/Message'
import RatingBar from '../../shared/components/UIElements/RatingBar'
import Link from '@material-ui/core/Link'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { AuthContext } from '../../shared/context/authContext'
import { useHistory } from 'react-router-dom'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  storeCardRoot: {
    minWidth: '65%',
    display: 'flex',
    marginBottom: 8,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',

    }
  },
  cardMedia: {
    height: 220, 
    minWidth: 220
  },
   
  cardContent: {
    display: 'flex', 
    justifyContent: 'space-between', 
    width: '100%',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  cardButtons: {
    display: 'flex', 
    flexDirection: 'column', 
    height: '50%', 
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      width: '80%'
    }


  },
  heart: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 250
    }
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {

    marginRight: 4,
    marginBottom: 4

  },
  chipList: {
    width: 300
    // [theme.breakpoints.down('xs')]: {
    //   flexDirection: 'column',
    // }
  },
  reviewNumber: {
    fontWeight: 'bold', 
    marginLeft: 6, 
    display: 'inline-block', 
    verticalAlign: 'text-bottom'
  },
  description: { 
    wordBreak: 'break-all',
    height: 40,
    overflow: 'scroll'
  }
}))

interface Store {
  id: string,
  name: string,
  priceRange: string
  description: string,
  image?: string,
  tags: string[],
  address: string
  author: string,
  slug: string
  ratingsQuantity?: number
  ratingsAverage?: number
}

interface StoreItemProps {
  store: Store, 
  hearts: string[]
  onDelete: (store: string) => void
  onHeartChange?: (storeId: string) => void
  // sendDeleteRequest: (storeId: string) => void

}
const StoreItem: React.FC<StoreItemProps> = ({store, onDelete, hearts, onHeartChange}) => {
  console.log(store)
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [modalOpen, setModalOpen] = useState(false)
  const [hearted, setHearted] = useState<boolean>(false)

  const {isLoading, error, sendRequest, clearError} = useHttpClient() 
  
  useEffect(()=> {
    if (hearts && hearts.includes(store.id)) {
      setHearted(true)
    }

  }, [hearts])

  const handleModalOpen = () => {
    setModalOpen(true);
  }
  const handleModalClose = () => {
    setModalOpen(false);
  }


  const toggleHeart = () => {
    setHearted(!hearted)
  }

  const heartHandler = () => {
    sendRequest(`/api/api/stores/${store.id}/heart`, 'POST', null,  { 
      Authorization: 'Bearer ' + auth.token,
      'Content-Type': 'application/json'
    })
    toggleHeart()
    onHeartChange(store.id)

    
  }


  const editHandler = async (e:any) => {
    e.preventDefault()
    history.push(`/store/edit/${store.id}`)
  }

  const storeHandler = async (e: any) => {
    e.preventDefault()
    history.push(`/store/${store.slug}`)
  }

  const deleteHandler = async (e: any) => {
    try{
      e.preventDefault()
      // setModalOpen(false) 
  
      await sendRequest(`/api/store/${store.id}`, 'DELETE', null , { 
        Authorization: 'Bearer ' + auth.token
      })
      
      // sendDeleteRequest(store.id)
      onDelete(store.id)
      
    } catch (e) {
      
    }

    } 


  return (
    
    <Card className={classes.storeCardRoot} variant="outlined" >
       <CardMedia className={classes.cardMedia}  image={store.image}/>

      <CardContent  className={classes.cardContent}>
        <div style={{ padding: 8 }}>
          <Typography variant="h5" component="h3" style={{ wordBreak: 'break-all' }}>
            {store.name}
          </Typography>

          <Box component="fieldset" mb={3} borderColor="transparent" style={{ margin: 0, padding: 0, display:'inline-block' }}>

            <RatingBar rating={store.ratingsAverage} readOnly={true}/> 
            <Typography variant="body1" component="span" className={classes.reviewNumber}>{ store.ratingsQuantity || "0"} {store.ratingsQuantity>1? 'Reviews' : 'Review'}</Typography>
          </Box>

          <Typography variant="body2" component="p" className={classes.description}>
            {store.description}
          </Typography>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{store.priceRange}</Typography>
          <Typography>{store.address}</Typography>
         
         {store.tags[0] !== "" &&
          <div className={classes.chipList}>

            {store.tags.map(tag => {
              return <Chip 
              key={tag} label={tag}
              size="small" 
              color="primary" 
              className={classes.chip}/>
            })}
          </div>
         }
            
            <Typography>
             <Link 
             onClick={storeHandler}
             color="inherit"
             style={{ cursor: 
             "pointer" }}
             >
             More
             </Link>
            </Typography>
  

        </div>

        <div>
          {hearts && 
            <IconButton aria-label="add to hearts"
            onClick={heartHandler}
            >
              <FavoriteIcon color={hearted? "primary" : "inherit"}/>
            </IconButton>
          }


          <div className={classes.cardButtons}>

          {store.author === auth.userId &&
            <Button variant="outlined" color="primary" onClick={editHandler} style={{ width: 83 }}>Edit</Button>
            } 

            {store.author === auth.userId && 
            <Modal buttonStyle='outlined' buttonText='Delete' buttonColor="default" open={modalOpen} onOpen={handleModalOpen} onClose={handleModalClose}>
              {error && <Message message={error}/>}
              <Typography>Are you sure?</Typography>
              <Button onClick={deleteHandler}>Yes</Button>
              <Button onClick={handleModalClose}>Cancel</Button>
            </Modal>
            }
          </div>
        </div>

      </CardContent>
    </Card>

  )

}
export default StoreItem