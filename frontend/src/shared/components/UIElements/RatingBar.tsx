import React, { useState, useEffect, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import WhatshotIcon from '@material-ui/icons/Whatshot';



const StyledRating = withStyles({
  iconFilled: {
    color: '#FF351F',
  },
  iconHover: {
    color: '#FC1C04',
  },
  
})(Rating);


const useStyles = makeStyles((theme) => ({
  box: { 
    margin: 0, padding: 0, display:'inline-block' 
  }
}));



interface RatingBarProps {
  rating?: number
  readOnly: boolean
  onInput?: (id: any, value: any, isValid: boolean) => void
  inputIsValid?: boolean
}

const RatingBar: React.FC<RatingBarProps> = ({ rating, inputIsValid, readOnly, onInput }) => {
  const classes = useStyles()
  const [ rate, setRate ] = useState(rating)
  const [ isValid, setValid ] = useState(inputIsValid)

  useEffect(() => {
    setRate(rating)
  }, [rating])

  /// TOOOOO LAZY TO USE A REDUCER RIGHT NOW
  const changeHandler = (event: any, newRate: number) => {
    setValid(true)
    if (newRate === null) {
      setRate(1)
    } else {
      setRate(newRate)
    }
  } 

if (onInput) {
  useEffect(() => {
    onInput('rating', rate, isValid)
  }, [rate, onInput])
}


  
    return (
      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box} >
        <StyledRating
          id='rating'
          readOnly={readOnly}
          name="rating"
          onChange={changeHandler}
          value={rate|| 0}
          size="small"
          getLabelText={(value) => `${value} Hot`}
          precision={1}
          icon={<WhatshotIcon fontSize="inherit" />}

        /> 
        
      </Box>
    );
}

export default RatingBar