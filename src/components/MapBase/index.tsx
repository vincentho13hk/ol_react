import React, { useContext } from 'react'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import style from './style'
import { featureFromServer } from '../../models/feature';
import { List, ListItem } from '@material-ui/core';

const useStyles = makeStyles(style)

let mapStyle = {
    height: "600px",
    width: "100%"
}
type MapBaseProps = {
    openDrawer: boolean
    children?: React.ReactNode
    feature?: featureFromServer
}
const MapBase = (props: MapBaseProps) => {
    const classes = useStyles()
    //const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)
    // React.useEffect(()=> {
    //     setDrawerOpen(props.openDrawer)
    // }, [props.openDrawer])
    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={props.openDrawer}
            >
                <List>
                    <ListItem>{props.feature?.name}</ListItem>
                    <ListItem>{`${props.feature?.long} ${props.feature?.lat}`}</ListItem>
                </List>
            </Drawer>
            <div style={mapStyle} id="map" />
            {props.children}
        </>
    )
}
MapBase.defaultProps= {
    openDrawer: false
}
export default MapBase