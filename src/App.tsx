import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Layer, Stage } from "react-konva";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectorLine } from "./ConnectorLine";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Light, LightProps } from "./Light";
import { Switch, SwitchProps } from "./switch";
import "./App.css";
// import { Splitter, SplitterProps } from "./Splitter";
import { createConnectorPoint, createNetworkNode } from "./reducers/networkSlicer";
import { ConnectorPointState, NetworkNode } from "./reducers/network";

export const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const currentDrawing = useAppSelector(state => state.currentDrawing)
    const network = useAppSelector(state => state.network)
    const connectorPoints = network.connectorPoints
    const networkNodes = network.nodes

    const [currentDrawPoints, setCurrentDrawPoints] = React.useState({ x0: 0, y0: 0, x1: 0, y1: 0 })
    // const [switches, setSwitches] = React.useState([] as SwitchProps[])
    // const [splitters, setSplitters] = React.useState([] as SplitterProps[])

    const handleMove = (event: KonvaEventObject<MouseEvent>) => {
        if (!currentDrawing.isDrawing) {
            return;
        }
        const { x, y } = event.currentTarget.getRelativePointerPosition();
        const leftPoint = connectorPoints.find(it => it.id === currentDrawing.currentConnector)
        if (leftPoint) {
            setCurrentDrawPoints({
                x0: leftPoint.x,
                y0: leftPoint.y,
                x1: x,
                y1: y,
            })
        }
    }

    const onCreateLightButtonClick = () => {
        const numberOfNodes = networkNodes.length;
        const light_id = "Light_" + numberOfNodes.toString();
        const point: ConnectorPointState = {
            id: light_id + '_0',
            x: 250,
            y: 275,
            isActive: false,
            networkNode: light_id
        }

        const light: NetworkNode = {
            id: "Light_" + numberOfNodes.toString(),
            x: 250,
            y: 250,
            connectorPoints: [point.id]
        }

        dispatch(createNetworkNode(light));
        dispatch(createConnectorPoint(point));
    }

    const onCreateSwitchButtonClick = () => {
        const numberOfNodes = networkNodes.length;
        const id = "Switch_" + numberOfNodes.toString()
        const connectorId = id + "_0";
        const newSwitch: NetworkNode = {
            id: id,
            x: 250,
            y: 250,
            connectorPoints: [connectorId],
        };

        const newConnectorPoint: ConnectorPointState = {
            id: connectorId,
            x: 325,
            y: 275,
            isActive: false,
            networkNode: id
        }

        dispatch(createNetworkNode(newSwitch));
        dispatch(createConnectorPoint(newConnectorPoint));
    }
    // const onCreateSplitterButtonClick = () => {
    //     const numberOfSplitters = splitters.length;
    //     const id = "Splitter" + numberOfSplitters.toString()
    //     const connectorId = id + "_0";
    //     const newSplitter: SplitterProps = {
    //         id: id,
    //         x: 250,
    //         y: 250,
    //         connectorIds: [id + "_0", id + "_1", id + "_2"],
    //     };

    //     const newConnectorPoint0: ConnectorPoint = {
    //         id: id + "_0",
    //         x: 250,
    //         y: 275,
    //         isActivated: false,
    //     }
    //     const newConnectorPoint1: ConnectorPoint = {
    //         id: id + "_1",
    //         x: 300,
    //         y: 250,
    //         isActivated: false,
    //     }
    //     const newConnectorPoint2: ConnectorPoint = {
    //         id: id + "_2",
    //         x: 300,
    //         y: 300,
    //         isActivated: false,
    //     }

    //     setSplitters([...splitters, newSplitter]);
    //     dispatch(createConnectorPoint(newConnectorPoint0));
    //     dispatch(createConnectorPoint(newConnectorPoint1));
    //     dispatch(createConnectorPoint(newConnectorPoint2));
    //     console.log(splitters)
    // }




    return (
        <div>
            <div className="app-create-buttons">
                <button onClick={onCreateLightButtonClick}>Create Light</button>
                <button onClick={onCreateSwitchButtonClick}>Create Switch</button>
                {/* <button onClick={onCreateSplitterButtonClick}>Create Splitter</button> */}
            </div>
            <ReactReduxContext.Consumer>
                {({ store }) =>
                    <Stage width={window.innerWidth} height={window.innerHeight} onMouseMove={handleMove} >
                        <Provider store={store}>
                            <Layer>
                                {currentDrawing.isDrawing &&
                                    <ConnectorLine key={"Bla"} x0={currentDrawPoints.x0} y0={currentDrawPoints.y0} x1={currentDrawPoints.x1} y1={currentDrawPoints.y1} isActivated={false}></ConnectorLine>
                                }
                                {connectorPoints.filter(point => point.connectedTo)
                                    .map(point => {
                                        const otherPoint = connectorPoints.find(p => p.id === point.connectedTo)
                                        if (otherPoint) {
                                            return (
                                                <ConnectorLine x0={point.x} y0={point.y} x1={otherPoint.x} y1={otherPoint.y} isActivated={point.isActive || otherPoint.isActive} key={point.id}></ConnectorLine>
                                            )
                                        }
                                    })
                                }
                                {networkNodes.map(node => {
                                    if (node.id.startsWith("Light")) {
                                        return (
                                            <Light key={node.id} id={node.id} x={node.x} y={node.y} connectorPoints={node.connectorPoints}></Light>
                                        )
                                    } else if (node.id.startsWith("Switch")) {
                                        return (
                                            <Switch key={node.id} id={node.id} x={node.x} y={node.y} connectorPoints={node.connectorPoints}></Switch>
                                        )
                                    }
                                })
                                }
                            </Layer>
                        </Provider>
                    </Stage>
                }
            </ReactReduxContext.Consumer>
        </div>
    )
}