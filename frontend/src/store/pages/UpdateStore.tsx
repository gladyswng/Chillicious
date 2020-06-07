import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import StoreForm from '../components/StoreForm'
import Typography from '@material-ui/core/Typography';
import { useForm } from '../../shared/hooks/form-hook'
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


  const stores = [
    {
      id: "store1",
      name: "foodiee",
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

// const getStore :any = async () => {
//   try {
    
//     // Object.keys(checkbox).map((tag: keyof checkbox )=> {
//     //   if (store.tags.includes(tag)) {
//     //     checkbox[tag] = true
//     //   }
//     //   console.log(checkbox)
//     // })
    
//     return 
//     // const json = await identifyStore.json()

//   } catch (error) {
//     console.log(error)
//   }

// }


const { inputs, isValid, otherData } = formState



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

        />
    </div>

);
}
export default UpdateStore


