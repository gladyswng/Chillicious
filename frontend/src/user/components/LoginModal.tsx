import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../util/validators'
import { useForm } from '../../shared/hooks/form-hook'
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
 
}

const LoginModal: React.FC<LoginModalProps> = () => {
  const classes = useStyles()
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

  const preventDefault = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => event.preventDefault();

  return (
    <Modal buttonText="Log In" buttonColor="primary" open={modalOpen} onOpen={handleModalOpen} onClose={handleModalClose}>

      <Typography variant="h5">Log In</Typography>
      <form action="" className={classes.root} noValidate autoComplete="off">
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

    {/* <Link href="#" onClick={preventDefault} style={{  }}>
      Sign Up
    </Link> */}
      <NavLink to="/users/me" style={{ textDecoration: 'none', width: 74 }}>
        <Button variant="contained" color="primary" style={{ boxShadow: 'none' }} onClick={handleModalClose}>
          Signp
        </Button>
      </NavLink>
    </Typography>
  </div>

    </Modal>
  );
}
export default LoginModal