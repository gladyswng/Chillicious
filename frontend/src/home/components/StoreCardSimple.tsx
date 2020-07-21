import React from 'react';
import { useHistory } from 'react-router-dom'
import RatingBar from '../../shared/components/UIElements/RatingBar'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    maxWidth: 345,
    height: '100%',
    padding: 5,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%'

    }
  },
  chip: {
    marginRight: 4,
    marginBottom: 4
  }
}))



interface StoreCardProps {
  store: {
    name: string
    image: string
    address: string
    ratingsAverage: number
    priceRange: string
    tags: string[]
    slug: string
  }
}

const StoreCard: React.FC<StoreCardProps> = ({store}) => {
  const classes = useStyles()
  const history = useHistory()
  const storeHandler = async (e: any) => {
    e.preventDefault()
    history.push(`/store/${store.slug}`)
  }

  return (
    <Card className={classes.cardRoot} >
      <CardActionArea onClick={storeHandler}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="180"
          image={`/api/${store.image}`}
          title="restaurant"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {store.name}
          </Typography>
          <RatingBar  readOnly={true} rating={store.ratingsAverage}/>
          <Typography>{store.priceRange}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {store.address}
          </Typography>
        </CardContent>
        
      </CardActionArea>
      {store.tags[0] !== "" &&
        <div style={{ padding: '10px 10px 0 10px' }}>

          {store.tags.map(tag => {
            return <Chip 
            key={tag} label={tag}
            size="small" 
            color="primary" 
            className={classes.chip}
          />
          })}
        </div>
      }
    </Card>
  );
}
export default StoreCard