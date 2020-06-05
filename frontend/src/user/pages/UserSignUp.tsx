import React from 'react'
import UserForm from '../components/UserForm'
import { useForm } from '../../shared/hooks/form-hook'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  formRoot: { 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    width: '100%', 
    alignItems:'center', 
    margin: '46px 0' }
}))


interface RegistrationProps {

}

const Registration: React.FC<RegistrationProps> = ({}) => {
  const classes = useStyles()
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

    return (
      <div className={classes.formRoot}>

        <Typography variant="h4">Register Account</Typography> 

        <UserForm 
          inputs={inputs}
          formIsValid={isValid}
          blur={true}
          inputHandler={inputHandler}

        />
      </div>
    );
}
export default Registration