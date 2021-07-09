import L from "leaflet";
import 'leaflet.markercluster';
import "leaflet.markercluster/dist/MarkerCluster.css";
import './LeafletMap.css'
import React from "react";
import { useEffect, useState } from "react";

const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const IconLogic = (number: number) => {  // 數量
  let className = 'cluster';
  let point;

  if (number < 100) {
      className += ' cluster-green';
      point = L.point(25, 25);
  } else if (number < 200) {
      className += ' cluster-yellow';
      point = L.point(30, 30);
  } else {
      className += ' cluster-red';
      point = L.point(35, 35);
  }

  return {
      className: className,
      point: point
  }
}

const LeafletMap = () => {
  const [points, setPoints] = useState<{ x: number, y: number }[]>([])
  const markers = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
      const number = cluster.getChildCount();
      let icon = IconLogic(number)
      let divElement = document.createElement('div')
      divElement.innerHTML = String(number)
      return L.divIcon({
        html: divElement, className:
        icon.className, iconSize: icon.point
      });
    }
  })

  markers.on('clusterclick', function (e) {
    const number = e.layer.getAllChildMarkers().length;  

    console.log('群聚數量: ' + number);
});

  const CreatePoint = (points: { x: number, y: number }[], count: number, xRange: number[], yRange: number[]) => {
    for (let i: number = 0; i < count; i++) {
      let long = random(xRange[0], xRange[1])
      let lat = random(yRange[0], yRange[1])

      points.push({ x: long, y: lat })
    }
  }

  useEffect(() => {
    let element = document.getElementById('lmap')
    if (element != null && element instanceof HTMLElement) {
      const LMap = L.map(element, {
        center: [23.5, 121],  // 中心點
        zoom: 7,  // 縮放層級
        crs: L.CRS.EPSG3857,  // 座標系統
      })
      let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

      L.tileLayer(url, {
        maxZoom: 18,
        id: 'osm',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(LMap);  // 新增底圖

      CreatePoint(points, 1000, [120.5, 121.4], [23, 24.6])

      points.map(item => L.marker(new L.LatLng(item.y, item.x))
        .bindPopup(`<p>long: ${item.x}</p><p>lat: ${item.y}</p>`)
      ).forEach(item => markers.addLayer(item))

      LMap.addLayer(markers)
    }


  }, [])

  return (
    <>
      <h2>Leaflet Map</h2>
      <div id="lmap" style={{ height: '500px' }}></div>
    </>
  )
}

export default LeafletMap