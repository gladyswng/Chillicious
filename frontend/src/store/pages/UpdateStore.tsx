import React, { useEffect, useState, useContext } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'  
import { useParams } from "react-router-dom";
import StoreForm from '../components/StoreForm'
import Typography from '@material-ui/core/Typography'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/authContext'

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedStore, setLoaededStore] = useState()
  
  const stores = [
    {
      id: "5eea54ffab616d6153c51eb2",
      name: "test1234",
      description: "description1",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=60",
      address: 'asdfasdf',
      priceRange: '$$',
      phoneNumber: '1234',
      tags: ['chinese', 'lactoseFree']
    }
  ]
  

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
  const storeId  = "store1"   //useParams()

  const fetchStore = async () => {
    const timer = setTimeout(() => {
      
  //  const store = useParams().id
    const store =  stores.find(store => store.id === storeId)
    if (!store) {
      return <h3>Could not find store</h3>
    }
    console.log('ran useEffect')

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
    }, 1000)
  }
    
  fetchStore()
    
}, [])


const { inputs, isValid, otherData } = formState

const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // try {
    //   await sendRequest(
    //     `http://localhost:3000/store/update/{}`
    //   )
    // } catch (e) {

    // }
}

  return (
    <div style={{ marginTop: 80, width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h5">
      Edit Store
      </Typography>
      <StoreForm 
        inputs={inputs}
        formIsValid={isValid}
        otherData={otherData}
        blur={false}
        inputHandler={inputHandler}
        priceHandler={priceHandler}
        tagsHandler={tagsHandler}
        submitHandler={submitHandler}

        />
    </div>

);
}
export default UpdateStore


