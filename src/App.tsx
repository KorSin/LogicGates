import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Layer, Stage } from "react-konva";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectorLine } from "./ConnectorLine";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Light, LightProps } from "./Light";
import { Switch, SwitchProps } from "./switch";
import "./App.css";
import { ConnectorPointProps } from "./ConnectorPoint";
import { ConnectorPoint, createConnectorPoint } from "./reducers/connectorPointSlicer";
import { Splitter, SplitterProps } from "./Splitter";

export const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const currentDrawing = useAppSelector(state => state.currentDrawing)
    const connectorPoints = useAppSelector(state => state.connectorPoints)
    const connections = useAppSelector(state => state.connection)

    const [currentDrawPoints, setCurrentDrawPoints] = React.useState({ x0: 0, y0: 0, x1: 0, y1: 0 })
    const [lights, setLights] = React.useState([] as LightProps[])
    const [switches, setSwitches] = React.useState([] as SwitchProps[])
    const [splitters, setSplitters] = React.useState([] as SplitterProps[])

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
        const numberOfLights = lights.length;
        const id = "Light" + numberOfLights.toString()
        const connectorId = id + "_0";
        const newLight: LightProps = {
            id: id,
            x: 250,
            y: 250,
            connectorId: connectorId,
        };

        const newConnectorPoint: ConnectorPoint = {
            id: connectorId,
            x: 250,
            y: 275,
            isActivated: false
        }

        setLights([...lights, newLight]);
        dispatch(createConnectorPoint(newConnectorPoint));
        console.log(lights)
    }

    const onCreateSwitchButtonClick = () => {
        const numberOfSwitches = switches.length;
        const id = "Switch" + numberOfSwitches.toString()
        const connectorId = id + "_0";
        const newSwitch: SwitchProps = {
            id: id,
            x: 250,
            y: 250,
            connectorId: connectorId,
        };

        const newConnectorPoint: ConnectorPoint = {
            id: connectorId,
            x: 325,
            y: 275,
            isActivated: false,
        }

        setSwitches([...switches, newSwitch]);
        dispatch(createConnectorPoint(newConnectorPoint));
        console.log(switches)
    }
    const onCreateSplitterButtonClick = () => {
        const numberOfSplitters = splitters.length;
        const id = "Splitter" + numberOfSplitters.toString()
        const connectorId = id + "_0";
        const newSplitter: SplitterProps = {
            id: id,
            x: 250,
            y: 250,
            connectorIds: [id + "_0", id + "_1", id + "_2"],
        };

        const newConnectorPoint0: ConnectorPoint = {
            id: id + "_0",
            x: 250,
            y: 275,
            isActivated: false,
        }
        const newConnectorPoint1: ConnectorPoint = {
            id: id + "_1",
            x: 300,
            y: 250,
            isActivated: false,
        }
        const newConnectorPoint2: ConnectorPoint = {
            id: id + "_2",
            x: 300,
            y: 300,
            isActivated: false,
        }

        setSplitters([...splitters, newSplitter]);
        dispatch(createConnectorPoint(newConnectorPoint0));
        dispatch(createConnectorPoint(newConnectorPoint1));
        dispatch(createConnectorPoint(newConnectorPoint2));
        console.log(splitters)
    }



    return (
        <div>
            <div className="app-create-buttons">
                <button onClick={onCreateLightButtonClick}>Create Light</button>
                <button onClick={onCreateSwitchButtonClick}>Create Switch</button>
                <button onClick={onCreateSplitterButtonClick}>Create Splitter</button>
            </div>
            <ReactReduxContext.Consumer>
                {({ store }) =>
                    <Stage width={window.innerWidth} height={window.innerHeight} onMouseMove={handleMove} >
                        <Provider store={store}>
                            <Layer>
                                {connections.map(connection => {
                                    const leftPoint = connectorPoints.find(it => it.id === connection.leftConnector)
                                    const rightPoint = connectorPoints.find(it => it.id === connection.rightConnector)
                                    if (leftPoint && rightPoint) {
                                        return (
                                            <ConnectorLine x0={leftPoint.x} y0={leftPoint.y} x1={rightPoint.x} y1={rightPoint.y} isActivated={connection.isActivated} key={leftPoint.id}></ConnectorLine>
                                        )
                                    }
                                })
                                }
                                {currentDrawing.isDrawing &&
                                    <ConnectorLine key={"Bla"} x0={currentDrawPoints.x0} y0={currentDrawPoints.y0} x1={currentDrawPoints.x1} y1={currentDrawPoints.y1} isActivated={false}></ConnectorLine>
                                }
                                {switches.map(sw => {
                                    return (
                                        <Switch key={sw.id} {...sw}></Switch>
                                    )
                                })
                                }
                                {lights.map(light => {
                                    return (
                                        <Light key={light.id} {...light}></Light>
                                    )
                                })
                                }
                                {splitters.map(splitter => {
                                    return (
                                        <Splitter key={splitter.id} {...splitter}></Splitter>
                                    )
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