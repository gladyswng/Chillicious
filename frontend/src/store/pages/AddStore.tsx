import React, { useState } from 'react'
import StoreForm from '../components/StoreForm'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Typography from '@material-ui/core/Typography';
import Message from '../../shared/components/UIElements/Message'
import CircularProgress from '@material-ui/core/CircularProgress';

interface AddStoreProps {

}

const AddStore: React.FC<AddStoreProps> = ({}) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  
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
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
          await sendRequest(
            'http://localhost:3000/store/add', 
            'POST', 
            JSON.stringify({
              name: inputs.storeName.value,
              description: inputs.description.value,
              address: inputs.address.value,
              priceRange: inputs.priceRange.value,
              tags: otherData.tags.value,
            }), 
            { 'Content-Type': 'application/json' } 
          )
            console.log('sendt requests')
          //Redirect to different page
        } catch (e) {
     
        }
      }

    return (
     
        <div style={{ marginTop: 80, width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5">
          Add Store
          </Typography>
          {error && <Message message={error}/>}
          {isLoading && <CircularProgress />}
          <StoreForm 
          inputs={inputs}
          formIsValid={true}
          otherData={otherData}
          blur={true}
          inputHandler={inputHandler}
          priceHandler={priceHandler}
          tagsHandler={tagsHandler}
          submitHandler={submitHandler}
          />
        </div>


    );
}
export default AddStore