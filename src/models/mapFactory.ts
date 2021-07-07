import L from 'leaflet'
abstract class Map {
  x: number
  y: number
  coordinate: string
  zoom: number
  id: string
  map: any
  title?: string
  constructor(option: MapOption) {

    this.x = option.x;  // this 指向當下由 GMap 建立的物件
    this.y = option.y;
    this.coordinate = option.coordinate;
    this.zoom = option.zoom;
    this.id = option.id;
    this.title = option.title
  }
  abstract Init(): any
}

export interface MapOption {
  x: number
  y: number
  coordinate: string
  zoom: number
  id: string
  title?: string
}

export class GoogleMap extends Map {

  Init() {  // 建立一個 Init 方法來初始化地圖
    console.log(`Init`)
    console.log(this.id)
    const element = document.getElementById(this.id)
    console.log(element)
    if (element != null) {
      console.log('here')
      let GMap = new google.maps.Map(element, {
        center: { lat: this.y, lng: this.x },
        zoom: this.zoom,
      })
      this.map= GMap
      return GMap
    }
  };
}

export class LeafletMap extends Map {
  Init() {
    const element = document.getElementById(this.id)
    if (element != null && this.coordinate == (typeof L.CRS).toString()) {
      let LMap = L.map(element, {
        center: [this.y, this.x],
        zoom: this.zoom,
        //@ts-ignore 
        crs: L.CRS[this.coordinate],
      });

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        id: 'mapbox.streets'
      }).addTo(LMap);
      this.map = LMap
      return LMap;
    }
  }


}

abstract class MapFactory {
  // Build(mapType: Map, option: MapOption) {
  //   let map: Map
  //   map = mapType(option)
  //   return map
  // }
  abstract Build(option: MapOption): Map
}

export class GoogleMapFactory extends MapFactory {
  Build(option: MapOption): Map {
    return new GoogleMap(option)
  }
}


export class LeafletMapFactory extends MapFactory {
  Build(option: MapOption): Map {
    return new LeafletMap(option)
  }
}


export default MapFactory