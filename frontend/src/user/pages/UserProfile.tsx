import React, { useState, useRef } from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface UserProps {

}

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

const UserProfile: React.FC<UserProps> = ({}) => {
return (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    
    User Profile
   <div>Reviews</div>
   <div>Hearted</div>
  </div>
)
}


export default UserProfile











// interface Person {
//     firstName: string
//     lastName: string
// }

// interface Props {
//     text: string
//     ok?: boolean
//     i: number
//     fn: (bob: string) => string
//     obj: Person,
//     handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void 
// }

// // Reducer

// // type State = Todo[]
// // Array<Todo>
// // State equals an array of todos



// const User: React.FC<Props> = ({handleChange}) => {
//     const [count, setCount] = useState<number | null | undefined>(5)
//     const [obj, setObj] = useState<{ text: string }>({ text: 'hello' })
//     setObj({text: 'changed'})

//     const inputRef = useRef<HTMLInputElement>(null)


//     return (
//         <div>
//             <h2>User!</h2>
//             <input ref={inputRef} onChange={handleChange}/>
//         </div>
//     )
// }

// export default User