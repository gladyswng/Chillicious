import React, { useCallback, useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Layout from '../../util/Layout'
import { makeStyles } from '@material-ui/core/styles';

import SearchHeader from '../components/SearchHeader'
import TopList from '../components/TopList'
import StoreCardLoad from '../components/StoreCardLoad'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  hotBanner: {
    display: 'flex', 
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5
  },
  hotDivider: {
    borderBottom: '1px solid black',
    width: '40%',
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '30%'
    }
  },
  hotTitle: {
    paddingLeft: 10,
    display: 'block',
    width: 120,
    [theme.breakpoints.down('xs')]: {
      width: 400
    }
    
  }


}));

interface HomePageProps {

}

const Homepage: React.FC<HomePageProps> = ({}) => {
  const classes = useStyles()
  const [topList, setTopList] = useState(null)
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 


  const fetchTopStores = useCallback(async () => {
    try {
      // TODO - SET MOUNTED?
      const topList = await sendRequest('/api/top')
      setTopList(topList)
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    fetchTopStores()
  }, [fetchTopStores])
  console.log(topList)


  return (

    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

    <SearchHeader />

      <div style={{paddingTop: 30, paddingBottom: 30, width: '80%', height: 'auto' }}> 
        <div className={classes.hotBanner}>
          <Divider className={classes.hotDivider} />
          <Typography variant="h5" className={classes.hotTitle}>
            Hot List <WhatshotIcon />
          </Typography>
          <Divider className={classes.hotDivider}/>

        </div>

        {topList && <TopList topList={topList}/>}
        {!topList && <StoreCardLoad />}
      </div>
    </div>

  );
}
export default Homepage