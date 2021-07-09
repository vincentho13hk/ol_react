import React, { useEffect, useState } from 'react'
import { Tile } from 'ol/layer'
import { OSM, TileImage } from 'ol/source'
import Map from 'ol/Map'
import { View } from 'ol'
import { transformExtent } from 'ol/proj'

let googleMapLayer = new Tile({ source: new TileImage({ url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' }) })
let osm = new Tile({source: new OSM()})
const OL_Gmap = () => {
  const [map, setMap] = useState<Map>()
  useEffect(() => {
    let olMap = new Map({
      target: "map",
      layers: [
        osm
      ],
      view: new View({
        // center: fromLonLat(hongkong),
        zoom: 8,
        // minZoom: 11,
        // maxZoom: 19,
        // extent: transformExtent([113.76, 22.13, 114.51, 22.58], 'EPSG:4326', 'EPSG:3857')
      })
    })
    setMap(olMap)
  }, [])

  return (
    <div>
      <h2>OL Google Map</h2>
      <div id="map" style={{
        height: "600px",
        width: "100%"
      }}></div>
    </div>
  )
}

export default OL_Gmap