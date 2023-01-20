import './light.css';
import React from 'react';
import { Rect, Circle, Group } from 'react-konva';
import { ConnectorPoint, ConnectorPointProps } from './ConnectorPoint';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch, useAppSelector } from './hooks';
import { updateConnectorPoint } from './reducers/connectorPointSlicer';

export type LightProps = {
    id: string,
    x: number,
    y: number,
    connectorId: string,
};


export const Light: React.FC<LightProps> = (props) => {
    const dispatch = useAppDispatch()
    const isActivated = useAppSelector(state => {
        const point = state.connectorPoints.find(it => it.id === props.connectorId)
        if (point) {
            return point.isActivated;
        }
        return false;
    })


    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        dispatch(updateConnectorPoint(
            {
                id: props.connectorId,
                x: event.currentTarget.absolutePosition().x,
                y: event.target.absolutePosition().y + 25,
            }
        ))
    }

    const lightColor = isActivated ? "yellow" : "white";
    const connectorProps: ConnectorPointProps = {
        id: props.connectorId,
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
        </Group>
    )
}