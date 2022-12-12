import React from 'react';
import { KonvaEventObject } from "konva/lib/Node";
import { Circle } from "react-konva"
import { ConnectionLineAction } from './connectionlinereducer';
import { CurrentDrawnConnectionLine, CurrentDrawnConnectionLineAction } from './currentDrawnConnectionLineReducer';
import { IsDrawingAction } from './isDrawingReducer';
import { Connection, ConnectionAction } from './connectionreducer';

export type ConnectorPointProps = {
    id: number,
    x: number,
    y: number,
    isDrawingLine: boolean,
    currentLine: CurrentDrawnConnectionLine,
    connections: Array<Connection>
    lineDispatcher: React.Dispatch<ConnectionLineAction>,
    currentLineDispatcher: React.Dispatch<CurrentDrawnConnectionLineAction>,
    isDrawingDispatcher: React.Dispatch<IsDrawingAction>
    connectionDispatcher: React.Dispatch<ConnectionAction>
};

export const ConnectorPoint = (props: ConnectorPointProps) => {
    const [isConnected, setIsConnected] = React.useState(false);

    const startDrawing = (event: KonvaEventObject<MouseEvent>) => {
        if (isConnected) {
            return;
        } else {
            if (props.isDrawingLine) {
                const x = event.target.absolutePosition().x;
                const y = event.target.absolutePosition().y;
                props.isDrawingDispatcher({ type: 'SET', value: false });
                props.lineDispatcher({ type: 'UPDATE_RIGHT_POINT', value: { id: props.currentLine, x1: x, y1: y } })
                props.connectionDispatcher({ type: 'CREATE', connection: { id: props.currentLine.id, leftConnector: props.currentLine.leftConnector, rightConnector: props.id } });
                setIsConnected(true);
                return;
            } else {
                const nextLineId = props.currentLine.id + 1;
                const x = event.target.absolutePosition().x;
                const y = event.target.absolutePosition().y;
                console.log({ x, y });
                props.currentLineDispatcher({ type: 'SET', value: { id: nextLineId, leftConnector: props.id } });
                props.lineDispatcher({ type: 'CREATE', value: { id: nextLineId, x0: x, y0: y, x1: x, y1: y } });
                props.isDrawingDispatcher({ type: 'SET', value: true });
                setIsConnected(true);
            }
        }
    }

    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        const connection = props.connections.find((con) => con.leftConnector === props.id || con.rightConnector === props.id);
        if (connection) {
            const isLeftPoint = connection.leftConnector === props.id;
            const x = event.target.absolutePosition().x;
            const y = event.target.absolutePosition().y;
            if (isLeftPoint) {
                props.lineDispatcher({ type: 'UPDATE_LEFT_POINT', value: { id: connection.id, x0: x, y0: y } })
            } else {
                props.lineDispatcher({ type: 'UPDATE_RIGHT_POINT', value: { id: connection.id, x1: x, y1: y } })
            }
        } else {
            return;
        }
    }

    return (
        <Circle
            x={props.x}
            y={props.y}
            radius={10}
            stroke="black"
            onClick={startDrawing}
            onDragMove={onDragMove}>
        </Circle>
    )
}