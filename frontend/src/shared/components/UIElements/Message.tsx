import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


interface MessageProps {
  message: string
}


const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%', 
    textAlign: 'center', 
    borderColor: '#FEC200',
    margin: '10px 0'
  }

}));

const Message: React.FC<MessageProps> = ({ message }) => {
  const classes = useStyles()
    return (
      <Paper variant="outlined" color="primary" className={classes.paper}>
          <Typography style={{ width: '100%', fontSize: 12}}>{message}</Typography>
      </Paper>

      
    )
}
export default Message