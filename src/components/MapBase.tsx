import React, { useContext } from 'react'

let style = {
    height: "400px",
    width: "100%"
}
const MapBase = (props: any) => {
    return (
        <>
            <div style={style} id="map" />
            {props.children}
        </>
    )
}

export default MapBase