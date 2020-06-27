import React, { useState, useContext, useEffect } from 'react';

import Modal from '../../shared/components/UIElements/Modal'
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


const useStyles = makeStyles({
  storeCardRoot: {
    minWidth: '65%',
    display: 'flex',
    marginBottom: 8,
    width: '100%'
  },
  cardMedia: {
    height: 200, 
    minWidth: 200
  },
  cardContent: {
    display: 'flex', 
    justifyContent: 'space-between', 
    width: '100%'
  },
  cardButtons: {
    display: 'flex', 
    flexDirection: 'column', 
    height: '50%', 
    justifyContent: 'space-between',

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

  }
});


interface StoreItemProps {
  store: {
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
  }, 
  hearts: string[]
  onDelete: (store: string) => void
  sendDeleteRequest: (storeId: string) => void

}
const StoreItem: React.FC<StoreItemProps> = ({store, onDelete, hearts, sendDeleteRequest}) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [modalOpen, setModalOpen] = useState(false)
  const [hearted, setHearted] = useState<boolean>()

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
    sendRequest(`http://localhost:3000/api/stores/${store.id}/heart`, 'POST', null,  { 
      Authorization: 'Bearer ' + auth.token,
      'Content-Type': 'application/json'
    })
    toggleHeart()
    
  }




  const editHandler = async (e:any) => {
    e.preventDefault()
    history.push(`/store/edit/${store.id}`)
  }

  const storeHandler = async (e: any) => {
    e.preventDefault()
    history.push(`/store/${store.slug}`)
  }

  const deleteHander = async (e: any) => {
    try{
      e.preventDefault()
      setModalOpen(false) 
      sendDeleteRequest(store.id)
      onDelete(store.id)
      
    } catch (e) {
      
    }

    } 


  return (
    
    <Card className={classes.storeCardRoot} variant="outlined" >
       <CardMedia className={classes.cardMedia}  image={store.image? store.image : "https://images.unsplash.com/photo-1506368144590-cf6438f1cdb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"}/>

      <CardContent  className={classes.cardContent}>
        <div>
          <Typography variant="h5" component="h2">
            {store.name}
          </Typography>
          <RatingBar rating={store.ratingsAverage} readOnly={true} />
           

          <Typography variant="body2" component="p">
            {store.description}
          </Typography>
          <Typography variant="subtitle1">{store.priceRange}</Typography>
         
          <div>

            {store.tags.map(tag => {
              return <Chip 
              key={tag} label={tag}
              size="small" 
              color="primary" 
              className={classes.chip}/>
            })}
          </div>
            
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

        <div >
          {hearts && 
            <IconButton aria-label="add to hearts"
            onClick={heartHandler}
            >
              
              <FavoriteIcon color={hearted? "primary" : "inherit"}/>
            </IconButton>
          }


          <div className={classes.cardButtons}>

          {store.author === auth.userId &&
            <Button variant="outlined" color="primary" onClick={editHandler}>Edit</Button>
            } 

            {store.author === auth.userId && 
            <Modal buttonStyle='outlined' buttonText='Delete' buttonColor="default" open={modalOpen} onOpen={handleModalOpen} onClose={handleModalClose}>
              <Typography>Are you sure?</Typography>
              <Button onClick={deleteHander}>Yes</Button>
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