import React from 'react';
import { Circle } from "react-konva"
import { CurrentDrawProperties, setCurrentDrawing } from './reducers/currentDrawingSlicer';
import { useAppDispatch, useAppSelector } from './hooks';
import { connectTwoPoints } from './reducers/networkSlicer';

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

                dispatch(connectTwoPoints({
                    id_1: leftConnector,
                    id_2: props.id,
                }))
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