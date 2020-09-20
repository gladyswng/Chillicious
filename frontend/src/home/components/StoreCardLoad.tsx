import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1
  },
  cardRoot: {
    width: 345,
    height: '100%',
    padding: 5,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%'

    },
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  loading: {
    colorPrimary: {
      backgroundColor: '#00695C',
    },

    backgroundColor: '#D3D3D3',

    height: 10
  }

  

}))

interface StoreCardLoadProps {

}

const StoreCardLoad: React.FC<StoreCardLoadProps> = ({}) => {
  const classes = useStyles();
  const cardRows = [1,2,3,4]

  const loadingStore = cardRows.map((item, index) => {
    return (
      <Grid item sm={6} md={3} key={cardRows[index]} style={{ width: '100%' }}>
      <div className={classes.cardRoot}>
        <div
        style={{ 
          backgroundColor: '#D3D3D3',
          boxShadow: 'none',
          borderRadius: 0,
          height: 200,
          width: '100%'
        }}></div>
      <LinearProgress color="secondary" className={classes.loading}/>
      <LinearProgress color="secondary" className={classes.loading}/>
      <LinearProgress color="secondary" className={classes.loading}/>


      </div>
      </Grid>
  )
  })
    return (

        <div className={classes.root}>
          <Grid container spacing={4} >
          {loadingStore}
          </Grid>

        </div>
        

    )
}
export default StoreCardLoad



//   return (
      //   <Grid item sm={6} md={3} key={loadedStoreList[index]} style={{ width: '100%' }}>
      //   <div className={classes.loadingCard}>
      //   <LinearProgress />
      //   <LinearProgress />
      //   <LinearProgress />
      //   </div>
      //   </Grid>
      // )
