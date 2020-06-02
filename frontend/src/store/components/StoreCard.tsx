import React from 'react';
import Modal from '../../shared/components/UIElements/Modal'
import LoginModal from '../../user/components/LoginModal'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: '65%',
    display: 'flex',
    marginBottom: 8,
    width: '100%'
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
    description: string,
    image?: string,
    tags: string[],
    location: Object

  }
}
const StoreItem: React.FC<StoreItemProps> = ({store}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined" style={{ }}>
       <CardMedia style={{ height: 200, minWidth: 200 }}  image={store.image}/>

      <CardContent style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <Typography variant="h5" component="h2">
            {store.name}
          </Typography>

          <Typography variant="body2" component="p">
            {store.description}
            <br />
            {store.tags}
          </Typography>
            
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>

              </div>

        <div hidden={false} style={{ display: 'flex', flexDirection: 'column', height: '70%', justifyContent: 'space-between' }}>
          
        <Button variant="contained" color="primary">Edit</Button>

        <Modal buttonText='Delete' buttonColor="default">
          <Typography>Are you sure?</Typography>
          <Button>Yes</Button>
          <Button>Cancel</Button>
        </Modal>
        </div>

      </CardContent>
    </Card>
  // <div>
  //   <div>{store.name}</div>
  //   <div>{store.description}</div>
  //   <img src={store.image} />
  
  // </div>
  
  )

}
export default StoreItem