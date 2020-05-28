import React from 'react'
import StoreForm from '../components/StoreForm'
import Typography from '@material-ui/core/Typography';
import Layout from '../../util/Layout'
interface AddStoreProps {

}

const AddStore: React.FC<AddStoreProps> = ({}) => {
    return (
     
        <div style={{ marginTop: 80, width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5">
          Add Store
          </Typography>
          <StoreForm />
        </div>


    );
}
export default AddStore