import React, { useState, useEffect } from 'react';
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



const FilterList: React.FC<FilterListProps> = ({}) => {
  const classes = useStyles()
  const [checkbox, setCheckbox] = useState({
    extraHot: true,
    hot: true,
    medium: true,
    mild: false,
    cheapEats: true,
    average: true,
    fineDining: true,
    chinese: true,
    indian: true,
    mexican: false,
    korean: false,
    lactoseFree: true,
    vegetarianFriendly: false,
    veganOptions: true,
    glutenFree: false

  });

  const [checkedList, setCheckedList] = useState<any>([])



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
      {filterItem('extraHot')}
      {filterItem('hot')}
      {filterItem('medium')}
      {filterItem('mild')}

      <Divider variant="middle" className={classes.divider}/>

        
      <Typography variant="body1" className={classes.titleFont}>Price</Typography>

      {filterItem('cheapEats')}
      {filterItem('average')}
      {filterItem('fineDining')}

        
      <Divider variant="middle" className={classes.divider}/>

      <Typography variant="body1" className={classes.titleFont}>Category</Typography>

      {filterItem('chinese')}
      {filterItem('indian')}
      {filterItem('mexican')}
      {filterItem('korean')}

      <Divider variant="middle" className={classes.divider}/>  
   
      <Typography variant="body1" className={classes.titleFont}>Dietary Restrictions</Typography>
      {filterItem('lactoseFree')}
      {filterItem('vegetarianFriendly')}
      {filterItem('veganOptions')}
      {filterItem('glutenFree')}
      
  


    </FormGroup>
    </Paper>
    
  );
}
export default FilterList