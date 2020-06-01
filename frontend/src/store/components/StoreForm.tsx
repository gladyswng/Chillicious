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
  inputs: {
    storeName: {
      value: string;
      isValid: boolean;
    };
    description: {
      value: string;
      isValid: boolean;
    };
    address: {
      value: string;
      isValid: boolean;
    };
    phoneNumber: {
      value: string;
      isValid: boolean;
    };
    
  }
  priceRange: string;
  tags: string[];
  isValid: boolean
  checkbox: {
    chinese: boolean;
    indian: boolean;
    mexican: boolean;
    korean: boolean;
    lactoseFree: boolean;
    vegetarianFriendly: boolean;
    veganOptions: boolean;
    glutenFree: boolean;
  },
  buttonTitle: string,
  blur: boolean
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
          console.log(formIsValid)
          
        } else {
          // if looking at an input in form state which is not currently getting updated throught the running action
          formIsValid = formIsValid && state.inputs[inputId].isValid
          console.log(formIsValid)

          
         
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
      if (action.checked && !state.tags.includes(action.checkboxId)) {
        state.tags = [...state.tags, action.checkboxId]
      } else {
        state.tags = state.tags.filter((tag: string) => tag !== action.checkboxId)
        
      }
      
      return {
        ...state,
        tags: state.tags,
        checkbox: {
          ...state.checkbox,
          [action.checkboxId]: action.checked
        }
 
      }

    default:   // default set to unchanged state
      return state  
  }
}




const StoreForm: React.FC<StoreFormProps> = ({ inputs, isValid, checkbox, tags, priceRange, blur, buttonTitle }) => {
  const classes = useStyles()
  
  
  // useReducer returns a dispatch function
  const [formState, dispatch] = useReducer(formReducer, {
      inputs: {
      // validity of original input
      storeName: {
        value: inputs.storeName.value,
        isValid: inputs.storeName.isValid
      },
      description: {
        value: inputs.description.value,
        isValid: inputs.description.isValid
      },
      address: {
        value: inputs.address.value,
        isValid: inputs.address.isValid,
      },
      phoneNumber: {
        value: inputs.phoneNumber.value,
        isValid: inputs.phoneNumber.isValid
      },
      
    },
    priceRange: priceRange,
    tags: tags,
    isValid: isValid, 
    checkbox: {

      chinese: checkbox.chinese,
      indian: checkbox.indian,
      mexican: checkbox.mexican,
      korean: checkbox.korean,
      lactoseFree: checkbox.lactoseFree,
      vegetarianFriendly: checkbox.vegetarianFriendly,
      veganOptions: checkbox.veganOptions,
      glutenFree: checkbox.glutenFree
    }
    // inputs: {
    //   // validity of original input
    //   storeName: {
    //     value: '',
    //     isValid: false
    //   },
    //   description: {
    //     value: '',
    //     isValid: false
    //   },
    //   address: {
    //     value: '',
    //     isValid: false
    //   },
    //   phoneNumber: {
    //     value: '',
    //     isValid: false
    //   }

    // },
    // priceRange: '', // TODO - CHECK IT IS DONE
    // tags: [] as string[],
    // isValid: false, 
  
    // checkbox: {
    //   chinese: false,
    //   indian: false,
    //   mexican: false,
    //   korean: false,
    //   lactoseFree: false,
    //   vegetarianFriendly: false,
    //   veganOptions: false,
    //   glutenFree: false
    // }
    
  })

  console.log(formState)

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
        value={formState.inputs.storeName.value}
        variant="outlined"
        errorMessage="Invalid store name" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        blur={blur}
        />

        

        <Input 
        id="description" 
        required
        label="Required" 
        inputLabel="Description" 
        value={formState.inputs.description.value}
        variant="outlined"
        multiline
        rows={4}
        errorMessage="Invalid description"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        blur={blur}
        />
        
        <Input 
        id="address" 
        label="Required" 
        inputLabel="Address" 
        value={formState.inputs.address.value}
        variant="outlined"
        errorMessage="Not valid" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        blur={blur}
        />
        

        <Input 
        id="phoneNumber" 
        label="Required" 
        inputLabel="Phone Number"
        value={formState.inputs.phoneNumber.value}
        variant="outlined"
        errorMessage="Invalid number" 
        required
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        blur={blur}
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

            {category.map((cat) => <CheckBox 
            checked={formState.checkbox[cat]} 
            item={cat} 
            key={cat} 
            
            handleChange={tagsHandler} 
            />)}

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
        >{buttonTitle}</Button>
      </div>


    </form>
  );
}
export default StoreForm




    // // initial state
    // inputs: {
    //   // validity of original input
    //   storeName: {
    //     value: inputs.storeName.value,
    //     isValid: inputs.storeName.isValid
    //   },
    //   description: {
    //     value: inputs.description.value,
    //     isValid: inputs.description.isValid
    //   },
    //   address: {
    //     value: inputs.address.value,
    //     isValid: inputs.address.isValid,
    //   },
    //   phoneNumber: {
    //     value: inputs.phoneNumber.value,
    //     isValid: inputs.phoneNumber.isValid
    //   },
    //   priceRange: inputs.priceRange,
    //   tags: inputs.tags
    // },
    // isValid: formIsValid, 
    // checkbox: {

    //   chinese: checkbox.chinese,
    //   indian: checkbox.indian,
    //   mexican: checkbox.mexican,
    //   korean: checkbox.korean,
    //   lactoseFree: checkbox.lactoseFree,
    //   vegetarianFriendly: checkbox.vegetarianFriendly,
    //   veganOptions: checkbox.veganOptions,
    //   glutenFree: checkbox.glutenFree
    // }