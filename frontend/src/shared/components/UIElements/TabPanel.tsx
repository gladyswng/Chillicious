import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {

  children: any
  index: number
  value: number
  id: string
}



const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, id } = props;
    return (
      <div
      role="tabpanel"
      hidden={value !== index}
      id={id}
      aria-labelledby={id}
      
    >
      {value === index && (
        <Box p={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {children}
        </Box>
      )}
    </div>
    );
}




export default TabPanel