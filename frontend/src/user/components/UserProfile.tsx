import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import UserForm from '../components/UserForm'
import { useForm } from '../../shared/hooks/form-hook'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  
  avatarSize: {
    width: theme.spacing(30),
    height: theme.spacing(30),
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
  const { userName, email, password, avatar } = props
  const [formState, inputHandler, setFormData] = useForm({
  userName: {
    value: userName,
    isValid: true
  },
  email: {
    value: email,
    isValid: true
  },
  password: {
    value: password,
    isValid: true
  },
  confirmPassword: {
    value: password,
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

const submitHandler = async (e: any) => {
  e.preventDefault()
  fetch('')
}

  return (
    <>

        <Avatar alt={userName} src={avatar? avatar : "https://images.unsplash.com/photo-1562153889-3847e21e5d3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"} className={classes.avatarSize}/>
          <div style={{ padding: 20 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              // onChange={imageHandler}
              id="image"
              multiple
              type="file"
            />
            <label htmlFor="image">
              <Button 
              variant="contained" 
              size="small" 
              color="primary" 
              component="span"
       
              >
              Change Picture
              </Button>
            </label>

          </div>

      <UserForm 
        inputs={inputs}
        formIsValid={isValid}
        blur={false}
        inputHandler={inputHandler}
        disableEmail={true}
        submitHandler={submitHandler}

        />
      
    </>
  );
}
export default UserProfile




