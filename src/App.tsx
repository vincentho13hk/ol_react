import Interaction from './components/Interaction'
import Points from './components/Points'

let style = {
  height: "400px",
  width: "100%"
}

const App = () => {
  return (
    <div>
      <Points />
      <div style={style} id="map" />
    </div>
  )
}

export default App;
