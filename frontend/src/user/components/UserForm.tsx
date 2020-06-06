import React, { useState } from 'react'


import Input from '../../shared/components/UIElements/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MATCH, VALIDATOR_EMAIL } from '../../util/validators'


import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(2),
        width: '100%',

      },
      display: 'flex',
      justifyContent: 'center',
      width: '80%'
    },
}));


interface UserFormProps {
  inputs: {
    userName: {
      value: string
      isValid: boolean
    }
    email: {
      value: string
      isValid: boolean
    }
    password: {
      value: string
      isValid: boolean
    }
    confirmPassword: {
      value: string
      isValid: boolean
    }

  }
  formIsValid: boolean
  blur: boolean
  disableEmail: boolean
  inputHandler: () => void
}

const UserForm: React.FC<UserFormProps>  = (props) => {
  const classes = useStyles()
  const { inputs, formIsValid,  blur, disableEmail, inputHandler } = props
  

  return (
    <form action="" className={classes.root} noValidate autoComplete="off">
      <div style={{ width: '100%' }}>
        <Input 
          id="userName" 
          label="Required" 
          inputLabel="User Name"
          value={inputs.userName.value}
          variant="outlined"
          errorMessage="Invalid user name" 
          required
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          blur={blur}
        />

        <Input 
          id="email" 
          label={disableEmail? "Disabled" : "Required"}
          disabled={disableEmail? true: false}  
          inputLabel="Email Address"
          value={inputs.email.value}
          variant="outlined"
          errorMessage="Invalid email address" 
          required
         

          validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL() ]}
          onInput={inputHandler}
          blur={blur}
        />
        <Input 
          id="password" 
          label="Required" 
          type="password"
          inputLabel="Password"
          value={inputs.password.value}
          variant="outlined"
          errorMessage="Please provide more than 6 characters" 
          required
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
          blur={blur}
        />

        <Input 
          id="confirmPassword" 
          label="Required" 
          type="password"
          inputLabel="Confirm Password"
          value={inputs.confirmPassword.value}
          variant="outlined"
          errorMessage="Invalid match" 
          required
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6), VALIDATOR_MATCH(inputs.password.value)]}
          onInput={inputHandler}
          blur={blur}
        />

        
        <div>
          <Button 
          variant="contained"  
          color="primary" 
          style={{ margin: 8 }}
          disabled={!formIsValid}
        >{blur? 'Register' : 'Save'}</Button>
          <Button 
          variant="contained"  
          color="primary" 
          style={{ margin: 8 }}
          >Cancel</Button>
        </div>

      </div>

    </form>
  )
}


export default UserForm

