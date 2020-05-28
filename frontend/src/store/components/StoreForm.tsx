import React, { useState } from 'react'
import RadioButton from '../../shared/components/UIElements/RadioButton'


import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Layout from '../../util/Layout';
import Input from '../../shared/components/UIElements/Input'
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

}));

interface StoreFormProps {

}

const StoreForm: React.FC<StoreFormProps> = ({}) => {
  const classes = useStyles()
  const [price, setPrice] = useState();

  const handleChange = (event: any) => {
    setPrice(event.target.value);
  }
  

  // const handlePriceChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

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

        <div>
        <FormControl component="fieldset">
        <FormLabel  color="secondary" >Price</FormLabel>
        <RadioGroup row aria-label="price" name="price" value={price} onChange={handleChange}>
  
          {priceLevel.map(price => <RadioButton value={price} label={price} />)}
          </RadioGroup>
          </FormControl>

        </div>




      </div>

    </form>
    );
}
export default StoreForm