import React, { useRef, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import useScript from '../../hooks/useScript'
import { ScriptLoadContext } from '../../context/scriptLoadContext'
import StoreList from '../../../store/components/StoreList';
import { renderToString } from 'react-dom/server'
import { Typography } from '@material-ui/core';
import RatingBar from './RatingBar';
import StoreCardSimple from '../../../home/components/StoreCardSimple'
import CardActionArea from '@material-ui/core/CardActionArea'
import Link from '@material-ui/core/Link'
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
    ratingsQuantity: number
    ratingsAverage: number
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
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }

}));

const Map: React.FC<MapProps> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const scriptLoad= useContext(ScriptLoadContext)

  // const [loaded, error] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`)

  // console.log(loaded)

  const mapRef = useRef()
  
  const { center, zoom, storeList, pin } = props

  // const storeHandler = (slug: any) => (e: any) => {
  //   e.preventDefault()
  //   history.push(`/store/${slug}`)
  // }

  let map:google.maps.Map<Element> | google.maps.StreetViewPanorama
  
  // useEffect will run after the jsx has rendered and the connection with mapRef will have been established by the time it runs
  useEffect(()=> { 
    if (!scriptLoad.scriptLoaded) {
      return
    } 
  
    
    map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom
      })
    let marker: any, i: number

    
    // let infowindow = new google.maps.InfoWindow({
    //   content: `<div>Good</div>`
    // })
    var infowindow = new google.maps.InfoWindow({ maxWidth: 250 })
    if (pin === 'single') {
      console.log('pin')
      marker = new window.google.maps.Marker({
        position: center, 
        map: map
      })
    }
    if (pin === 'multiple' && storeList) {

      for (i = 0; i < storeList.length; i++) { 
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
          // const storeHandler = () => {
          //   console.log('?')
          //   history.push(`/store/${storeList[i].slug}`)
          // }
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(renderToString(
              <div >
                {/* <StoreCardSimple store={storeList[i]}/> */}
                <div style={{ display: 'flex' }}>
                    <img alt="image" src={storeList[i].image} style={{ width: 50, height: 50, borderRadius: 3, marginRight: 10 }}  />
                <Link 
                  //${window.location.host}
                  href={`/#/store/${storeList[i].slug}`}
                  color="inherit"
                  style={{ cursor: 
                  "pointer" }}
                  >
                    <Typography variant="h6" >{storeList[i].name}</Typography>
          
                </Link>
                </div>
                <RatingBar  readOnly={true} rating={storeList[i].ratingsAverage}/><Typography style={{ fontWeight: 'bold' }}>{storeList[i].ratingsQuantity? storeList[i].ratingsQuantity : 0} {!storeList[i].ratingsQuantity || storeList[i].ratingsQuantity < 2? 'Review' : 'Reviews'}</Typography>
                <Typography>{storeList[i].priceRange}</Typography>
                <Typography variant='caption' style={{ color: '#808080' }}>{storeList[i].address}</Typography>
              </div>
            ));
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