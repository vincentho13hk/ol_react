import React, { useEffect, useState } from 'react'
import Map from 'ol/Map'
import { GeoJSON } from 'ol/format'
import { Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import PointerInteraction from 'ol/interaction/Pointer';
import { Point } from 'ol/geom'
import { OSM } from 'ol/source'
import { Coordinate, toStringXY } from 'ol/coordinate'
import View from 'ol/View'
import { Draw, Select } from 'ol/interaction'
import MapBase from './MapBase'
import Geometry from 'ol/geom/Geometry'
import Feature from 'ol/Feature'
import GeometryType from 'ol/geom/GeometryType'
import * as FileSaver from 'file-saver'
import JSONFeature from 'ol/src/format/JSONFeature'

let osm = new TileLayer({
  source: new OSM()
})

let drawSource = new VectorSource({ wrapX: false })
let vector = new VectorLayer({
  source: drawSource
})

const AddPoints = () => {
  const [coordinates, setCoordinates] = useState<string>('')
  const [draw, setDraw] = useState<Draw>(new Draw({
    source: drawSource,
    type: GeometryType.POINT
  }))
  const [map, setMap] = useState<Map>()
  const [interactionType, setInteractionType] = useState<GeometryType | 'None'>('None')
  useEffect(() => {
    let olMap = new Map({
      target: "map",
      layers: [osm, vector],
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4
      })
    })

    let drawInteraction: Draw = new Draw({
      source: drawSource,
      type: GeometryType.POINT
    })

    drawInteraction.on('drawend', function (e) {
      let feature = e.feature
      let point: Point = feature.getGeometry() as Point;
      let coordinates: Coordinate = point?.getCoordinates()
      setCoordinates(coordinates.toString())
    })
    setDraw(drawInteraction)
    // select interaction
    let selectInteraction: Select = new Select()
    selectInteraction.on("select", function (e) {
      if (e.selected.length > 0) {
        let feature = e.selected[0]
        let point: Point = feature.getGeometry() as Point;
        let coordinates: Coordinate = point?.getCoordinates()
        // console.log(coordinates)
        setCoordinates(toStringXY(coordinates))
      }

    })

    olMap.addInteraction(selectInteraction)
    setMap(olMap)
  }, [])

  // switch interaction type
  useEffect(() => {
    switch (interactionType) {
      case 'None':
        map?.removeInteraction(draw)
        break
      case 'Point':
        map?.addInteraction(draw)
    }
  }, [interactionType])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == 'None' || e.target.value == GeometryType.POINT) {
      setInteractionType(e.target.value)
    }
  }

  const downloadFile = (filename: string, text: any) => {
    let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename)
  }

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    let allLayers = map?.getLayers()
    let allFeatures: Feature<Geometry>[] = []
    allLayers?.forEach(layer => {
      if(layer instanceof VectorLayer){
        allFeatures = layer.getSource().getFeatures()
        // console.log(allFeatures)

        // fs.writeFileSync(path.join(process.env.NODE_ENV, 'data', 'features.json'), allFeatures)
        
      }
    });

    let format = new GeoJSON();
    let features = format.writeFeatures(allFeatures)
    
    console.log(features)
    downloadFile('features.json', features)
  }
  return (
    <MapBase>
      <select onChange={handleSelectChange}>
        <option value='None'>None</option>
        <option value='Point'>Point</option>
      </select>
      <div>{coordinates}</div>
      <div>
        {interactionType}
      </div>
      <button onClick={handleSave}>Save</button>

    </MapBase>
  )
}

export default AddPoints