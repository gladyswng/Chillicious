// import React, { useReducer, createContext, useEffect } from "react";

// export const StoreFormContext = createContext()

// const initState = {
//   inputs: {
//     storeName: {
//       value: '',
//       isValid: false
//     },
//     description: {
//       value: '',
//       isValid: false
//     },
//     address: {
//       value: '',
//       isValid: false
//     },
//     phoneNumber: {
//       value: '',
//       isValid: false
//     },
//     priceRange: {
//       value: '',
//       isValid: false
//     }

//   },
//   tags: [] as string[],
//   isValid: false, 

//   checkbox: {

//     chinese: false,
//     indian: false,
//     mexican: false,
//     korean: false,
//     lactoseFree: false,
//     vegetarianFriendly: false,
//     veganOptions: false,
//     glutenFree: false
//   }

// }

// const formReducer = (state: any, action: any) => {
  
//   // Here we update the state in the reducer
//   switch (action.type) {
//     case 'INPUT_CHANGE':
//       // This combine with individual input ensures if one false, the overfall will be false
      
//       let formIsValid = true
//       for (const inputId in state.inputs) {// Go through all the inputs(also samee as id)

//         // if current input we're looking at, which is getting updated in this currint action -- if this is the case, take info from the dispatched action on weather it is valid or not
//         if (inputId === action.inputId)  {
//           formIsValid = formIsValid && action.isValid
          
//         } else {
//           // if looking at an input in form state which is not currently getting updated throught the running action
//           formIsValid = formIsValid && state.inputs[inputId].isValid

//         }
//       }
//       return {
//         ...state,
//         inputs: {
//           ...state.inputs,
//           [action.inputId]: { value: action.value, isValid: action.isValid }
//         },

//         isValid: formIsValid

//       }
    

//     case 'TAGS_CHANGE': 
//       if (action.checked && !state.tags.includes(action.checkboxId)) {
//         state.tags = [...state.tags, action.checkboxId]
//       } else {
//         state.tags = state.tags.filter((tag: string) => tag !== action.checkboxId)
        
//       }
      
//       return {
//         ...state,
//         tags: state.tags,
//         checkbox: {
//           ...state.checkbox,
//           [action.checkboxId]: action.checked
//         }
 
//       }

//     default:   // default set to unchanged state
//       return state  
//   }
// }

// // Provider
// export const FormContextProvider = (props: any) => {
//   const [formState, dispatch] = useReducer(formReducer, initState)

//   useEffect(()=> {
//     fetch().then((storeData: Response) => {
//       dispatch({
//         type: "STORE_READY",
//         storeData: storeData
//       })
//     })
//   }, [])
  
//   return <StoreFormContext.Provider value={[formState, dispatch] }>{props.children}</StoreFormContext.Provider>
// }