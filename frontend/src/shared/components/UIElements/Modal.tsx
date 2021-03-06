import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();

  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    
    backgroundColor: theme.palette.background.paper,
    border: 0,
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('xs')]: {
      width: 300,
  
      top: '50%',
      left: '58%',
      transform: 'translate(-50%, -58%)'

    }

  },
  wholeScreenPaper : {
    position: 'absolute',
    height: 500,
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: 0,
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('xs')]: {
      width: 300,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -58%)'

    }
  }


}));


interface SharedModalProps {
  buttonText?: string,
  buttonColor?: 'primary' | 'default'
  buttonStyle?: 'contained' | 'outlined'
  disableElevation?: boolean
  buttonSize?: "small" | "medium" | "large"
  buttonStyles?: React.CSSProperties
  modalStyles?: React.CSSProperties
  wholeScreenModal?: boolean
  open: boolean
  onOpen?: () => void
  onClose?: () => void
}

const SharedModal: React.FC<SharedModalProps> = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);


  const body = (
    <div style={modalStyle} className={props.wholeScreenModal?classes.wholeScreenPaper :  classes.paper }>
      {props.children}
      
    </div>
  );


   

  return (
    <div>
    {props.onOpen && <Button disableElevation={props.disableElevation} 
    size={props.buttonSize}
    style={props.buttonStyles}
    variant={props.buttonStyle || "contained"} 
    onClick={props.onOpen} 
    color={props.buttonColor}>
    {props.buttonText}</Button>}
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="title"
      aria-describedby="description"
      style={{ outline: 'none', border: 'none'}}
     
      
    >
      {body}
    </Modal>
  </div>
  );
}
export default SharedModal