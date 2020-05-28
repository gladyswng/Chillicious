import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Input from '../../shared/components/UIElements/Input'


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(2),
        width: '100%',

      },
      display: 'flex',
      justifyContent: 'center',
      width: '80%'
    },
}));

const UserForm: React.FC = () => {
  const classes = useStyles()
  return (
    <form action="" className={classes.root} noValidate autoComplete="off">
      <div style={{ width: '100%' }}>
        <div>
          <Typography>User Name</Typography>
          <TextField
            required
            id="outlined-required"
            label="User Name"
            defaultValue="TOGGLE"
            variant="outlined"
        
            
          />

        </div>
        <div>
          <Typography>Email</Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="TOGGLE"
            variant="outlined"
       

          />

        </div>
        
        <div>
        <Typography>Password</Typography>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </div>

        <div>
        <Typography>Confirm Password</Typography>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </div>


      </div>

    </form>
  )
}


export default UserForm

