import React from 'react'
import Layout from '../../util/Layout'
import SearchHeader from '../components/SearchHeader'
import RecentReviewed from '../components/RecentReviewed'




interface HomePageProps {

}

const Homepage: React.FC<HomePageProps> = ({}) => {

    return (
    
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

        <SearchHeader />
        <RecentReviewed />
          <div>Homepage</div>
          <div>Homepage</div>
          <div>Homepage</div>
          <div>Homepage</div>
          <div>Homepage</div>
          <div>Homepage</div>
          <div>Homepage</div>
        </div>

    );
}
export default Homepage