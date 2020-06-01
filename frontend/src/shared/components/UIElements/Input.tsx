import React, { useReducer, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import { validate }from '../../../util/validators'


interface InputProps {
  id: string,
  label: string,
  inputLabel: string,
  value: string
  error?: boolean,
  type?: string,
  required: boolean,
  variant: "filled" | "standard" | "outlined",
  multiline?: boolean,
  rows?: number,
  errorMessage?: string,
  validators?: {
    type: string,
    val?: any
  }[]
  onInput: (id: any, value: any, isValid: any) => void
  
}

interface Action {
  type: string,
  val?: string,
  validators?: {
    type: string,
    val?: any
  }[]
}



const inputReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'CHANGE':
     
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': 
      return {
        ...state,
        isTouched: true
      }
    default:
      return state;
  }
}

const Input: React.FC<InputProps> = (props) => {
  // const classes = useStyles()
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value,
    isTouched: false, 
    isValid: false
  });

  const { id, onInput } = props
  const { value, isValid } = inputState

  useEffect(() => {

    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  // useEffect(() => {
  //   props.onInput(props.id, inputState.value, inputState.isvalid)
  // }, [props, inputState])
  // change whenever props changed, but this can lead to infinite loop

  const changeHandler = (event: any) => {
    dispatch({ 
      type: 'CHANGE', 
      val: event.target.value, 
      validators: props.validators 
    });
  };
  
  const touchHandler = () => {
    dispatch({ 
      type: 'TOUCH'
    })
  }


    return (
      <div>
        <label htmlFor={id}><Typography>{props.inputLabel}</Typography></label>
        <TextField id={id}
          required={props.required}
          label={props.label}
          multiline={props.multiline}
          rows={props.rows}
          type={props.type} 
          variant={props.variant} 
          error={!inputState.isValid && inputState.isTouched}
          helperText={!inputState.isValid && inputState.isTouched && props.errorMessage}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          
          />
      </div>
    );
}
export default Input