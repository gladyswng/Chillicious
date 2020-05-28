import React from 'react'
import UserForm from '../components/UserForm'

interface RegistrationProps {

}

const Registration: React.FC<RegistrationProps> = ({}) => {
    return (
      <div>
        Register Account

        <UserForm />
      </div>
    );
}
export default Registration