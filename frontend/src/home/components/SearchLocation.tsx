import React, { useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
// import useScript from '../../shared/hooks/useScript'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'

const autocompleteService: any = { current: null }

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));



const SearchLocation: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const [value, setValue] = useState<any>(null)
  const [inputValue, setInputValue] = useState<any>('');
  const [options, setOptions] = useState<any>([])
 
  // const [loaded, error] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`)

 

  const fetch = useMemo(
    () =>
      throttle((request:any, callback:any) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results: any) => {
      if (active) {
        let newOptions: any[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const searchHandler = () => {
    if(typeof value === 'string') {
      console.log(value)
      history.push(`/stores/${value}`)
    } else {
      history.push(`/stores/${value.description}`)
    }
  }
  const searchClickHandler = () => {
    if (value) {
      searchHandler()
    }
  }

  const searchKeyDownHanlder = (e: any) => {
    if (e.key === 'Enter' && value) {
      searchHandler()
    }
  }

  return (
    <Autocomplete
      id="google-map"
      style={{ borderRadius: 4 }}
      freeSolo
      fullWidth
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <div style={{ display: 'flex' }}>
          <Button onClick={searchClickHandler}>

           <SearchOutlinedIcon style={{ color: 'white'}} fontSize='large'/>
          </Button>
        <TextField {...params}
        style={{  backgroundColor: 'white', borderRadius: 4 }}
        placeholder='Search Place' 
        variant="outlined"
        onKeyDown={searchKeyDownHanlder}
        fullWidth />
        </div>
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}


export default SearchLocation
