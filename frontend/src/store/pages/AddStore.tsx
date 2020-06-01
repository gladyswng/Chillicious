import React, { useState } from 'react'
import StoreForm from '../components/StoreForm'
import Typography from '@material-ui/core/Typography';

interface AddStoreProps {

}

const AddStore: React.FC<AddStoreProps> = ({}) => {

  const initialFormState = {
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

    },
    priceRange: '',
    tags: [] as string[],
    isValid: false, 
  
    checkbox: {

      chinese: false,
      indian: false,
      mexican: false,
      korean: false,
      lactoseFree: false,
      vegetarianFriendly: false,
      veganOptions: false,
      glutenFree: false
    }
  }
    return (
     
        <div style={{ marginTop: 80, width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5">
          Add Store
          </Typography>
          <StoreForm 
          inputs={initialFormState.inputs}
          tags={initialFormState.tags}
          priceRange={initialFormState.priceRange}
          isValid={initialFormState.isValid}
          checkbox={initialFormState.checkbox}
          blur={true}
          buttonTitle="Add Store"
          />
        </div>


    );
}
export default AddStore