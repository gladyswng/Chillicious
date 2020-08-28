import React, { useRef, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useScript from '../../hooks/useScript'
import { ScriptLoadContext } from '../../context/scriptLoadContext'
import StoreList from '../../../store/components/StoreList';

interface Store {
  id: string
    name: string
    image: string
    priceRange: string
    address: string
    slug: string
    location: {
      coordinates: [number, number]
    }
    ratingsQuantity?: number
    ratingsAverage?: number
}
interface MapProps {
  style?: React.CSSProperties
  center: {
    lat: number
    lng: number
  }
  zoom: number
  locations?: {
    lat: number
    lng: number
  }[]
  storeList?: Store[]
  pin: 'single' | 'multiple'

}
const useStyles = makeStyles((theme) => ({
  map: {
    height: '100%',
    width: '100%'
  },
  mapWrapper: {
    width: '40%', 
    height: 220,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }

}));

const Map: React.FC<MapProps> = (props) => {
  const classes = useStyles()
  const scriptLoad= useContext(ScriptLoadContext)

  // const [loaded, error] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`)

  // console.log(loaded)

  const mapRef = useRef()
  
  const { center, zoom, storeList, pin } = props
  
  let map:google.maps.Map<Element> | google.maps.StreetViewPanorama
  
  // useEffect will run after the jsx has rendered and the connection with mapRef will have been established by the time it runs
  useEffect(()=> { 
    if (!scriptLoad.scriptLoaded) {
      console.log('????')
      return
    } 
    console.log('map')
    
    map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom
      })
    let marker: any, i: number

    
    // let infowindow = new google.maps.InfoWindow({
    //   content: `<div>Good</div>`
    // })
    var infowindow = new google.maps.InfoWindow()
    if (pin === 'single') {
      console.log('pin')
      marker = new window.google.maps.Marker({
        position: center, 
        map: map
      })
    }
    if (pin === 'multiple' && storeList) {
      for (i = 0; i < storeList.length; i++) { 
        console.log(storeList[i])
        marker = new google.maps.Marker({
          position: {
            lat: storeList[i].location.coordinates[1],
            lng: storeList[i].location.coordinates[0]
          },
          map: map
        })
  
        // marker.addListener('click', function() {
        //   infowindow.open(map, marker);
        // })
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(`<div>Good</div>`);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
    }
  
    
  }, [center, zoom, storeList])

  
    return (
      <div className={classes.mapWrapper} style={props.style}>

        {scriptLoad.scriptLoaded && !scriptLoad.scriptLoadError && (
        <div 
        ref={mapRef} 
        className={classes.map}
        >
        </div>
          )} 
      </div>

     


    );
}
export default Map