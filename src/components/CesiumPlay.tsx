// import * as Cesium from 'cesium'
import { Viewer, Scene, Globe, Entity, CameraFlyTo, CesiumComponentRef } from "resium";
import { CesiumContext } from "resium";
import { Cartesian3, ProviderViewModel, Viewer as CesiumViewer } from "cesium";
import * as Cesium from 'cesium'
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useEffect, useRef, useState } from "react";
import NavigationMixin from "@znemz/cesium-navigation";
import "@znemz/cesium-navigation/dist/index.css";
import CesiumNavigation from "cesium-navigation-es6";

import OdenApp from '../config.json'
import CesiumNavigator from "./CesiumNavigator";

declare global {
  interface Window { CESIUM_BASE_URL: string; }
}
declare var CESIUM_BASE_URL: string;

interface CesiumPlayProps {
  DOP5KWmtsUrl?: boolean
}

window.CESIUM_BASE_URL = 'http://localhost:3001/cesium';
const BingMapsApiDefaultKey = 'AjygRDDQV9j1MIOwbI_BGFh4j4pm7OiKXx9aDJh01p3QVaNCA95dmzFvMsvAicvu';
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDlmMmFjYS02ZWVmLTQ0ZDAtYTUyNi1hOTljODUyYWY2ZWEiLCJpZCI6NjAzOTMsImlhdCI6MTYyNTAzNDAxOX0.u_HLk_p3IYKhB4ZFdzb_Iy1sLXSrXP_IhUzScFTa4Pc'


const CesiumPlay = (props: CesiumPlayProps) => {
  // console.log(__IN_DEBUG__)
  // console.log(CESIUM_BASE_URL)
  const [displayImageryModels, setDisplayImageryModels] = useState<ProviderViewModel[]>([])
  const [displayTerrainModels, setDisplayTerrainModels] = useState<ProviderViewModel[]>([])

  // const { viewer } = useCesium();
  const viewer = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const [navigation, setNavigation] = useState<boolean>(false)
  // const viewer = useRef<any>()
  // useEffect(() => {
  //   // Add Imagery Models
  //   setDisplayImageryModels([...displayImageryModels,
  //   new Cesium.ProviderViewModel({
  //     name: 'Bing Maps Aerial with Labels',
  //     iconUrl: window.CESIUM_BASE_URL + '/Widgets/Images/ImageryProviders/bingAerialLabels.png',
  //     tooltip: 'Bing Maps Aerial with Labels',
  //     creationFunction: function () {
  //       return new Cesium.BingMapsImageryProvider({
  //         url: 'https://dev.virtualearth.net',
  //         key: BingMapsApiDefaultKey,
  //         mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
  //       });
  //     }
  //   }),
  //   new ProviderViewModel({
  //     name: "Open\u00adStreet\u00adMap",
  //     iconUrl: window.CESIUM_BASE_URL +
  //       "/Widgets/Images/ImageryProviders/openStreetMap.png"
  //     ,
  //     tooltip:
  //       "OpenStreetMap (OSM) is a collaborative project to create a free editable map \
  // of the world.\nhttp://www.openstreetmap.org",
  //     category: "Other",
  //     creationFunction: function () {
  //       return new Cesium.OpenStreetMapImageryProvider({
  //         url: "https://a.tile.openstreetmap.org/",
  //       });
  //     },
  //   })
  //   ])

  //   // Add DOP5000, if defined
  //   if (props.DOP5KWmtsUrl != null && props.DOP5KWmtsUrl) {
  //     setDisplayImageryModels([...displayImageryModels,
  //     new Cesium.ProviderViewModel({
  //       name: 'DOP5K',
  //       iconUrl: 'images/oden-dop5k.png',
  //       tooltip: 'DOP5K aerial imagery',
  //       creationFunction: function () {
  //         return new Cesium.WebMapTileServiceImageryProvider({
  //           url: OdenApp.DOP5KWmtsUrl,
  //           layer: OdenApp.DOP5KWmtsLayer,
  //           style: '',
  //           format: 'image/jpeg',
  //           tileMatrixSetID: 'EPSG:4326',
  //           tileMatrixLabels: [
  //             'EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4',
  //             'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9',
  //             'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14',
  //             'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19',
  //             'EPSG:4326:20', 'EPSG:4326:21'
  //           ],
  //           tilingScheme: new Cesium.GeographicTilingScheme(),
  //           rectangle: new Cesium.Rectangle(
  //             113.82422325116882 * Math.PI / 180,
  //             22.13801030162962 * Math.PI / 180,
  //             114.444095966536 * Math.PI / 180,
  //             22.571849814703743 * Math.PI / 180
  //           ),
  //           maximumLevel: 21,
  //           credit: new Cesium.Credit('&copy The Government of the Hong Kong SAR')
  //         });
  //       }
  //     })
  //     ])
  //   }

  //   // Add terrain
  //   setDisplayTerrainModels([...displayTerrainModels,
  //   new Cesium.ProviderViewModel({
  //     name: 'No terrain',
  //     iconUrl: 'images/oden-NoTerrain.png',
  //     tooltip: 'No terrain',
  //     creationFunction: function () {
  //       return new Cesium.EllipsoidTerrainProvider({
  //         // credit: new Cesium.Credit('NGIS China Limited')
  //       });
  //     }
  //   }),
  //   new Cesium.ProviderViewModel({
  //     name: 'LiDAR terrain',
  //     iconUrl: 'images/oden-LiDAR.png',
  //     tooltip: 'LiDAR terrain',
  //     creationFunction: function () {
  //       return new Cesium.CesiumTerrainProvider({
  //         url: OdenApp.TerrainServerUrl,
  //         requestVertexNormals: true
  //       });
  //     }
  //   })
  //   ])

  // }, [])

  // useEffect(() => {
  //   if(viewer.current?.cesiumElement instanceof CesiumViewer){
  //     console.log(viewer.current.cesiumElement.container)
  //     setNavigation(true)
  //     CesiumNavigation(viewer, {})
  //   }
  // }, [navigation])

  useEffect(() => {
    let displayImageryModels: ProviderViewModel[] = [
      new Cesium.ProviderViewModel({
        name: 'LandsD Imagery Map with Traditional Chinese Labels',
        iconUrl: OdenApp.PathImage + 'map3d.landsd.png',
        tooltip: 'LandsD Imagery Map with Traditional Chinese Labels',
        creationFunction: function () {
          return [
            new Cesium.WebMapTileServiceImageryProvider({
              url: 'https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/imagery/WGS84/{TileMatrix}/{TileCol}/{TileRow}.png',
              style: 'default',
              layer: '',
              tileMatrixSetID : 'default028mm',
              format: 'image/png',
              tilingScheme: new Cesium.WebMercatorTilingScheme(),
              maximumLevel: 19,
              credit: new Cesium.Credit('&copy The Government of the Hong Kong SAR')
            }),
            new Cesium.WebMapTileServiceImageryProvider({
              url: 'https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/label/hk/tc/WGS84/{TileMatrix}/{TileCol}/{TileRow}.png',
              style: 'default',
              layer: '',
              tileMatrixSetID : 'default028mm',
              format: 'image/png',
              tilingScheme: new Cesium.WebMercatorTilingScheme(),
              maximumLevel: 19
            })
          ];
        }
      })
    ]

    let displayTerrainModels: ProviderViewModel[] = [
      new Cesium.ProviderViewModel({
        name: 'ArcGIS Tiled Elevation terrain',
        iconUrl: window.CESIUM_BASE_URL + '/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
        tooltip: 'ArcGIS Tiled Elevation terrain',
        creationFunction: function () {
            return new Cesium.ArcGISTiledElevationTerrainProvider({
                url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
            });
        }
    })
    ]
    const viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProviderViewModels: displayImageryModels,
      terrainProviderViewModels: displayTerrainModels,
      geocoder: [new Cesium.BingMapsGeocoderService({
        key: BingMapsApiDefaultKey
      })],
      timeline: false,
      animation: false,
      fullscreenButton: false,
      sceneModePicker: false,
      shadows: false,
      terrainShadows: Cesium.ShadowMode.DISABLED,
      clockViewModel: new Cesium.ClockViewModel(new Cesium.Clock({
        shouldAnimate: false,
        currentTime: Cesium.JulianDate.fromDate(new Date(2018, 10, 14, 11, 0, 0))
      }))
    });
    viewer.camera.flyTo({ destination: Cesium.Rectangle.fromDegrees(113.8000, 22.1600, 114.5600, 22.6200), duration: 5 })
    console.log(viewer)
    CesiumNavigation(viewer, {});
  })

  return (
    <>
      <div>
        <div id="cesiumContainer"></div>
        {/* <Viewer
          ref={viewer}
          full
          navigationHelpButton={true}
          imageryProviderViewModels={displayImageryModels}
          terrainProviderViewModels={displayTerrainModels}
          geocoder={[new Cesium.BingMapsGeocoderService({
            key: BingMapsApiDefaultKey
          })]}
          timeline={false}
          animation={false}
          fullscreenButton={false}
          sceneModePicker={false}
          shadows={false}
          terrainShadows={Cesium.ShadowMode.DISABLED}
          clockViewModel={new Cesium.ClockViewModel(new Cesium.Clock({
            shouldAnimate: false,
            currentTime: Cesium.JulianDate.fromDate(new Date(2021, 7, 2, 11, 0, 0))
          }))}
        // extend={Cesium.viewerCesiumNavigationMixin}
        // imageryProvider={new Cesium.ArcGisMapServerImageryProvider({
        //   url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
        // })}
        >
          {navigation ?? <CesiumNavigator viewer={viewer} /> }
          <button
            onClick={() => {

              setNavigation(true)
            }}>
            Home
          </button>
          <Scene>
            <Globe
              enableLighting={true}
              showGroundAtmosphere={true}
              depthTestAgainstTerrain={true}
            />
          </Scene>
          <CameraFlyTo
            destination={Cesium.Rectangle.fromDegrees(113.8000, 22.1600, 114.5600, 22.6200)}
            // orientation={{
            //   heading: Cesium.Math.toRadians(0.0),
            //   pitch: Cesium.Math.toRadians(-15.0),
            // }}
            duration={5}
          />
          <Entity
            description="test"
            name="tokyo"
            point={{ pixelSize: 10 }}
            position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
          />
        </Viewer> */}
      </div>
      <div>navigation: {navigation}</div>
    </>
  )
}

export default CesiumPlay