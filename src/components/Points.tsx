import React, { useState, useEffect, useRef } from 'react';
import proj4 from 'proj4'
import Map from 'ol/Map';
import { GeoJSON, KML } from 'ol/format';
import { Vector as VectorSource, Stamen } from 'ol/source';
import { Tile as TileLayer, Heatmap, Vector as VectorLayer, WebGLPoints as WebGLPointsLayer } from 'ol/layer';
import { OSM, XYZ } from 'ol/source';
import View from 'ol/View';
import { register } from 'ol/proj/proj4'
import { Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { LiteralStyle } from 'ol/style/LiteralStyle'
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction'
import GeometryType from 'ol/geom/GeometryType';
import { predefinedStyles } from '../styles';
import MapBase from './MapBase'

// type Style = {
//   symbol: {
//     symbolType: string,
//     src: string,
//     size: [number, number],
//     color: string,
//     rotateWithView: boolean,
//     offset: [number, number]
//   }
// }

const vectorSource = new VectorSource({
  url: 'https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson',
  format: new GeoJSON()
})

const Points = () => {
  const [map, setMap] = useState<Map>()
  const [LiteralStyle, setLiteralStyle] = useState<LiteralStyle>()
  const [pointsLayer, setPointsLayer] = useState<WebGLPointsLayer>()
  const [prevLayer, setPrevLayer]= useState<WebGLPointsLayer>()
  const [editorText, setEditorText] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')
  useEffect(() => {
    let olMap = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })

    setMap(olMap)
  }, [])

  useEffect(()=>{
    if(pointsLayer instanceof WebGLPointsLayer){
      map?.addLayer(pointsLayer)
    }
  }, [pointsLayer])

  
  useEffect(()=>{
    if(prevLayer instanceof WebGLPointsLayer){
      map?.removeLayer(prevLayer)
      prevLayer.dispose()
    }
  }, [prevLayer])

  const refreshLayer = (newStyle: LiteralStyle) => {
    let previousLayer = pointsLayer
    console.log(vectorSource)
    setPointsLayer(new WebGLPointsLayer({
      source: vectorSource,
      style: newStyle,
      disableHitDetection: true
    }))
    setPrevLayer(previousLayer)
    setLiteralStyle(newStyle)
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let styleChose = e.target.value as keyof typeof predefinedStyles
    let newLiteralStyle: LiteralStyle = predefinedStyles[styleChose] as LiteralStyle
    setEditorText(JSON.stringify(newLiteralStyle, null, 2))
    try {
      refreshLayer(newLiteralStyle)
      setErrorMsg('')
    } catch (e) {
      setErrorMsg(e.message)
    }
    
  }

  return (
    <MapBase>
      <select onChange={onSelectChange}>
        <option value="icons">Icons</option>
        <option value="triangles">Triangles, color related to population</option>
        <option value="triangles-latitude">Triangles, color related to latitude</option>
        <option value="circles">Circles, size related to population</option>
        <option value="circles-zoom">Circles, size related to zoom</option>
        <option value="rotating-bars">Rotating bars</option>
      </select>
      <div>{editorText}</div>
      <div>{errorMsg}</div>
    </MapBase>
  )
}

export default Points