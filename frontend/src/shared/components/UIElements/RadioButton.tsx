import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


interface RadioButtonProps {

  value: string,
  label: string,
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    
  
      <FormControlLabel
        value={props.value}
       
        control={<Radio color="primary" />}
        label={props.label}
        labelPlacement="top"
      />
 

  );
}
export default RadioButton