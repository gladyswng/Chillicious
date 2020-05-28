import React, { useState } from 'react'
import RadioButton from '../../shared/components/UIElements/RadioButton'
import CheckBox from '../../shared/components/UIElements/CheckBox'


import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '../../shared/components/UIElements/Input'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';


import { VALIDATOR_REQUIRE } from '../../util/validators'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(2),
        width: '100%',

      },
      display: 'flex',
      justifyContent: 'center',
    },

    tagsRoot: {
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
  

}));

interface StoreFormProps {

}

interface IState {

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
const StoreForm: React.FC<StoreFormProps> = ({}) => {
  const classes = useStyles()
  
  const [checkbox, setCheckbox] = useState<IState>({
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

  const [priceRange, setPriceRange] = useState('');
  const [checkedList, setCheckedList] = useState<string[]>([])

  const handlePriceChange = (event: any) => {
    setPriceRange(event.target.value);
  }
  
  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedList([...checkedList, event.target.name]) 
    } else {
      setCheckedList(checkedList.filter((tag: string) => tag !== event.target.name))
    }
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked })
    console.log(event.target.checked, checkedList)
    
  };



  const category = ['chinese', 'indian', 'korean', 'mexican']

  const dietaryRestrictions = ['lactoseFree', 'vegetarianFriendly', 'veganOptions', 'glutenFree']


  const priceLevel = ['$', '$$', '$$$', '$$$$']

    return (
      <form action="" className={classes.root} noValidate autoComplete="off" >
      <div style={{ width: '100%' }}>

        <Input 
        id="storeName" 
        label="Required" 
        inputLabel="Store Name"
        variant="outlined"
        errorMessage="Invalid store name" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        />

        

        <Input 
        id="description" 
        required
        label="Required" 
        inputLabel="Description" 
        variant="outlined"
        multiline
        rows={4}
        errorMessage="Invalid description"
        validators={[VALIDATOR_REQUIRE()]}
        />
        
        <Input 
        id="address" 
        label="Required" 
        inputLabel="Address" 
        variant="outlined"
        errorMessage="Not valid" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        />
        

        <Input 
        id="phoneNumber" 
        label="Required" 
        inputLabel="Phone Number"
        variant="outlined"
        errorMessage="Invalid number" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        />

        <div>
          <Typography>Picture</Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>

        </div>

        <div style={{ width: '100%' }}>

          <FormControl component="fieldset" style={{ width: '100%' }}>
          <FormLabel  style={{ color: 'black', margin: '16px 0'}}>Price</FormLabel>
          <Paper variant="outlined" style={{ padding: 16 }}>
          <RadioGroup row aria-label="price" name="price" value={priceRange} onChange={handlePriceChange} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

            {priceLevel.map(price => <RadioButton value={price} label={price} key={price} />)}
            </RadioGroup>
          </Paper>
          </FormControl>

        </div>

        <div >
          <Typography style={{ margin: '16px 0' }}>Tags</Typography>
          <Paper variant="outlined">


          <FormGroup className={classes.tagsRoot}>

            <Typography variant="body1" className={classes.titleFont}>Category</Typography>

            {category.map((cat: keyof IState) => <CheckBox checked={checkbox[cat]} item={cat} handleChange={handleTagsChange}/>)}

            <Divider variant="middle" className={classes.divider}/>  

            <Typography variant="body1" className={classes.titleFont}>Dietary Restrictions</Typography>
            {dietaryRestrictions.map((res: keyof IState) => <CheckBox checked={checkbox[res]} item={res} handleChange={handleTagsChange}/>)}

    

          </FormGroup>
          </Paper>


        </div>

      </div>

    </form>
    );
}
export default StoreForm