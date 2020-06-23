import React, { useState, useContext } from 'react';
import Modal from '../../shared/components/UIElements/Modal'

import Link from '@material-ui/core/Link'
import { AuthContext } from '../../shared/context/authContext'

import { useHistory } from 'react-router-dom'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
    height: '70%', justifyContent: 'space-between'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {

    marginRight: 4,

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
    location?: Object,
    author: string,
    slug: string


  }, 
  onDelete: (store: string) => void
  sendDeleteRequest: (storeId: string) => void

}
const StoreItem: React.FC<StoreItemProps> = ({store, onDelete, sendDeleteRequest }) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [modalOpen, setModalOpen] = useState(false)
  
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

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

        <div hidden={false} className={classes.cardButtons}>

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

      </CardContent>
    </Card>

  )

}
export default StoreItem