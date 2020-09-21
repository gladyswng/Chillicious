import React, { useState, useEffect, useReducer, useCallback } from 'react';
import CheckBox from '../../shared/components/UIElements/CheckBox'


import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    padding: 16,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row'
    }

  },

  divider: {
    margin: '8px 0',
    width: '100%'
  },

  titleFont: {
    fontWeight: 'bold'
  },

  pagination : {
    '& > *': {
      marginTop: theme.spacing(2),
    }
  }
}))

interface FilterListProps {
  onCheckboxChange: (checkboxId: string, checked: boolean) => void 
}


interface IState {
    extraHot: boolean
    hot: boolean
    medium: boolean
    mild: boolean
    cheapEats: boolean
    average: boolean
    fineDining: boolean
    chinese: boolean
    indian: boolean
    mexican: boolean
    korean: boolean
    lactoseFree: boolean
    vegetarianFriendly: boolean
    veganOptions: boolean
    glutenFree: boolean
    meatLover: boolean

}


const FilterList: React.FC<FilterListProps> = ({ onCheckboxChange }) => {
  const classes = useStyles()


  const [checkbox, setCheckbox] = useState<IState>({
    extraHot: false,
    hot: false,
    medium: false,
    mild: false,
    cheapEats: false,
    average: false,
    fineDining: false,
    chinese: false,
    indian: false,
    mexican: false,
    korean: false,
    lactoseFree: false,
    vegetarianFriendly: false,
    veganOptions: false,
    glutenFree: false,
    meatLover: false

  });

  // const [checkedList, setCheckedList] = useState<string[]>([])
  
  // const spiceLevel = [{value:'5', label:'ExtraHot'}, {} ]
  const spiceLevel = [ '5', '4', '3', '2', '1' ]

  const priceRange = ['$', '$$', '$$$', '$$$$']

  const category = ['chinese', 'indian', 'korean', 'mexican', 'other']

  const dietaryRestrictions = ['meatLover', 'lactoseFree', 'vegetarianFriendly', 'veganOptions', 'glutenFree']




  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked })
    onCheckboxChange(event.target.name, event.target.checked)
  }

  return (
    <Paper variant="outlined">


    <FormGroup className={classes.root}>


      <Typography variant="body1" className={classes.titleFont}>Spice Level</Typography>
      {spiceLevel.map((spiciness: keyof IState) => <CheckBox checked={checkbox[spiciness]} item={spiciness} handleChange={handleChange} key={spiciness}/>)}

      <Divider variant="middle" className={classes.divider}/>

        
      <Typography variant="body1" className={classes.titleFont}>Price</Typography>

      {priceRange.map((price: keyof IState) => <CheckBox checked={checkbox[price]} item={price} handleChange={handleChange} key={price}/>)}

    
      <Divider variant="middle" className={classes.divider }/>

      <Typography variant="body1" className={classes.titleFont}>Category</Typography>

      {category.map((cat: keyof IState) => <CheckBox checked={checkbox[cat]} item={cat} handleChange={handleChange} key={cat}/>)}

      <Divider variant="middle" className={classes.divider}/>  
   
      <Typography variant="body1" className={classes.titleFont}>Dietary Restrictions</Typography>
      {dietaryRestrictions.map((res: keyof IState) => <CheckBox checked={checkbox[res]} item={res} handleChange={handleChange} key={res}/>)}

      
  


    </FormGroup>
    </Paper>
    
  );
}
export default FilterList