import React, { useState, useContext } from 'react';
import Modal from '../../shared/components/UIElements/Modal'
import { AuthContext } from '../../shared/context/authContext'
import { useHttpClient } from '../../shared/hooks/http-hook' 

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



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
    author: string


  }
}
const StoreItem: React.FC<StoreItemProps> = ({store}) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false);
  // console.log(store.author)
  // console.log(auth.userId)
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    console.log('set false')
    setModalOpen(false);
  };

  const editHandler = (e:any) => {
    e.preventDefault()
    // sendRequest(`http://localhost:3000/store/edit/${id}`, 'GET', null , { 
    //       Authorization: 'Bearer ' + auth.token,
    //       'Content-Type': 'application/json'
    // })
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
            <br />
            {store.priceRange}
            <br />
            {store.tags}

          </Typography>
            
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>

              </div>

        <div hidden={false} className={classes.cardButtons}>

         {store.author === auth.userId &&
        <Button variant="contained" color="primary" onClick={editHandler}>Edit</Button>
        } 

        {store.author === auth.userId && 
        <Modal buttonText='Delete' buttonColor="default" open={modalOpen} onOpen={handleModalOpen} onClose={handleModalClose}>
          <Typography>Are you sure?</Typography>
          <Button onClick={handleModalClose}>Yes</Button>
          <Button onClick={handleModalClose}>Cancel</Button>
        </Modal>
        }
        </div>

      </CardContent>
    </Card>

  )

}
export default StoreItem