import React, { useState, useContext } from 'react';
import Modal from '../../shared/components/UIElements/Modal'
import { AuthContext } from '../../shared/context/authContext'

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
    location?: Object


  }
}
const StoreItem: React.FC<StoreItemProps> = ({store}) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    console.log('set false')
    setModalOpen(false);
  };

  return (
    <Card className={classes.storeCardRoot} variant="outlined" >
       <CardMedia className={classes.cardMedia}  image={store.image}/>

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

         {auth.isLoggedIn &&
        <Button variant="contained" color="primary">Edit</Button>
        } 

        {auth.isLoggedIn && 
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