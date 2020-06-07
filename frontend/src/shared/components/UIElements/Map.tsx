import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

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
  const mapRef = useRef()
  let map
  
  const { center, zoom } = props
  console.log(center, zoom)
  

  
  // useEffect will run after the jsx has rendered and the connection with mapRef will have been established by the time it runs
  useEffect(()=> { 
    console.log('map')
  
     map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom
      })
    const marker = new window.google.maps.Marker({
        position: center, 
        map: map
      })

  
    
  }, [center, zoom])

  
    return (
      <div 
      ref={mapRef} 
      style={props.style} 
      className={classes.map}>
      </div>


    );
}
export default Map