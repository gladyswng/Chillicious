import React from 'react'
import ReviewCard from './ReviewCard'
import SearchBar from '../../shared/components/UIElements/SearchBar'

import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';

import { fade, makeStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Pagination from '@material-ui/lab/Pagination'

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '4px 12px 4px 6px',
    // padding: '10px 26px 10px 12px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [

      'Arial',
      // 'sans-serif',
    
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      backgroundColor: 'transparent'
    },
  },
}))(InputBase);


const useStyles = makeStyles((theme) => ({
  reviewFieldRoot: { 
    padding: 12, 
    margin: '12px auto',

  },
  reviewTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  
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
    width: '100%'
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
  sortByForm: { 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    height: 28, 
    margin: theme.spacing(1),
  
  },
  searchFieldContainer: { 
    display: 'flex', 
    height: 34, 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop: 30,
    paddingBottom: 10
    
  }
}));

interface ReviewFieldProps {
  reviews: {
    name: string;
    review: string;
    createAt: string;
    rating: number;
    id?: string
  } []
}

const ReviewField: React.FC<ReviewFieldProps> = ({reviews}) => {

  const classes = useStyles()
  const [sortBy, setSortBy] = React.useState('Latest')
  const handleChange = (event: any) => {
    setSortBy(event.target.value);
  };

  const reviewList = reviews.map(review => {
    return (
      <ReviewCard rating={review.rating} key={review.id}/>
    )
  })

    return (
      <Paper variant="outlined" className={classes.reviewFieldRoot}>
        <div className={classes.reviewTitle}>

          <Typography variant="h5">Reviews</Typography>
          <Button variant="contained" color="primary" size="small" >
            <RateReviewIcon style={{ marginRight: 4}}/>
            Write a review
          </Button>
        </div>

        <div className={classes.searchFieldContainer}>

          <Paper variant="outlined" style={{ width: '50%', height: 28 }}>
            <SearchBar />
          </Paper>

        
          <FormControl className={classes.sortByForm}
          >
            <Typography component="span" style={{ paddingRight: 8, fontWeight: 'bold' }}>Sort By</Typography>
            <NativeSelect
              id="demo-customized-select-native"
              value={sortBy}
              onChange={handleChange}

              input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              <option value='Latest'>Latest</option>
              <option value='Oldest'>Oldest</option>
              <option value='Heighest'>Heighest</option>
              <option value='Lowest'>Lowest</option>

            </NativeSelect>
          </FormControl>
        </div>
        


        {reviewList}
        <Pagination count={5} shape="rounded" />
      </Paper>
    );
}
export default ReviewField