import './light.css';
import React from 'react';
import { Rect, Circle, Group } from 'react-konva';
import { ConnectorPoint, ConnectorPointProps } from './ConnectorPoint';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch } from './hooks';
import { updateConnectorPoint } from './reducers/connectorPointSlicer';

type LightProps = {
    id: string,
    x: number,
    y: number,
    connectorId: string,
};


export function Light(props: LightProps) {
    const dispatch = useAppDispatch()
    const lightIsOn = React.useState(false)


    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        dispatch(updateConnectorPoint(
            {
                id: props.connectorId,
                x: event.currentTarget.absolutePosition().x,
                y: event.target.absolutePosition().y + 25,
            }
        ))
    }

    const lightColor = lightIsOn ? "yellow" : "white";
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