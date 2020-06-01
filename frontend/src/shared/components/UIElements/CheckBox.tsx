import React from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';

interface CheckBoxProps {
  item: string
  checked: boolean
  // defaultValue: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void


}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const toTitleCase = (phrase: string) => {
    return phrase
      .split(/(?=[A-Z])/)
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <FormControlLabel
    control={<Checkbox checked={props.checked} onChange={props.handleChange} 
    color="primary"
    name={props.item} 
    // value={props.defaultValue}
    style={{ padding: "0 10px" }}
    />}
    style={{ width: '100%' }}
    label={<span style={{ fontSize: 15 }}>{toTitleCase(props.item)}</span>}
    />
  )
}
export default CheckBox