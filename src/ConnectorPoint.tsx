import React from 'react';
import { Circle } from "react-konva"
import { Connection, createConnection } from './reducers/connectionSlicer';
import { CurrentDrawProperties, setCurrentDrawing } from './reducers/currentDrawingSlicer';
import { useAppDispatch, useAppSelector } from './hooks';

export type ConnectorPointProps = {
    id: string,
    x: number,
    y: number,
};

export const ConnectorPoint: React.FC<ConnectorPointProps> = (props) => {
    const dispatch = useAppDispatch();
    const [isConnected, setIsConnected] = React.useState(false);
    const isDrawingLine = useAppSelector(state => state.currentDrawing.isDrawing)
    const leftConnector = useAppSelector(state => state.currentDrawing.currentConnector)

    const startDrawing = () => {
        if (isConnected) {
            return;
        } else {
            if (isDrawingLine) {
                dispatchCurrentDrawing({
                    isDrawing: false,
                    currentConnector: ""
                })
                dispatchConnection({ leftConnector: leftConnector, rightConnector: props.id, isActivated: false })
                setIsConnected(true);
                return;
            } else {
                dispatchCurrentDrawing({
                    isDrawing: true,
                    currentConnector: props.id
                })
                setIsConnected(true);
            }
        }
    }
    const dispatchConnection = (connection: Connection) => {
        dispatch(createConnection(connection))
    }

    const dispatchCurrentDrawing = (currentDrawing: CurrentDrawProperties) => {
        dispatch(setCurrentDrawing(currentDrawing))
    }

    return (
        <Circle
            x={props.x}
            y={props.y}
            radius={10}
            stroke="black"
            onClick={startDrawing}>
        </Circle>
    )
}