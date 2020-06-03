import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
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

  const [modalOpen, setModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    console.log('set false')
    setModalOpen(false);
  };

  const preventDefault = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => event.preventDefault();

    return (
      <Modal buttonText="Log In" buttonColor="primary" open={modalOpen} onOpen={handleModalOpen} onClose={handleModalClose}>

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