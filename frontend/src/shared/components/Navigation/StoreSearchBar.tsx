
import React, { useEffect, useState, useCallback } from 'react'
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
  

  const fetchStoreSuggestion = useCallback(async (active) => {
    try {
      if (inputValue.length > 0) {

        const storeList = await sendRequest('/api/search', 'POST', JSON.stringify({
          query: inputValue
        }), { 
      
          'Content-Type': 'application/json'
        })
        // TODO - REDUCE RERENDERING
        if (active) {
          setOptions(storeList)
          // setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
        }
      }
      // const storeNameList = storeList.map((store:any) => store.name)
      // console.log(storeNameList)
      
    } catch (e) {
      console.log(e)
    }
  }, [inputValue])

  useEffect(() => {
    let active = true;

    // if (!loading) {
    //   return undefined;
    // }
    
    fetchStoreSuggestion(active)
    // cleanup function
    return () => {
      active = false;
    };
  }, [fetchStoreSuggestion]);

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
    
      style={{ width: 300 }}
      size="small"
      freeSolo
      // onOpen={() => {
      //   setOpen(true);
      // }}
      // onClose={() => {
      //   setOpen(false);
      // }}
      // getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option? option.name : null}
      
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
            <div style={{ display: 'flex' }}>

            <img 
              
              style={{ width: 40, height: 40, borderRadius: 3, marginRight: 10 }}
              src={option.image? `/api/${option.image}` : "https://images.unsplash.com/photo-1506368144590-cf6438f1cdb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"}/>
              <div >
              <Typography>{option.name}</Typography>
              <Typography variant='caption' style={{ color: '#808080' }}>{option.address}</Typography>
              </div>
            </div>
      


          </Link>


        )
      }}
    />
  </>
  )
}
export default StoreSearchBar



