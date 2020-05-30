import React, { useState, useCallback, useReducer } from 'react'
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
import { ECDH } from 'crypto';

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


// Form reducer - returns a new state

const formReducer = (state: any, action: any) => {
  
  // Here we update the state in the reducer
  switch (action.type) {
    case 'INPUT_CHANGE':
      // This combine with individual input ensures if one false, the overfall will be false
      let formIsValid = true
      for (const inputId in state.inputs) {// Go through all the inputs(also samee as id)

        // if current input we're looking at, which is getting updated in this currint action -- if this is the case, take info from the dispatched action on weather it is valid or not
        if (inputId === action.inputId)  {
          formIsValid = formIsValid && action.isValid
   
      
        } else {
          // if looking at an input in form state which is not currently getting updated throught the running action
          formIsValid = formIsValid && state.inputs[inputId].isValid
          
         
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },

        isValid: formIsValid

      }
    
 
    case 'PRICE_CHANGE':
      return {
        ...state,
        priceRange: action.priceRange
      }
    
    case 'TAGS_CHANGE': 
      if (action.checked) {
        state.checkedList = [...state.checkedList, action.checkboxId]
      } else {
        state.checkedList = state.checkedList.filter((tag: string) => tag !== action.checkboxId)
        
      }
      
      return {
        ...state,
        checkbox: {
          ...state.checkbox,
          [action.checkboxId]: action.checked
        },
        checkedList: [...state.checkedList]
 
      }

    default:   // default set to unchanged state
      return state  
  }
}




const StoreForm: React.FC<StoreFormProps> = ({}) => {
  const classes = useStyles()
  
  // useReducer returns a dispatch function
  const [formState, dispatch] = useReducer(formReducer, {
    // initial state
    inputs: {
      // validity of original input
      storeName: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      phoneNumber: {
        value: '',
        isValid: false
      }
    },
    isValid: false, // wether over all form is valid
    priceRange: '',
    checkbox: {
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
    },
    checkedList: []
  })
 



  // const [checkbox, setCheckbox] = useState<IState>({
  //   cheapEats: false,
  //   average: false,
  //   fineDining: false,
  //   chinese: false,
  //   indian: false,
  //   mexican: false,
  //   korean: false,
  //   lactoseFree: false,
  //   vegetarianFriendly: false,
  //   veganOptions: false,
  //   glutenFree: false

  // });
  // const [priceRange, setPriceRange] = useState('');
  // const [checkedList, setCheckedList] = useState<string[]>([])

  // const handlePriceChange = (event: any) => {
  //   setPriceRange(event.target.value);
  // }
  
  // const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     setCheckedList([...checkedList, event.target.name]) 
  //   } else {
  //     setCheckedList(checkedList.filter((tag: string) => tag !== event.target.name))
  //   }
  //   setCheckbox({ ...checkbox, [event.target.name]: event.target.checked })
    
  // };

  const tagsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'TAGS_CHANGE',
      checkboxId: event.target.name,
      checked: event.target.checked

    })
  }

  const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'PRICE_CHANGE',
      priceRange: event.target.value 
    })
  }



  // Here we have a flexible reusable input handler, so we don't need different handlers for different inputs
  // Used useCallback so that it doesnt create a new function obj since it's a function in a function, avoiding useEffect to run again
  const inputHandler = useCallback((id, value, isValid) => {
    // value and other params- since we try to extract the values from the action in reducer
    // value is the value we get from the callback func
   
    dispatch({
      type: 'INPUT_CHANGE', 
      value: value, 
      inputId: id, 
      isValid: isValid
    })
  }, [])





  // TO BE CHANGED


  const submitHandler = (event: any) => {
    event.preventDefault()

  }

  

  const category = ['chinese', 'indian', 'korean', 'mexican']

  const dietaryRestrictions = ['lactoseFree', 'vegetarianFriendly', 'veganOptions', 'glutenFree']


  const priceLevel = ['$', '$$', '$$$', '$$$$']


    return (
      <form action="" className={classes.root} noValidate autoComplete="off" >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

        <Input 
        id="storeName" 
        label="Required" 
        inputLabel="Store Name"
        variant="outlined"
        errorMessage="Invalid store name" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
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
        onInput={inputHandler}
        />
        
        <Input 
        id="address" 
        label="Required" 
        inputLabel="Address" 
        variant="outlined"
        errorMessage="Not valid" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        />
        

        <Input 
        id="phoneNumber" 
        label="Required" 
        inputLabel="Phone Number"
        variant="outlined"
        errorMessage="Invalid number" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
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
          <RadioGroup row aria-label="price" name="price" value={formState.priceRange} onChange={priceHandler} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

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

            {category.map((cat: keyof IState) => <CheckBox checked={formState.checkbox[cat]} item={cat} handleChange={tagsHandler}/>)}

            <Divider variant="middle" className={classes.divider}/>  

            <Typography variant="body1" className={classes.titleFont}>Dietary Restrictions</Typography>
            {dietaryRestrictions.map((res) => <CheckBox checked={formState.checkbox[res]} item={res} handleChange={tagsHandler}/>)}

    

          </FormGroup>
          </Paper>
          <p>{formState.checkedList}</p>


        </div>

        <Button 
        variant="contained" 
        color="primary" 
        type="submit"
        disabled={!formState.isValid}
        onSubmit={submitHandler} 
        style={{ margin: "16px 0" }}
        >Add Store</Button>
      </div>


    </form>
    );
}
export default StoreForm