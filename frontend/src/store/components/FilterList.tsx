import React, { useState, useEffect } from 'react';
import CheckBox from '../../shared/components/UIElements/CheckBox'


import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    padding: 16

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

}



const FilterList: React.FC<FilterListProps> = ({}) => {
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
    glutenFree: false

  });

  const [checkedList, setCheckedList] = useState<any>([])

  const spiceLevel = [ 'extraHot', 'hot', 'medium', 'mild' ]

  const priceRange = ['cheapEats', 'average', 'fineDining']

  const category = ['chinese', 'indian', 'korean', 'mexican']

  const dietaryRestrictions = ['lactoseFree', 'vegetarianFriendly', 'veganOptions', 'glutenFree']

  const toTitleCase = (phrase: string) => {
    return phrase
      .split(/(?=[A-Z])/)
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }



  const filterItem = (item: keyof typeof checkbox) => {

    return (
      <FormControlLabel
      control={<Checkbox checked={checkbox[item]} onChange={handleChange} 
      color="primary"
      name={item} 
      style={{ padding: "0 10px" }}
      />}
      style={{ width: '100%' }}
      label={<span style={{ fontSize: 15 }}>{toTitleCase(item)}</span>}
    />
    )
  }




  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedList([...checkedList, event.target.name]) 
    } else {
      setCheckedList(checkedList.filter((tag: string) => tag !== event.target.name))
      console.log(checkedList)
    }
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked })
    console.log(event.target.checked, checkedList)
    
  };


  return (
    <Paper variant="outlined">


    <FormGroup className={classes.root}>


    

      <Typography variant="body1" className={classes.titleFont}>Spice Level</Typography>
      {spiceLevel.map((spiciness: keyof IState) => <CheckBox checked={checkbox[spiciness]} item={spiciness} handleChange={handleChange}/>)}

      <Divider variant="middle" className={classes.divider}/>

        
      <Typography variant="body1" className={classes.titleFont}>Price</Typography>

      {priceRange.map((price: keyof IState) => <CheckBox checked={checkbox[price]} item={price} handleChange={handleChange}/>)}

        
      <Divider variant="middle" className={classes.divider}/>

      <Typography variant="body1" className={classes.titleFont}>Category</Typography>

      {category.map((cat: keyof IState) => <CheckBox checked={checkbox[cat]} item={cat} handleChange={handleChange}/>)}

      <Divider variant="middle" className={classes.divider}/>  
   
      <Typography variant="body1" className={classes.titleFont}>Dietary Restrictions</Typography>
      {dietaryRestrictions.map((res: keyof IState) => <CheckBox checked={checkbox[res]} item={res} handleChange={handleChange}/>)}

      
  


    </FormGroup>
    </Paper>
    
  );
}
export default FilterList