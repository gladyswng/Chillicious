import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useScript from '../../hooks/useScript'


interface MapProps {
  style?: object
  center: {
    lat: number
    lng: number
  }
  zoom: number
}
const useStyles = makeStyles((theme) => ({
  map: {
    height: '100%',
    width: '100%'
  }

}));

const Map: React.FC<MapProps> = (props) => {
  const classes = useStyles()

  const [loaded, error] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`)

  console.log(loaded)

  const mapRef = useRef()
  let map
  
  const { center, zoom } = props



  
  // useEffect will run after the jsx has rendered and the connection with mapRef will have been established by the time it runs
  useEffect(()=> { 
    if (!loaded) {
      return
    } 
    
      map = new window.google.maps.Map(mapRef.current, {
         center: center,
         zoom: zoom
       })
     const marker = new window.google.maps.Marker({
         position: center, 
         map: map
       })
  
  
    
  }, [center, zoom, loaded, error])

  
    return (
      <div style={{ width: '50%', height: '100%' }}>

        {loaded && !error && (
        <div 
        ref={mapRef} 
        style={props.style} 
        className={classes.map}>
        </div>
        )}
      </div>

     


    );
}
export default Map