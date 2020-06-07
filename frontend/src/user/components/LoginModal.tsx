import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/authContext'
import Modal from '../../shared/components/UIElements/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  };

  const authSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs)
    auth.login()
  } 

  return (
    <Modal 
    buttonText={props.buttonText}
    buttonColor="primary" 
    disableElevation={props.disableElevation}
    open={modalOpen} 
    onOpen={handleModalOpen} 
    onClose={handleModalClose}>

      <Typography variant="h5">Log In</Typography>
      <form action="" className={classes.root} noValidate autoComplete="off" onSubmit={authSubmitHandler}>
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
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
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