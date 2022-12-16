import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Layer, Stage } from "react-konva";
import { Provider, ReactReduxContext, useDispatch } from "react-redux";
import { ConnectorLine } from "./ConnectorLine";
import { useAppSelector } from "./hooks";
import { Light } from "./light";
import { Switch } from "./switch";

export const App = () => {
    const currentDrawing = useAppSelector(state => state.currentDrawing)
    const connectorPoints = useAppSelector(state => state.connectorPoints)
    const connections = useAppSelector(state => state.connection)

    const [currentDrawPoints, setCurrentDrawPoints] = React.useState({ x0: 0, y0: 0, x1: 0, y1: 0 })

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

    return (
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
                                        <ConnectorLine x0={leftPoint.x} y0={leftPoint.y} x1={rightPoint.x} y1={rightPoint.y} key={leftPoint.id}></ConnectorLine>
                                    )
                                }
                            })
                            }
                            {currentDrawing.isDrawing &&
                                <ConnectorLine key={"Bla"} x0={currentDrawPoints.x0} y0={currentDrawPoints.y0} x1={currentDrawPoints.x1} y1={currentDrawPoints.y1}></ConnectorLine>
                            }
                            {/* <Switch x={500} y={500} connectorProps={conPoint4}></Switch> */}
                            <Light id={'Light1'} x={250} y={250} connectorId={"Light1_1"}></Light>
                            <Light id={'Light2'} x={500} y={250} connectorId={"Light2_1"}></Light>
                        </Layer>
                    </Provider>
                </Stage>
            }
        </ReactReduxContext.Consumer>
    )
}