import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import StoreForm from '../components/StoreForm'
import Typography from '@material-ui/core/Typography';

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
  // const initialFormState = {
  //   inputs: {
  //     storeName: {
  //       value: 'What is this',
  //       isValid: true
  //     },
  //     description: {
  //       value: 'this is something tasty',
  //       isValid: true
  //     },
  //     address: {
  //       value: 'where is it',
  //       isValid: true
  //     },
  //     phoneNumber: {
  //       value: '32qwer',
  //       isValid: true
  //     },
  //     priceRange: {
  //       value: '$$',
  //       isValid: true
  //     }
  //   },
    
  //   formIsValid: true, 
  //   otherData: {
  //     tags: ['chinese', 'lactoseFree'],
  //     checkbox: {
  //       chinese: true,
  //       indian: false,
  //       mexican: false,
  //       korean: false,
  //       lactoseFree: true,
  //       vegetarianFriendly: false,
  //       veganOptions: false,
  //       glutenFree: false
  //     }
  //   }
  
    
  // }

  const stores = [
    {
      id: "store1",
      name: "foodiee",
      description: "description1",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=60",
      location: {},
      address: 'where',
      priceRange: '$$',
      phoneNumber: '1234',
      tags: ['chinese', 'mexican']
    }
  ]
  
  // let checkbox = {
  //   chinese: false,
  //   indian: false,
  //   mexican: false,
  //   korean: false,
  //   lactoseFree: false,
  //   vegetarianFriendly: false,
  //   veganOptions: false,
  //   glutenFree: false
  //   }


const [storeForm, setStoreForm] = useState({
  inputs: {
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
  formIsValid: false, 
  otherData: {
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
  }
})

useEffect(() => {
  const storeId  = "store1"   //useParams()

  const fetchStore = async () => {
    const timer = setTimeout(() => {
      
   
    const store =  stores.find(store => store.id === storeId)
    if (!store) {
      return <h3>Could not find store</h3>
    }
    console.log('ran useeffect')
    setStoreForm({
      inputs: {
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
      
      formIsValid: true, 
      otherData: {
        tags: store.tags,
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
        image:[]
      } 
    })
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


const { inputs, formIsValid, otherData } = storeForm



  return (
    <div style={{ marginTop: 80, width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h5">
      Edit Store
      </Typography>
      <StoreForm 
        inputs={inputs}
        formIsValid={formIsValid}
        checkbox={otherData.checkbox}
        tags={otherData.tags}
        blur={false}
        />
    </div>

);
}
export default UpdateStore


