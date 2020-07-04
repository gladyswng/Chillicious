import React, { useContext, useState } from 'react'
import UserForm from '../components/UserForm'
import { useHttpClient } from '../../shared/hooks/http-hook' 
import Message from '../../shared/components/UIElements/Message'
import Modal from '../../shared/components/UIElements/Modal'
import { useForm } from '../../shared/hooks/form-hook'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../../shared/context/authContext'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  formRoot: { 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    width: '100%', 
    alignItems:'center', 
 }
}))


interface RegistrationProps {

}



const Registration: React.FC<RegistrationProps> = ({}) => {
  const classes = useStyles()

  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<string>()

  const auth = useContext(AuthContext)
    const [formState, inputHandler] = useForm({
    userName: {
      value: '',
      isValid: false
    },
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
    confirmPassword: {
      value: '',
      isValid: false
    },

  }, 
  false,
  {})

  const { inputs, isValid } = formState


  const submitHandler = async (e: any) => {
    e.preventDefault()
    try {
      const responseData = await sendRequest('/user/register', 'POST', JSON.stringify({
      name: inputs.userName.value,
      email: inputs.email.value,
      password: inputs.password.value
      }), {
          'Content-Type': 'application/json'
        }
      )
      
      // const data = await response.json()
      
      // if (!response.ok) {
      //   console.log(data)
      //   throw new Error(data.message)
      // }
      // setIsLoading(false)
      clearError() //?
      auth.login(responseData.user.id, responseData.token )

    } catch (e) {
      // console.log(e.message)
      // setIsLoading(false)
      // setError(e.message || 'Something went wrong, please try again')

    }
    
    


  }

  // const errorHandler = () => {
  //   setError(null)
  // }

    return (
      <div className={classes.formRoot}>
        {isLoading && <CircularProgress />}

        <Typography variant="h4">Register Account</Typography> 
        {error && <Message message={error} />}

        <UserForm 
          inputs={inputs}
          formIsValid={isValid}
          blur={true}
          inputHandler={inputHandler}
          disableEmail={false}
          submitHandler={submitHandler}

        />
      </div>
    );
}
export default Registration