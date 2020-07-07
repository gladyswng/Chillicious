
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHttpClient } from '../../../shared/hooks/http-hook'



interface StoreSearchBarProps {

}




const StoreSearchBar: React.FC<StoreSearchBarProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0
  const [inputValue, setInputValue] = useState('')
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 
  console.log(inputValue)

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    console.log('next')
 const fetchStoreSuggestion = async () => {
      console.
   log('ran')
      try {
        const storeList = await sendRequest('/api/search', 'POST', JSON.stringify({
          query: inputValue
        }), { 
      
          'Content-Type': 'application/json'
        })
        const storeNameList = storeList.map((store:any) => store.name)
        console.log(storeNameList)
        if (active) {
          setOptions(storeNameList)
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

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="store-search"
      freeSolo
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      // getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
        
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
export default StoreSearchBar