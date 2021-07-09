import React, { useState, useEffect, useRef } from 'react';
import proj4 from 'proj4'
import Map from 'ol/Map';
import { GeoJSON, KML } from 'ol/format';
import { Vector as VectorSource, Stamen, TileImage } from 'ol/source';
import { Tile, Heatmap, Vector as VectorLayer } from 'ol/layer';
import { OSM, XYZ } from 'ol/source';
import View from 'ol/View';
import { register } from 'ol/proj/proj4'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction'
import GeometryType from 'ol/geom/GeometryType';
import MapBase from './MapBase';

// let vector = new Heatmap({
//     source: new Vector({
//         url: 'https://openlayers.org/en/v4.6.5/examples/data/kml/2012_Earthquakes_Mag5.kml',
//         format: new KML({
//             extractStyles: false
//         })
//     }),
// })

let raster = 
new Tile({
  // source: new Stamen({
  //     layer: 'toner'
  // })
  source: new OSM()
  // new Tile({ source: new TileImage({ url: 'http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' }) })
})

let drawSource = new VectorSource({ wrapX: false })

let vector = new VectorLayer({
  source: drawSource
})

const Interaction = () => {
  // proj4.defs([["EPSG:3825", "+proj=tmerc +lat_0=0 +lon_0=119 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"],
  // ["EPSG:3826", "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"],
  // ["EPSG:3827", "+proj=tmerc +lat_0=0 +lon_0=119 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA +units=m +no_defs"],
  // ["EPSG:3828", "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA +units=m +no_defs"]
  // ])
  // register(proj4)
  

  

  const [map, setMap] = useState<Map>()


  const mapElement = useRef<HTMLDivElement|null>(null)

  const [typeGeom, setType] = useState<GeometryType|'None'>('None')
  
  
  useEffect(() => {
    let olMap = new Map({
      target: "map",
      layers: [raster, vector],
      // view: new View({
      //     projection: 'EPSG:3826',
      //     center: [248170.826, 2652129.977],
      //     zoom: 16
      // })
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4
      })
    })

    setMap(olMap)
    setType(GeometryType.POINT)
  }, [])
  
  let geom: GeometryType = GeometryType[typeGeom as keyof typeof GeometryType]
  // let draw = new Draw({
  //   source: drawSource,
  //   type: GeometryType.POINT
  // })
  // const [drawInteraction, setDrawInteraction] = useState<Draw>(draw)
  
  
    // register(proj)
  useEffect(() => {
    map?.on("moveend", () => {
      console.log(map?.getView().getZoom())
      console.log(typeGeom)
    })
  })

  useEffect(()=> {
    map?.removeInteraction(draw);
    addInteraction();
  }, [typeGeom])
  let draw: Draw
  
  const addInteraction = () => {
    console.log(typeGeom)
    if (typeGeom !== 'None') {
      //let typedStr: keyof typeof GeometryType
      //typedStr = typeGeom as keyof typeof GeometryType
      //let geom: GeometryType = GeometryType[typedStr]
      //console.log(GeometryType[typedStr])
      //console.log(geom)
      draw = new Draw({
        source: drawSource,
        type: typeGeom
      })
      // setDrawInteraction(draw)
      // if (drawInteraction instanceof Draw) {
      map?.addInteraction(draw)
      // }
    }
  }


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value.toUpperCase())
    //if((Object.values(GeometryType) as any).includes(e.target.value)){
      setType(e.target.value as GeometryType)
    //}
  }

  return (
    <MapBase>
      <select onChange={handleSelectChange}>
        {/* 點 */}
        <option value="Point">Point</option>
        {/* 線 */}
        <option value="LineString">LineString</option>
        {/* 多邊形 */}
        <option value="Polygon">Polygon</option>
        {/* 正圓形 */}
        <option value="Circle">Circle</option>
        {/* 沒有圖形 */}
        <option value="None">None</option>
      </select>
    </MapBase>
  )
}

export default Interaction;
