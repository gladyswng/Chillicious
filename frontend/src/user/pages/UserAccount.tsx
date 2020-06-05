import React from 'react'

import Typography from '@material-ui/core/Typography';

interface UserAccountProps {

}

const UserAccount: React.FC<UserAccountProps> = ({}) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems:'center', margin: 0 }}>
        <Typography variant="h4">User Account</Typography>
       
   
      </div>
    );
}
export default UserAccount