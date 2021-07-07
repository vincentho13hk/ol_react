import L, { CRS } from 'leaflet'
import { useEffect } from 'react'
import MapFactory, { MapOption, GoogleMap, GoogleMapFactory } from '../models/mapFactory'


const MapFactoryComponent = () => {
  useEffect(() => {
    const initMap = () => {
      let myMapFactory = new GoogleMapFactory()
      let map = myMapFactory.Build({
        x: 121,
        y: 23.5,
        coordinate: 'EPSG3857',
        zoom: 7,
        id: 'map'
      })
      map.Init()
      // let GMap = new google.maps.Map(document.getElementById('gmap') as HTMLElement, {
      //   center: { lat: 23.5, lng: 121 },
      //   zoom: 7
      // });
      // console.log(GMap)
    }
    google.maps.event.addDomListener(window, 'load', initMap);



  }, [])

  return (
    <>
      <h2>Map Factoroy</h2>
      <div id='map' style={{ width: 500, height: 500 }}></div>
      {/* <div style={{ width: 500, height: 500 }} id="gmap" /> */}
    </>
  )
}

export default MapFactoryComponent