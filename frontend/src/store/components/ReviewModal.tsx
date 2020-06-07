import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/authContext'
import RatingBar from '../../shared/components/UIElements/RatingBar'
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
  const auth = useContext(AuthContext)
  const [formState, inputHandler, setFormData] = useForm({
    rating: {
      value: 0,
      isValid: false
    },
    title: {
      value: '',
      isValid: false
    },
    text: {
      value: '',
      isValid: false
    }
  }, 
  false,
  {})
  // USE EFFEECT FOR UPDATE REVIEW IF ALREADY SET REVIEW
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
console.log(inputs)

  return (
    <Modal 
    buttonText="Write a review" 
    buttonColor="primary" 
    open={modalOpen} 
    onOpen={handleModalOpen} 
    onClose={handleModalClose}>

      <Typography variant="h5">Tell others how hot it is</Typography>
      <form action="" className={classes.root} noValidate autoComplete="off" onSubmit={authSubmitHandler}>
        <div style={{ width: '70%' }}>
          <div>
          <RatingBar 
          readOnly={false} 
          rating={inputs.rating.value} 
          onInput={inputHandler}
          inputIsValid={inputs.rating.isValid}
          />

          <Input 
            id="title" 
            label="Required" 
            inputLabel="Title"
            value={inputs.title.value}
            variant="outlined"
            errorMessage="Invalid title" 
            required
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            blur={true}
            />

          </div>
          
          <div>
          <Input 
            id="text" 
            label="Required" 
            multiline={true}
            rows={4}
            inputLabel="Review"
            value={inputs.text.value}
            variant="outlined"
            errorMessage="Please provide more than 40 characters" 
            required
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(40)]}
            onInput={inputHandler}
            blur={true}
            />

          </div>

        <Button 
        variant="contained"  
        color="primary" 
        type="submit"
        style={{ margin: 8 }}
        disabled={!isValid}
        >Save</Button>
        <Button 
        variant="contained"  
        color="primary" 
        style={{ margin: 8 }}
        disabled={!isValid}
        >Cancel</Button>
          
        </div>

      </form>


    </Modal>
  );
}
export default LoginModal