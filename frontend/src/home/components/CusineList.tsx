import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    color: "black",

  }
}));


interface CusineListProps {

}

const CusineList: React.FC<CusineListProps> = ({}) => {
  const classes = useStyles()
  const cusineList = ['chinese', 'indian', 'mexican', 'thai', 'sri lankan']

const cusineItems = cusineList.map((cusine, index) => {
    return(
      <Button variant="contained" size="medium" color="primary" className={classes.margin} key={index}>
        {cusine}
        
      </Button>

    )
  })


  return (

        <ul style={{padding: "0", marginTop: "0"}}>{cusineItems}</ul>


  );
}
export default CusineList