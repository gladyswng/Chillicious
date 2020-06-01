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
        inputs: {
          ...state.inputs,
          priceRange: action.priceRange
        }
        
      }
    
    case 'TAGS_CHANGE': 
      if (action.checked && !state.inputs.tags.includes(action.checkboxId)) {
        state.inputs.tags = [...state.inputs.tags, action.checkboxId]
      } else {
        state.inputs.tags = state.inputs.tags.filter((tag: string) => tag !== action.checkboxId)
        
      }
      
      return {
        ...state,
        inputs: {
          ...state.inputs,
          tags: state.inputs.tags
        },
        checkbox: {
          ...state.checkbox,
          [action.checkboxId]: action.checked
        }
 
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
      },
      priceRange: '',
      tags: []
    },
    isValid: false, // wether over all form is valid
    priceRange: '', // TODO, CHECK IT IS DONE!!!!
    checkbox: {

      chinese: false,
      indian: false,
      mexican: false,
      korean: false,
      lactoseFree: false,
      vegetarianFriendly: false,
      veganOptions: false,
      glutenFree: false
    },
    
  })
 

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


  const storeFormSubmitHandler = (event: any) => {
    event.preventDefault()
    console.log(formState)
  }

  console.log(formState.inputs)
  const category = ['chinese', 'indian', 'korean', 'mexican']

  const dietaryRestrictions = ['lactoseFree', 'vegetarianFriendly', 'veganOptions', 'glutenFree']


  const priceLevel = ['$', '$$', '$$$', '$$$$']

  return (
    <form 
    action=""  //????
    className={classes.root} 
    // onSubmit={storeFormSubmitHandler}
    noValidate //??
    autoComplete="off" 
    >
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


          <FormGroup className={classes.tagsRoot} >

            <Typography variant="body1" className={classes.titleFont}>Category</Typography>

            {category.map((cat) => <CheckBox checked={formState.checkbox[cat]} item={cat} key={cat} handleChange={tagsHandler}/>)}

            <Divider variant="middle" className={classes.divider}/>  

            <Typography variant="body1" className={classes.titleFont}>Dietary Restrictions</Typography>
            {dietaryRestrictions.map((res) => <CheckBox checked={formState.checkbox[res]} item={res} key={res} handleChange={tagsHandler}/>)}

    

          </FormGroup>
          </Paper>
          <p>{formState.inputs.tags}</p>


        </div>

        <Button 
        variant="contained" 
        color="primary" 
        type="submit"
        disabled={!formState.isValid}
        onSubmit={storeFormSubmitHandler} 
        style={{ margin: "16px 0" }}
        >Add Store</Button>
      </div>


    </form>
  );
}
export default StoreForm