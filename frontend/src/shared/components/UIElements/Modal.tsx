import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
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

  },

}));


interface SharedModalProps {
  buttonText?: string,
  buttonColor?: 'primary' | 'default'
  iconButton?: boolean
  buttonIcon?: string,
  open: boolean
  onOpen: () => void
  onClose: () => void
}

const SharedModal: React.FC<SharedModalProps> = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);


  const body = (
    <div style={modalStyle} className={classes.paper}>
      {props.children}
      
    </div>
  );

  const renderIcon = ()=> {
    if (props.buttonIcon=== 'account') {
      return <AccountCircleIcon />
    }
  }
  const renderButton =() => {

    if (props.iconButton) {
      return <IconButton onClick={props.onClose} >
      {renderIcon()}
    </IconButton>
    } else {
      return <Button disableElevation variant="contained" onClick={props.onOpen} color={props.buttonColor}>
      {props.buttonText}</Button>
    }
  }

  

  return (
    <div>
      {renderButton()}
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ outline: 'none', border: 'none' }}
     
      
    >
      {body}
    </Modal>
  </div>
  );
}
export default SharedModal