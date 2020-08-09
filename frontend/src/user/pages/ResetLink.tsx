import React from 'react'
import { Typography } from '@material-ui/core'
import Input from '../../shared/components/UIElements/Input'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook' 
import Message from '../../shared/components/UIElements/Message'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MATCH, VALIDATOR_EMAIL } from '../../util/validators'
import Button from '@material-ui/core/Button'
interface ResetLinkProps {

}

const ResetLink: React.FC<ResetLinkProps> = ({}) => {

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
        email: inputs.email.value
        }), {
            'Content-Type': 'application/json'
          }
        )
        console.log(responseData)
      } catch (e) {

      }
    }
    return (
      <div style={{ width: '80%' }}>
        <Typography variant='h4' style={{ marginTop: 20, marginBottom: 20 }}>Reset Password</Typography>
        {error && 
        <Message message={error}/>
        }

      <form action="" onSubmit={submitHandler}>
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
          blur={true}
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
          blur={true}
        />

        <Button 
          variant="contained"  
          color="primary" 
          style={{ margin: 8 }}
          disabled={!isValid}
          type='submit'
        >Reset Password
        </Button>
        
      </form>
      </div>
      
    );
}
export default ResetLink