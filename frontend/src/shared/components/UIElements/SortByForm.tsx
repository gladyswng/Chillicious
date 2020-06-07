import React from 'react'


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

  sortByForm: { 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    height: 28, 
    margin: theme.spacing(1),
  
  }
}));

interface SortByFormProps {
  sortBy: string
  changeHandler: (event: any) => void
}

const SortByForm: React.FC<SortByFormProps> = ({ sortBy, changeHandler }) => {
  const classes = useStyles()
    return (
      <FormControl className={classes.sortByForm}
          >
        <Typography component="span" style={{ paddingRight: 8, fontWeight: 'bold' }}>Sort By</Typography>
        <NativeSelect
          id="demo-customized-select-native"
          value={sortBy}
          onChange={changeHandler}

          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value='Latest'>Latest</option>
          <option value='Oldest'>Oldest</option>
          <option value='Heighest'>Heighest</option>
          <option value='Lowest'>Lowest</option>

        </NativeSelect>
      </FormControl>
    );
}
export default SortByForm