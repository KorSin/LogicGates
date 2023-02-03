import './light.css';
import React from 'react';
import { Rect, Circle, Group } from 'react-konva';
import { ConnectorPoint, ConnectorPointProps } from './ConnectorPoint';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch, useAppSelector } from './hooks';
import { updateConnectorPointCoords } from './reducers/networkSlicer';

export type LightProps = {
    id: string,
    x: number,
    y: number,
    connectorPoints: string[],
};


export const Light: React.FC<LightProps> = (props) => {
    const dispatch = useAppDispatch()
    const connectorPoints = useAppSelector(state => {
        return state.network.connectorPoints.filter(point => props.connectorPoints.includes(point.id))
    })

    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        dispatch(updateConnectorPointCoords(
            {
                id: connectorPoints[0].id,
                x: event.currentTarget.absolutePosition().x,
                y: event.target.absolutePosition().y + 25,
            }
        ))
    }

    const lightColor = connectorPoints[0].isActive ? "yellow" : "white";
    const connectorProps: ConnectorPointProps = {
        id: connectorPoints[0].id,
        x: 0,
        y: 25
    }

    return (
        <Group x={props.x} y={props.y} draggable={true} onDragMove={onDragMove}>
            <Rect
                width={50}
                height={50}
                fill="white"
                // shadowBlur={10}
                stroke="black"
                cornerRadius={10}>
            </Rect>
            <Circle
                x={25}
                y={25}
                stroke="black"
                fill={lightColor}
                radius={12.5}>
            </Circle>
            <ConnectorPoint {...connectorProps}>
            </ConnectorPoint>
        </Group >
    )
}