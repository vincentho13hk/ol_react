import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
import { Icon, Style } from 'ol/style'
import GeometryType from 'ol/geom/GeometryType'
import * as FileSaver from 'file-saver'
import JSONFeature from 'ol/src/format/JSONFeature'
import { useGeographic, toLonLat, fromLonLat } from 'ol/proj';
import { transformExtent } from 'ol/proj'

import { featureFromServer } from '../models/feature'

let osm = new TileLayer({
  source: new OSM()
})

let drawSource = new VectorSource({ wrapX: false })

let iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: "images/map-marker-red.png"
  })
})



const AddPoints = () => {
  // useGeographic()
  const [coordinates, setCoordinates] = useState<string>('')
  const [draw, setDraw] = useState<Draw>(new Draw({
    source: drawSource,
    type: GeometryType.POINT
  }))
  const [map, setMap] = useState<Map>()
  const [features, setFeatures] = useState<Feature[]>([])
  const [selectedFeature, setSelectedFeature] = useState<featureFromServer>()
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [interactionType, setInteractionType] = useState<GeometryType | 'None'>('None')
  // const hongkong = [114.183334, 22.316668]
  const kt = [12715534.985606384, 2549026.4299339056]
  useEffect(() => {
    const getFeaturesFromServer = async () => {
      let resultfromServer = await axios.get('https://localhost:5001/api/feature')
      let featuresfromServer: featureFromServer[] = resultfromServer.data
      console.log(featuresfromServer)
      featuresfromServer.forEach(feature => {
        let newFeatureGeometry = new Point([feature.long, feature.lat]).transform('EPSG:4326', 'EPSG:3857')
        let featureToAdd = new Feature({ geometry: newFeatureGeometry, name: feature.name, id: feature.id})
        featureToAdd.setStyle(iconStyle)
        setFeatures([...features, featureToAdd])
        drawSource.addFeature(featureToAdd)
      });
    }

    getFeaturesFromServer()
    let vector = new VectorLayer({
      source: drawSource
    })

    let olMap = new Map({
      target: "map",
      layers: [osm, vector],
      view: new View({
        // center: fromLonLat(hongkong),
        center: kt,
        zoom: 17.8,
        minZoom: 11,
        maxZoom: 19,
        extent: transformExtent([113.76, 22.13, 114.51, 22.58], 'EPSG:4326', 'EPSG:3857')
      })
    })

    let drawInteraction: Draw = new Draw({
      source: drawSource,
      type: GeometryType.POINT
    })

    drawInteraction.on('drawend', function (e) {
      let feature = e.feature
      let point: Point = feature.getGeometry() as Point;
      let coordinates: Coordinate = toLonLat(point?.getCoordinates())
      setCoordinates(coordinates.join())
      setFeatures(features => [...features, feature])
    })
    setDraw(drawInteraction)
    // select interaction
    let selectInteraction: Select = new Select({
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "images/map-marker-inside-chartreuse-icon.png"
        })
      })
    })
    selectInteraction.on("select", async function (e) {
      if (e.selected.length > 0) {
        let feature = e.selected[0]
        let point: Point = feature.getGeometry() as Point;
        let pointCoordinates: Coordinate = toLonLat(point?.getCoordinates())
        // console.log(pointCoordinates)
        // console.log(coordinates)
        setCoordinates(pointCoordinates.join())

        let featureProperties = feature.getProperties()
        let result = await axios.get(`https://localhost:5001/api/feature/${featureProperties["id"]}`)
        console.log(featureProperties)
        setSelectedFeature(result.data)
        setOpenDrawer(true)
      }

    })
    selectInteraction.un("select", () => {
      setOpenDrawer(false)
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

  useEffect(() => {
    map?.on("moveend", () => {
      console.log(map?.getView().getZoom(), map?.getView().getCenter())
      //console.log(transformExtent([800000, 800000, 864000, 847000], 'EPSG:4326', 'EPSG:3857'))
    })
  })

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == 'None' || e.target.value == GeometryType.POINT) {
      setInteractionType(e.target.value)
    }
  }

  const downloadFile = (filename: string, text: any) => {
    let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, filename)
  }

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    let allLayers = map?.getLayers()
    let geom: Feature<Geometry>[] = []
    allLayers?.forEach(layer => {
      if (layer instanceof VectorLayer) {
        let vectorSource = layer.getSource()
        vectorSource.forEachFeature((feature: Feature) => {
          geom.push(new Feature(feature?.getGeometry()?.clone().transform('EPSG:3857', 'EPSG:4326')))
        })

      }
    });


    let format = new GeoJSON();
    // let featuresToPost = format.readFeatures(features)
    features.forEach((feature, key) => {
      console.log(feature)
      let point: Point = feature.getGeometry() as Point;
      let pointCoordinates: Coordinate = toLonLat(point?.getCoordinates())
      let featureToPost = {
        name: `feature${key}`,
        long: pointCoordinates[0],
        lat: pointCoordinates[1],
        FeatureType: feature.getGeometry()?.getType()
      }
      axios.post('https://localhost:5001/api/feature', featureToPost)
    })
    // console.log(features)
    // downloadFile('features.json', features)
  }
  return (
    <MapBase feature={selectedFeature} openDrawer={openDrawer}>
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