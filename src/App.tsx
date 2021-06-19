import React from 'react'
import Interaction from './components/Interaction'
import Points from './components/Points'
import FunctionList from './components/FunctionList'
import NoMatch from './components/NoMatch'
import AddPoints from './components/AddPoints'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps
} from 'react-router-dom'

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
  }
]

let style = {
  height: "400px",
  width: "100%"
}

export const MapContext = React.createContext(false);

const App = () => {
  return (
    <Router>
      <Switch>
        {componentRoutes.map((item, key) => {
          return (
            <Route key={key} exact={item.exact} path={item.path} component={item.component} />
          )
        })}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
