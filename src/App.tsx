import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps
} from 'react-router-dom'
import * as Cesium from 'cesium'

import Interaction from './components/Interaction'
import Points from './components/Points'
import FunctionList from './components/FunctionList'
import NoMatch from './components/NoMatch'
import AddPoints from './components/AddPoints'
import CesiumPlay from './components/CesiumPlay'
import MapFactory from './components/MapFactory'
import HereMap from './components/HereMap'
import LeafletMap from './components/LeafletMap'
import OL_Gmap from './components/OL_Gmap'

interface componentRoute extends RouteProps {
  name: string;
  description: string
}

export const componentRoutes: componentRoute[] = [
  {
    name: "Function List",
    description: "List of available functions",
    path: "/",
    component: FunctionList,
    exact: true
  },
  {
    name: "Points Layer",
    description: "webgl-points-layer",
    path: "/webgl-points",
    component: Points,
  },
  {
    name: "Interactions",
    description: "Map interactions",
    path: "/interactions",
    component: Interaction
  },
  {
    name: "AddPoints",
    description: "Add points to map",
    path: "/addpoints",
    component: AddPoints
  },
  {
    name: "Cesium Play",
    description: "Playaround Cesium",
    path: "/cesium_play",
    component: CesiumPlay
  },
  {
    name: "MapFactory",
    description: "Factory Design Pattern For Map",
    path: "/mapfactory",
    component: MapFactory
  },
  {
    name: "HereMap",
    description: "Here Map API",
    path: "/here_map",
    component: HereMap
  },
  {
    name: "Leaflet Map",
    description: "Leaflet Map",
    path: "/leaflet",
    component: LeafletMap
  },
  {
    name: "OL with Google Map",
    description: "Google Map",
    path: "/olgoogle",
    component: OL_Gmap
  },
]

let style = {
  height: "400px",
  width: "100%"
}

export const MapContext = React.createContext(false);

const App = () => {
  return (
    <>

      <Router>
        <Switch>
          {componentRoutes.map((item, key) => {
            return (
              <Route key={key} exact={item.exact} path={item.path} component={item.component} />
            )
          })}
        </Switch>
      </Router>
    </>
  )
}

export default App;
