import React, { useEffect, useState, useContext } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'  
import { useParams, useHistory } from "react-router-dom";
import StoreForm from '../components/StoreForm'
import Message from '../../shared/components/UIElements/Message'
import Typography from '@material-ui/core/Typography'
import { useForm } from '../../shared/hooks/store-form-hook'
import { AuthContext } from '../../shared/context/authContext'
import CircularProgress from '@material-ui/core/CircularProgress';

interface UpdateStoreProps {

}
interface checkbox {
  chinese:boolean
  indian: boolean
  mexican: boolean
  korean: boolean
  lactoseFree:boolean
  vegetarianFriendly: boolean
  veganOptions: boolean
  glutenFree:boolean
}

const UpdateStore: React.FC<UpdateStoreProps> = ({}) => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedStore, setLoadedStore] = useState()
  const { id } = useParams()

  

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
    },
    image: {
      value: '',
      isValid: true
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

  console.log(formState)


  useEffect(() => {
    const fetchStore = async () => {
      
      try {

        const responseData = await sendRequest(`/api/store/edit/${id}`, 'GET', null , { 
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        })
        clearError()
        console.log(responseData)
        const store = responseData

        setLoadedStore(store)


        let checkbox = {
          chinese: false,
          indian: false,
          mexican: false,
          korean: false,
          lactoseFree: false,
          vegetarianFriendly: false,
          veganOptions: false,
          glutenFree: false
          }
          Object.keys(checkbox).map((tag: keyof checkbox )=> {
            if (store.tags.includes(tag)) {
              checkbox[tag] = true
            } 
          })
      
          setFormData(
            {
              storeName: {
                value: store.name,
                isValid: true
              },
              description: {
                value: store.description,
                isValid: true
              },
              address: {
                value: store.address,
                isValid: true
              },
              phoneNumber: {
                value: store.phoneNumber,
                isValid: true
              },
              priceRange: {
                value: store.priceRange,
                isValid: true
              },
              image: {
                value: store.image,
                isValid: true
              }
            },
            true, 
            {
              tags: store.tags,
              checkbox: checkbox
            } 
          )


      } catch (e) {

      }
    }
    fetchStore()
  }, [sendRequest, id, setFormData, auth.token])



const { inputs, isValid, otherData } = formState

const updateSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try {
      const formData = new FormData()
      formData.append('name', inputs.storeName.value)
      formData.append('description', inputs.description.value)
      formData.append('address', inputs.address.value)
      formData.append('priceRange', inputs.priceRange.value)
      formData.append('image', inputs.image.value)
      for (let i = 0; i < otherData.tags.length; i++) {
        formData.append('tags', otherData.tags[i])
      }

      await sendRequest(
        `/api/store/update/${id}`, 'PATCH', formData,  { 
          Authorization: 'Bearer ' + auth.token,
        } 
      )
      history.push('/stores') // TODO - CHANGE PAGE HERE TO USER STORE PAGE
    } catch (e) {

    }

  if (!loadedStore && !error) {
    return (
      <Message message={"Could not find store!"}/>
    )
  }
}

  return (
    <div style={{ marginTop: 80, width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h5">
      Edit Store
      </Typography>
      {error && <Message message={error}/>}
      {isLoading && <CircularProgress />}
      {!isLoading&& loadedStore && 
      <StoreForm 
        inputs={inputs}
        formIsValid={isValid}
        otherData={otherData}
        blur={false}
        inputHandler={inputHandler}
        priceHandler={priceHandler}
        tagsHandler={tagsHandler}
        submitHandler={updateSubmitHandler}

        />
      }
    </div>

);
}
export default UpdateStore


