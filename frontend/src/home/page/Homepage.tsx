import React, { useCallback, useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Layout from '../../util/Layout'
import SearchHeader from '../components/SearchHeader'
import TopList from '../components/TopList'




interface HomePageProps {

}

const Homepage: React.FC<HomePageProps> = ({}) => {
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
        {topList && <TopList  topList={topList}/>}
        </div>

    );
}
export default Homepage