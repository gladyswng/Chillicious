import React, { useState, useCallback, useReducer } from 'react'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators'
import { useForm } from '../../shared/hooks/form-hook'

import RadioButton from '../../shared/components/UIElements/RadioButton'
import CheckBox from '../../shared/components/UIElements/CheckBox'
import { makeStyles } from '@material-ui/core/styles'
import FormHelperText from '@material-ui/core/FormHelperText'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '../../shared/components/UIElements/Input'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';



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
    priceRange: {
      value: string
      isValid: boolean
    }
    
  }
  
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







const StoreForm: React.FC<StoreFormProps> = ({ inputs, isValid, checkbox, tags, blur, buttonTitle }) => {
  const classes = useStyles()
    
  const category = ['chinese', 'indian', 'korean', 'mexican']
  const dietaryRestrictions = ['lactoseFree', 'vegetarianFriendly', 'veganOptions', 'glutenFree']
  const priceLevel = ['$', '$$', '$$$', '$$$$']

  const [formState, inputHandler, priceHandler, tagsHandler] = useForm({
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
      priceRange:{
        value: inputs.priceRange.value,
        isValid: inputs.phoneNumber.isValid
      }
    }, 
    isValid, 
    {
      tags: tags,
      checkbox: {
        chinese: checkbox.chinese,
        indian: checkbox.indian,
        mexican: checkbox.mexican,
        korean: checkbox.korean,
        lactoseFree: checkbox.lactoseFree,
        vegetarianFriendly: checkbox.vegetarianFriendly,
        veganOptions: checkbox.veganOptions,
        glutenFree: checkbox.glutenFree
      },
      image: []
    })
  
  // // useReducer returns a dispatch function
  // const [formState, dispatch] = useReducer(formReducer, {
  //   inputs: ,
  //   isValid: isValid, 
  //   otherData: 
  // })

  console.log(formState)



  // Here we have a flexible reusable input handler, so we don't need different handlers for different inputs
  // Used useCallback so that it doesnt create a new function obj since it's a function in a function, avoiding useEffect to run again



  const priceRange = formState.inputs.priceRange

  const imageHandler = ({ target } : any) => {
    console.log(target.files[0].name)
    console.log(target.files[0])
    // dispatch({
    //   type: 'IMAGE_CHANGE',
      
    // })

  }

  // TO BE CHANGED
    const storeFormSubmitHandler = (event: any) => {
      event.preventDefault()
      console.log(formState)
    }

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
        errorMessage="Please provide more than 15 characters"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(15)] }
        onInput={inputHandler}
        blur={blur}
        />
        
        <Input 
        id="address" 
        label="Required" 
        inputLabel="Address" 
        value={formState.inputs.address.value}
        variant="outlined"
        errorMessage="Invalid address" 
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
            onChange={imageHandler}
            id="image"
            multiple
            type="file"
          />
          <label htmlFor="image">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        

        </div>

        <div style={{ width: '100%' }}>

          <FormControl component="fieldset"
        style={{ width: '100%' }}>

          <FormLabel  style={{ color: 'black', margin: '16px 0'}}>Price</FormLabel>
          <Paper variant="outlined" style={{ padding: 16 }}>
          <FormHelperText hidden={priceRange.isValid}>Required*</FormHelperText>
          <RadioGroup 
          row aria-label="price" 
          name="price" 
          id="priceRange" 
          value={priceRange.value}
          onChange={priceHandler} 
          style={{ width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between' }}>

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
              checked={formState.otherData.checkbox[cat]} 
              item={cat} 
              key={cat}
              handleChange={tagsHandler} 
              />)}

              <Divider variant="middle" className={classes.divider}/>  

              <Typography variant="body1" className={classes.titleFont}>Dietary Restrictions</Typography>
              {dietaryRestrictions.map((res) => <CheckBox 
              checked={formState.otherData.checkbox[res]} 
              item={res} 
              key={res} 
              handleChange={tagsHandler}/>)}

            </FormGroup>

          </Paper>
          <p>{formState.otherData.tags}</p>


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