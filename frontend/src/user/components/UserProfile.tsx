import React, { useContext, useState } from 'react'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../util/validators'
import Input from '../../shared/components/UIElements/Input'
import { AuthContext } from '../../shared/context/authContext'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook' 
import Message from '../../shared/components/UIElements/Message'
import ImageUpload from '../../shared/components/UIElements/ImageUpload'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  
  profileRoot: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
}));


interface UserProfileProps {
  userName: string
  email: string
  password: string
  avatar: string
}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  
  const { userName, email, avatar } = props
  const [message, setMessage] = useState()
  
  const [formState, inputHandler, setFormData] = useForm({
  userName: {
    value: userName,
    isValid: true
  },
  email: {
    value: email,
    isValid: true
  },
  avatar: {
    value: avatar,
    isValid: true
  }

}, 
true,
{})

const { inputs, isValid } = formState

const profileSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log(inputs.avatar.value)
  try {
    const formData = new FormData()
    formData.append('name', inputs.userName.value)
    formData.append('image', inputs.avatar.value)
    
    const response = await sendRequest('/api/user/me/profile', 'PATCH', formData, { 
      Authorization: 'Bearer ' + auth.token
    } 
    )
    setMessage(response.message)
    // setIsLoading(false)
    // setError(null)

  } catch (e) {
    // setIsLoading(false)
    // setError(e.message || 'Something went wrong, please try again')

  }
}

  return (
    <>

      <ImageUpload 
      id="avatar" 
      onInput={inputHandler} 
      image={inputs.avatar.value} 
      imageStyle="avatar"/>



      {/* <UserForm 
        inputs={inputs}
        formIsValid={isValid}
        blur={false}
        inputHandler={inputHandler}
        disableEmail={true}
        submitHandler={submitHandler}

        /> */}

      <form  className={classes.profileRoot} noValidate autoComplete="off" onSubmit={profileSubmitHandler}>
      {error && <Message message={error}/>}
      {message && <Message message={message}/>}
        <div>
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
      
        />
        <Input 
          id="email" 
          label="Required" 
          inputLabel="Email Address"
          disabled={true}
          value={inputs.email.value}
          variant="outlined"
          errorMessage="Invalid email address" 
          required
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
      
          />

        </div>
        

      <Button variant="contained" color="primary" style={{ width: '50%', margin: '20px 0' }} type="submit">Save</Button>
        
        </form>
      
    </>
  );
}
export default UserProfile




