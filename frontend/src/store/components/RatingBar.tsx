import React from 'react'
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
}

const RatingBar: React.FC<RatingBarProps> = ({ rating }) => {
  const classes = useStyles()
    return (
      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box} >
        <StyledRating
          readOnly
          name="customized-color"
          value={rating}
          size="small"
          getLabelText={(value) => `${value} Hot`}
          precision={0.5}
          icon={<WhatshotIcon fontSize="inherit" />}

        /> 
        
      </Box>
    );
}

export default RatingBar