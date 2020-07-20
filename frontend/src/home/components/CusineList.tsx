import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'


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
  const cusineList = ['chinese', 'indian', 'mexican', 'korean']

const cusineItems = cusineList.map((cusine) => {
    return(
      <Chip color="primary" className={classes.margin} label={cusine} key={cusine} />

    )
  })


  return (

        <ul style={{padding: "0", marginTop: "0"}}>{cusineItems}</ul>


  );
}
export default CusineList