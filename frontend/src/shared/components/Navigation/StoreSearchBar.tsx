
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHttpClient } from '../../../shared/hooks/http-hook'
import SearchIcon from '@material-ui/icons/Search'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'

interface StoreSearchBarProps {

}




const StoreSearchBar: React.FC<StoreSearchBarProps> = ({}) => {
  const history = useHistory()
  // const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  // const loading = open && options.length === 0
  const [inputValue, setInputValue] = useState('')
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 
  console.log(inputValue)
  console.log(options)

  useEffect(() => {
    let active = true;

    // if (!loading) {
    //   return undefined;
    // }
    
      const fetchStoreSuggestion = async () => {
      try {
        const storeList = await sendRequest('/api/search', 'POST', JSON.stringify({
          query: inputValue
        }), { 
      
          'Content-Type': 'application/json'
        })
        // const storeNameList = storeList.map((store:any) => store.name)
        // console.log(storeNameList)
        if (active) {
          setOptions(storeList)
          // setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
        }
        
      } catch (e) {
        console.log(e)
      }
    }
    fetchStoreSuggestion()
    // cleanup function
    return () => {
      active = false;
    };
  }, [inputValue]);

  // useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  const optionClickHandler = (storeSlug: string) => {
    history.push(`/store/${storeSlug}`)
  }
  return (
    <>
    
    <Autocomplete
      id="store-search"
    
      style={{ width: 250 }}
      size="small"
      freeSolo
      // onOpen={() => {
      //   setOpen(true);
      // }}
      // onClose={() => {
      //   setOpen(false);
      // }}
      // getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      loading={isLoading}
      renderInput={(params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <SearchIcon />
        <TextField
          style={{ backgroundColor: 'white', borderRadius: 4 }}
          {...params}
          placeholder='Search Store'
          variant="outlined"
          InputProps={{
            ...params.InputProps
          }}
        />
        
        </div>
      )}
      renderOption={(option) => {
        return (
          <Link 
          color='inherit'
          underline='none'
          onClick={ () => {
            optionClickHandler(option.slug)
          }}
          >
            <Typography>{option.name}</Typography>
        <Typography variant='body2'>{option.address}</Typography>

          </Link>


        )
      }}
    />
  </>
  )
}
export default StoreSearchBar









// const StoreSearchBar: React.FC<StoreSearchBarProps> = ({}) => {
//   const [open, setOpen] = useState(false)
//   const [options, setOptions] = useState([])
//   const [value, setValue] = React.useState(null)
//   const loading = open && options.length === 0
//   const [inputValue, setInputValue] = useState('')
//   const {isLoading, error, sendRequest, clearError} = useHttpClient() 
//   console.log(inputValue)
//   console.log(options)
//   useEffect(() => {
//     let active = true

//     if (!loading) {
//       return undefined;
//     }
//     if (inputValue === '') {
//       setOptions(value ? [value] : []);
//       return undefined;
//     }
//     console.log('next')
//  const fetchStoreSuggestion = async () => {
    
//       try {
//         const storeList = await sendRequest('/api/search', 'POST', JSON.stringify({
//           query: inputValue
//         }), { 
      
//           'Content-Type': 'application/json'
//         })
//         const storeNameList = storeList.map((store:any) => store.name)
//         console.log(storeNameList)
//         if (active) {
//           let newOptions: any[] = []
//           if (value) {
//             newOptions = [value]
//           }
//           if (storeNameList) {
//             newOptions = [...newOptions, ...storeNameList]
//           }
//           setOptions(newOptions)
//           // setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
//         }
        
//       } catch (e) {
//         console.log(e)
//       }
//     }
//     fetchStoreSuggestion()
//     // cleanup function
//     return () => {
//       active = false;
//     };
//   }, [inputValue]);

//   useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);

//   return (
//     <>
    
//     <Autocomplete
//       id="store-search"
//       freeSolo
//       style={{ width: 300 }}
//       open={open}
//       onOpen={() => {
//         setOpen(true);
//       }}
//       onClose={() => {
//         setOpen(false);
//       }}
//       // getOptionSelected={(option, value) => option.name === value.name}
//       getOptionLabel={(option) => option}
//       onChange={(event, newValue) => {
//         setOptions(newValue ? [newValue, ...options] : options);
//         setValue(newValue);
//       }}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//       }}
//       options={options}
//       loading={loading}
//       renderInput={(params) => (
//         <div style={{ display: 'flex' }}>
//         <SearchIcon />
//         <TextField
//           style={{ backgroundColor: 'white' }}
//           {...params}
        
//           variant="outlined"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//         </div>
//       )}
//     />
//   </>
//   )
// }
// export default StoreSearchBar