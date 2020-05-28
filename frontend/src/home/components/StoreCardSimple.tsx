import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: 5
  },
});



interface StoreCardProps {
  storeName: string,
  storeAddress: string
  storeImage: string
}

const StoreCard: React.FC<StoreCardProps> = (props) => {
  const classes = useStyles()


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="180"
          image={props.storeImage}
          title="restaurant"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.storeName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.storeAddress}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
export default StoreCard