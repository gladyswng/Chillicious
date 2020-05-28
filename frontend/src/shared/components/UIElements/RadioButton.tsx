import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



interface RadioButtonProps {
  // title: string,
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