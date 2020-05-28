import React from 'react'

import Header from '../shared/components/Navigation/Header'

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = (props) => {
    return (
      <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>

        <Header />
        {props.children}
      </div>


    );
}
export default Layout