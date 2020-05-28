import React from 'react'
import UserForm from '../components/UserForm'

import Typography from '@material-ui/core/Typography';

interface UserAccountProps {

}

const UserAccount: React.FC<UserAccountProps> = ({}) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems:'center', margin: 0 }}>
        <Typography variant="h4">User Account</Typography>
        <UserForm />
   
      </div>
    );
}
export default UserAccount