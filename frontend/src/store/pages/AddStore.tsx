import React, { useState } from 'react'
import StoreForm from '../components/StoreForm'
import { useForm } from '../../shared/hooks/form-hook'
import Typography from '@material-ui/core/Typography';

interface AddStoreProps {

}

const AddStore: React.FC<AddStoreProps> = ({}) => {
  const [formState, inputHandler, priceHandler, tagsHandler, setFormData] = useForm({
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
    priceRange:{
      value: '',
      isValid: false
    }
  }, 
  false, 
  {
    tags: [],
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
    image: []
  })


  const { inputs, isValid,  otherData } = formState

    return (
     
        <div style={{ marginTop: 80, width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5">
          Add Store
          </Typography>
          <StoreForm 
          inputs={inputs}
          formIsValid={isValid}
          otherData={otherData}
          blur={true}
          inputHandler={inputHandler}
          priceHandler={priceHandler}
          tagsHandler={tagsHandler}
      
       
          />
        </div>


    );
}
export default AddStore