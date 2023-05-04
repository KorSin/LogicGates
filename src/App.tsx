import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Layer, Stage } from "react-konva";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectorLine } from "./ConnectorLine";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Light } from "./Light";
import { Switch } from "./Switch";
import "./App.css";
// import { Splitter, SplitterProps } from "./Splitter";
import { createConnectorPoint, createNetworkNode } from "./reducers/networkSlicer";
import { ConnectorPointState, NetworkNode } from "./reducers/network";
import { Splitter } from "./Splitter";
import { AndGate } from "./AndGate";
import { OrGate } from "./OrGate";
import { XorGate } from "./XorGate";

export const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const currentDrawing = useAppSelector(state => state.currentDrawing)
    const network = useAppSelector(state => state.network)
    const connectorPoints = network.connectorPoints
    const networkNodes = network.nodes

    const [currentDrawPoints, setCurrentDrawPoints] = React.useState({ x0: 0, y0: 0, x1: 0, y1: 0 })

    const handleMove = (event: KonvaEventObject<MouseEvent>) => {
        if (!currentDrawing.isDrawing) {
            return;
        }
        const { x, y } = event.currentTarget.getRelativePointerPosition();
        const leftPoint = connectorPoints[currentDrawing.currentConnector]
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
        const numberOfNodes = Object.keys(networkNodes).length;
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
            connectorPoints: [point.id],
            type: "Light"
        }

        dispatch(createNetworkNode(light));
        dispatch(createConnectorPoint(point));
    }

    const onCreateSwitchButtonClick = () => {
        const numberOfNodes = Object.keys(networkNodes).length;
        const id = "Switch_" + numberOfNodes.toString()
        const connectorId = id + "_0";
        const newSwitch: NetworkNode = {
            id: id,
            x: 250,
            y: 250,
            connectorPoints: [connectorId],
            type: "Switch"
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

    const onCreateSplitterButtonClick = () => {
        const numberOfNodes = Object.keys(networkNodes).length;
        const id = "Splitter_" + numberOfNodes.toString()
        const newAndGate: NetworkNode = {
            id: id,
            x: 250,
            y: 250,
            connectorPoints: [id + "_0", id + "_1", id + "_2"],
            type: "Splitter"
        };

        const newConnectorPoint0: ConnectorPointState = {
            id: id + "_0",
            x: 250,
            y: 275,
            isActive: false,
            networkNode: id
        }
        const newConnectorPoint1: ConnectorPointState = {
            id: id + "_1",
            x: 300,
            y: 250,
            isActive: false,
            networkNode: id
        }
        const newConnectorPoint2: ConnectorPointState = {
            id: id + "_2",
            x: 300,
            y: 300,
            isActive: false,
            networkNode: id
        }

        dispatch(createNetworkNode(newAndGate));
        dispatch(createConnectorPoint(newConnectorPoint0));
        dispatch(createConnectorPoint(newConnectorPoint1));
        dispatch(createConnectorPoint(newConnectorPoint2));
    }

    const onCreateAndGateButtonClick = () => {
        const numberOfNodes = Object.keys(networkNodes).length;
        const id = "AndGate_" + numberOfNodes.toString()
        const newSplitter: NetworkNode = {
            id: id,
            x: 250,
            y: 250,
            connectorPoints: [id + "_0", id + "_1", id + "_2"],
            type: "AndGate",
        };

        const newConnectorPoint0: ConnectorPointState = {
            id: id + "_0",
            x: 250,
            y: 250,
            isActive: false,
            networkNode: id
        }
        const newConnectorPoint1: ConnectorPointState = {
            id: id + "_1",
            x: 250,
            y: 300,
            isActive: false,
            networkNode: id
        }
        const newConnectorPoint2: ConnectorPointState = {
            id: id + "_2",
            x: 300,
            y: 275,
            isActive: false,
            networkNode: id
        }

        dispatch(createNetworkNode(newSplitter));
        dispatch(createConnectorPoint(newConnectorPoint0));
        dispatch(createConnectorPoint(newConnectorPoint1));
        dispatch(createConnectorPoint(newConnectorPoint2));
    }

    const onCreateOrGateButtonClick = () => {
        const numberOfNodes = Object.keys(networkNodes).length;
        const id = "OrGate_" + numberOfNodes.toString()
        const newSplitter: NetworkNode = {
            id: id,
            x: 250,
            y: 250,
            connectorPoints: [id + "_0", id + "_1", id + "_2"],
            type: "OrGate",
        };

        const newConnectorPoint0: ConnectorPointState = {
            id: id + "_0",
            x: 250,
            y: 250,
            isActive: false,
            networkNode: id
        }
        const newConnectorPoint1: ConnectorPointState = {
            id: id + "_1",
            x: 250,
            y: 300,
            isActive: false,
            networkNode: id
        }
        const newConnectorPoint2: ConnectorPointState = {
            id: id + "_2",
            x: 300,
            y: 275,
            isActive: false,
            networkNode: id
        }

        dispatch(createNetworkNode(newSplitter));
        dispatch(createConnectorPoint(newConnectorPoint0));
        dispatch(createConnectorPoint(newConnectorPoint1));
        dispatch(createConnectorPoint(newConnectorPoint2));
    }

    const onCreateXorGateButtonClick = () => {
        const numberOfNodes = Object.keys(networkNodes).length;
        const id = "XorGate_" + numberOfNodes.toString()
        const newSplitter: NetworkNode = {
            id: id,
            x: 250,
            y: 250,
            connectorPoints: [id + "_0", id + "_1", id + "_2"],
            type: "XorGate",
        };

        const newConnectorPoint0: ConnectorPointState = {
            id: id + "_0",
            x: 250,
            y: 250,
            isActive: false,
            networkNode: id
        }
        const newConnectorPoint1: ConnectorPointState = {
            id: id + "_1",
            x: 250,
            y: 300,
            isActive: false,
            networkNode: id
        }
        const newConnectorPoint2: ConnectorPointState = {
            id: id + "_2",
            x: 300,
            y: 275,
            isActive: false,
            networkNode: id
        }

        dispatch(createNetworkNode(newSplitter));
        dispatch(createConnectorPoint(newConnectorPoint0));
        dispatch(createConnectorPoint(newConnectorPoint1));
        dispatch(createConnectorPoint(newConnectorPoint2));
    }

    return (
        <div>
            <div className="app-create-buttons">
                <button onClick={onCreateLightButtonClick}>Create Light</button>
                <button onClick={onCreateSwitchButtonClick}>Create Switch</button>
                <button onClick={onCreateSplitterButtonClick}>Create Splitter</button>
                <button onClick={onCreateAndGateButtonClick}>Create AND Gate</button>
                <button onClick={onCreateOrGateButtonClick}>Create OR Gate</button>
                <button onClick={onCreateXorGateButtonClick}>Create XOR Gate</button>
            </div>
            <ReactReduxContext.Consumer>
                {({ store }) =>
                    <Stage width={window.innerWidth} height={window.innerHeight} onMouseMove={handleMove} >
                        <Provider store={store}>
                            <Layer>
                                {currentDrawing.isDrawing &&
                                    <ConnectorLine key={"Bla"} x0={currentDrawPoints.x0} y0={currentDrawPoints.y0} x1={currentDrawPoints.x1} y1={currentDrawPoints.y1} isActivated={false}></ConnectorLine>
                                }
                                {Object.values(connectorPoints).filter(point => point.connectedTo)
                                    .map(point => {
                                        if (point.connectedTo) {
                                            const otherPoint = connectorPoints[point.connectedTo]
                                            if (otherPoint) {
                                                return (
                                                    <ConnectorLine x0={point.x} y0={point.y} x1={otherPoint.x} y1={otherPoint.y} isActivated={point.isActive || otherPoint.isActive} key={point.id}></ConnectorLine>
                                                )
                                            }
                                        }
                                    })
                                }
                                {Object.values(networkNodes).map(node => {
                                    if (node.type === "Light") {
                                        return (
                                            <Light key={node.id} id={node.id} x={node.x} y={node.y} connectorPoints={node.connectorPoints}></Light>
                                        )
                                    } else if (node.type === "Switch") {
                                        return (
                                            <Switch key={node.id} id={node.id} x={node.x} y={node.y} connectorPoints={node.connectorPoints}></Switch>
                                        )
                                    } else if (node.type === "Splitter") {
                                        return (
                                            <Splitter key={node.id} id={node.id} x={node.x} y={node.y} connectorPoints={node.connectorPoints}></Splitter>
                                        )
                                    } else if (node.type === "AndGate") {
                                        return (
                                            <AndGate key={node.id} id={node.id} x={node.x} y={node.y} connectorPoints={node.connectorPoints}></AndGate>
                                        )
                                    } else if (node.type === "OrGate") {
                                        return (
                                            <OrGate key={node.id} id={node.id} x={node.x} y={node.y} connectorPoints={node.connectorPoints}></OrGate>
                                        )
                                    } else if (node.type === "XorGate") {
                                        return (
                                            <XorGate key={node.id} id={node.id} x={node.x} y={node.y} connectorPoints={node.connectorPoints}></XorGate>
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