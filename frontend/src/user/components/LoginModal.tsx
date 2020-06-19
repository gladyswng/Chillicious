import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../util/validators'
import Message from '../../shared/components/UIElements/Message'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook' 

import { AuthContext } from '../../shared/context/authContext'
import Modal from '../../shared/components/UIElements/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Input from '../../shared/components/UIElements/Input'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

interface LoginModalProps {
 buttonText: string
 disableElevation?: boolean
 size?: "medium" | "large" | "small"
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<string>()


  const [formState, inputHandler] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },

  }, 
  false,
  {})

  const { inputs, isValid } = formState


  const [modalOpen, setModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    clearError()
  };


  const authSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {

      const responseData = await sendRequest('http://localhost:3000/login', 'POST', JSON.stringify({
        email: inputs.email.value,
        password: inputs.password.value
      }), {
          'Content-Type': 'application/json'
        }
      )
      // const data = await response.json()
      // console.log(data)
      // if (!response.ok) {
      //   console.log(data)
      //   throw new Error(data.message)
      // }
   
      // setIsLoading(false)
      // setError(null)
 
      auth.login(responseData.user, responseData.token)
    } catch (e) {
      // setIsLoading(false)
      // setError(e.message || 'Something went wrong, please try again')

    }
  }


  return (
    <Modal 
    buttonText={props.buttonText}
    buttonColor="primary" 
    disableElevation={props.disableElevation}
    open={modalOpen} 
    onOpen={handleModalOpen} 
    onClose={handleModalClose}>
      {isLoading && <CircularProgress />}

      <Typography variant="h5">Log In</Typography>

      {error && <Message message={error} />}

      <form  className={classes.root} noValidate autoComplete="off" onSubmit={authSubmitHandler}>
        <div style={{ width: '70%' }}>
          <div>
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

          </div>
          
          <div>
          <Input 
            id="password" 
            label="Required" 
            type="password"
            inputLabel="Password"
            value={inputs.password.value}
            variant="outlined"
            errorMessage="Invalid password" 
            required
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
            blur={true}
            />

          </div>

        <Button 
        variant="contained"  
        color="primary" 
        size={props.size}
        type="submit"
        style={{ margin: 8 }}
        disabled={!isValid}
        >Log In</Button>
        <Button 
        variant="contained"  
        color="primary" 
        style={{ margin: 8 }}
        disabled={!isValid}
        >Cancel</Button>
          
        </div>

  </form>

  <div>
    <Typography variant='body2'>Do not have an account?</Typography>
    <Typography>


      <Button 
      component={ NavLink } 
      to="/user/signUp" 
      color="primary" 
      style={{ boxShadow: 'none' }} onClick={handleModalClose}>
        Sign Up Here
      </Button>
  
    </Typography>
  </div>

    </Modal>
  );
}
export default LoginModal