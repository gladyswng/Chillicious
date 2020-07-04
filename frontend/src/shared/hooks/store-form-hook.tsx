import { useCallback, useReducer } from 'react'

const formReducer = (state: any, action: any) => {
  
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true
  
      for (const inputId in state.inputs) { 
        if (inputId === action.inputId)  {
          formIsValid = formIsValid && action.isValid
        
          
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
  
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid

      }

    case 'TAGS_CHANGE': 
      if (action.checked && !state.otherData.tags.includes(action.checkboxId)) {
  
        state.otherData.tags = [...state.otherData.tags, action.checkboxId]
      } else {
  
        state.otherData.tags = state.otherData.tags.filter((tag: string) => tag !== action.checkboxId)
      }
     
      return {
        ...state,
        otherData: {
          tags: state.otherData.tags,
          checkbox: {
            ...state.otherData.checkbox,
            [action.checkboxId]: action.checked
          }
        }

      }
    case 'SET_DATA': 
    return {
      inputs: action.inputs,
      isValid: action.formIsValid,
      otherData: action.otherData
    }
    
    default:   
      return state  
  }
}


export const useForm = (initialInputs: object, initialFormValidity: boolean, otherData: object) => {
  
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
    otherData: otherData
    

  })

  
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE', 
      value: value, 
      inputId: id, 
      isValid: isValid
    })
  }, [])

  const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => inputHandler('priceRange', event.target.value, true)
  
  const tagsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'TAGS_CHANGE',
      checkboxId: event.target.name,
      checked: event.target.checked

    })
  }


  const setFormData = useCallback((inputData: object, formValidity: boolean, otherData: object) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
      otherData: otherData
    })
  }, [])

  return [formState, inputHandler, priceHandler, tagsHandler, setFormData ]
}