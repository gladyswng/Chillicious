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

  console.log(formState)


  useEffect(() => {
    const fetchStore = async () => {
      try {

        const responseData = await sendRequest(`http://localhost:3000/store/edit/${id}`, 'GET', null , { 
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        })
        
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
              }
            },
            true, 
            {
              tags: store.tags,
              checkbox: checkbox
              ,
              image:[]
            } 
          )


      } catch (e) {

      }
    }
    fetchStore()
  }, [sendRequest, id, setFormData])



const { inputs, isValid, otherData } = formState

const updateSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await sendRequest(
        `http://localhost:3000/store/update/${id}`, 'PATCH', JSON.stringify({
          name: inputs.storeName.value,
          description: inputs.description.value,
          address: inputs.address.value,
          priceRange: inputs.priceRange.value,
          tags: otherData.tags
        }),  { 
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        } 
      )
      history.push('/stores') // TODO - CHANGE PAGE HERE TO USER STORE PAGE
    } catch (e) {

    }

  if (!loadedStore && !error) {
    return (
      <div>
        <h2>Could not find store!</h2>
      </div>

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


