import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import Input from '../../shared/components/UIElements/Input'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook' 
import Message from '../../shared/components/UIElements/Message'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MATCH, VALIDATOR_EMAIL } from '../../util/validators'
import Button from '@material-ui/core/Button'
import { useSnackbar } from 'notistack'

interface ResetLinkProps {

}

const ResetLink: React.FC<ResetLinkProps> = ({}) => {
  const { enqueueSnackbar } = useSnackbar()
 
  const [formState, inputHandler] = useForm({
    email: {
      value: '',
      isValid: false
    }
    },
    false,
    {})

    const { inputs, isValid } = formState

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const submitHandler = async (e: any) => {
      e.preventDefault()
      try {
        const responseData = await sendRequest('/api/user/sendResetLink', 'POST', JSON.stringify({
       
        email: inputs.email.value,

        }), {
            'Content-Type': 'application/json'
          }
        )

        // setMessage(responseData.message)
        enqueueSnackbar('A reset link has been sent')

      } catch (e) {

      }
    }
    return (
      <div style={{ width: '80%' }}>
        <Typography variant='h4' style={{ marginTop: 20, marginBottom: 20 }}>Reset Password</Typography>
      {error && <Message message={error} />}

      <form action="" onSubmit={submitHandler}>
        <Input 
          id="email" 
          label="Required" 
          inputLabel="Email Address"
          value={inputs.email.value}
          variant="outlined"
          errorMessage="Invalid email address" 
          required
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          blur={true}
        />

        <Button 
          variant="contained"  
          color="primary" 
          style={{ margin: 8 }}
          disabled={!isValid}
          type='submit'
        >Send
        </Button>
        
      </form>
      </div>
      
    );
}
export default ResetLink