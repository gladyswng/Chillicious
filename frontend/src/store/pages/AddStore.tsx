import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import StoreForm from '../components/StoreForm'
import { useForm } from '../../shared/hooks/store-form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Typography from '@material-ui/core/Typography';
import Message from '../../shared/components/UIElements/Message'
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../../shared/context/authContext'

interface AddStoreProps {

}

const AddStore: React.FC<AddStoreProps> = ({}) => {
  const auth = useContext(AuthContext);
  const history = useHistory()
  
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
    },
    image: {
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
    }
  })


  const { inputs, isValid,  otherData } = formState

  // const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => inputHandler('priceRange', event.target.value, true)
  
  // const tagsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch({
  //     type: 'TAGS_CHANGE',
  //     checkboxId: event.target.name,
  //     checked: event.target.checked

  //   })
  // }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    
        event.preventDefault()
    
   
        try {
          const formData = new FormData()
          formData.append('name', inputs.storeName.value);
          formData.append('description', inputs.description.value)
          formData.append('address', inputs.address.value)
          formData.append('priceRange', inputs.priceRange.value)
          formData.append('image', inputs.image.value)
          for (let i = 0; i < otherData.tags.length; i++) {
            formData.append('tags', otherData.tags[i])
          }
          
          await sendRequest(
            '/api/store/add', 
            'POST', 
            formData,

            { 
              Authorization: 'Bearer ' + auth.token
            } 

            )
            
            history.push('/')
           
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
          formIsValid={isValid}
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