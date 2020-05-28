import React from 'react'
import Modal from '../../shared/components/UIElements/Modal'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

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

const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const classes = useStyles()
  const preventDefault = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => event.preventDefault();
    return (
      <Modal>

        <Typography variant="h5">Log In</Typography>
        <form action="" className={classes.root} noValidate autoComplete="off">
      <div style={{ width: '70%' }}>
        <div>
          <Typography>Email Address</Typography>
          <TextField
            
            id="outlined-email"
  
            placeholder="Email"
            variant="outlined"
       

          />

        </div>
        
        <div>
        <Typography>Password</Typography>
          <TextField
            id="outlined-password-input"

            type="password"
            placeholder="Password"
            variant="outlined"
          />
        </div>

      <Button variant="contained" size="medium" color="primary" style={{ margin: 8 }}>Log In</Button>
        
      </div>

    </form>

    <div>
      <Typography variant='body2'>Do not have an account?</Typography>
      <Typography>

      <Link href="#" onClick={preventDefault} style={{  }}>
        Sign Up
      </Link>
      </Typography>
    </div>

      </Modal>
    );
  }
export default LoginModal