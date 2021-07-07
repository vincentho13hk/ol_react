import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const ShowLine = (pointList: { x: number, y: number }[] = [], map: any, style: H.map.SpatialStyle.Options) => {
  let lineString = new H.geo.LineString();
  pointList.forEach(item => {
    lineString.pushPoint({ lat: item.y, lng: item.x });
  });
  map.addObject(new H.map.Polyline(  // 新增Polyline並加入地圖
    lineString, { style: style }
  ));
  map.getViewModel().setLookAtData({  // 設定視線畫面為線的邊界
    bounds: lineString.getBoundingBox()
  });
}

export const calculateRouteFromAtoB = (platform: any, HMap: H.Map) => {
  let router = platform.getRoutingService(null, 8),
    routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'car',
      origin: '22.31221,114.226423',   // APM
      destination: '22.319273,114.169375',   // MK
      return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
    };
  router.calculateRoute(routeRequestParams,
    function (result: any) {
      console.log(result)
      let poly = (H.geo.LineString as any).fromFlexiblePolyline(  // decode
        result.routes[0].sections[0].polyline).getLatLngAltArray();
      console.log(poly)
      let arr = [];
      for (let i = 0; i < poly.length; i += 3) {  // 陣列重組
        arr.push({ y: poly[i], x: poly[i + 1] });
      }
      // 畫出導航路線
      ShowLine(arr, HMap, { lineWidth: 8, strokeColor: 'rgba(0, 128, 255, 0.7)' });
    },
    function (error: Error) { console.log(error) })
}

const HereMap = () => {
  const mapRef = useRef(null)
  const [map, setMap] = useState()

  useLayoutEffect(() => {
    const H = (window as any).H;
    // console.log(H)
    const platform = new H.service.Platform({
      apikey: "{API_KEY}"
    });
    console.log(platform)
    const defaultLayers = platform.createDefaultLayers();

    const HMap = new H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 23.5, lng: 121 },
        zoom: 7,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(HMap));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(HMap, defaultLayers);

    // PloyLine
    let pointList = [{ x: 121.5, y: 24 }, { x: 121.2, y: 23.8 }, { x: 121, y: 23.5 }]
    ShowLine(pointList, HMap, { lineWidth: 8, strokeColor: '#E488AE' })

    // Routing
    calculateRouteFromAtoB(platform, HMap)

    setMap(HMap);
    return (() => {
      HMap.dispose()
    })
  }, [])

  return (
    <>
      <h2>HereMap</h2>
      <div ref={mapRef} style={{ height: "500px" }} />;
    </>
  )
}

export default HereMap