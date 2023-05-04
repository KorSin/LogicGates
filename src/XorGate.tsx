import React from 'react';
import { Rect, Group, Text } from 'react-konva';
import { ConnectorPoint, ConnectorPointProps } from './ConnectorPoint';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch } from './hooks';
import { updateConnectorPointCoords } from './reducers/networkSlicer';

type XorGateProps = {
    id: string,
    x: number,
    y: number,
    connectorPoints: string[],
};


export const XorGate: React.FC<XorGateProps> = (props) => {
    const dispatch = useAppDispatch()

    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        dispatch(updateConnectorPointCoords(
            {
                id: props.connectorPoints[0],
                x: event.currentTarget.absolutePosition().x,
                y: event.target.absolutePosition().y,
            }
        ))
        dispatch(updateConnectorPointCoords(
            {
                id: props.connectorPoints[1],
                x: event.currentTarget.absolutePosition().x,
                y: event.target.absolutePosition().y + 50,
            }
        ))
        dispatch(updateConnectorPointCoords(
            {
                id: props.connectorPoints[2],
                x: event.currentTarget.absolutePosition().x + 50,
                y: event.target.absolutePosition().y + 25,
            }
        ))
    }

    const connectorProps0: ConnectorPointProps = {
        id: props.connectorPoints[0],
        x: 0,
        y: 0,
    }
    const connectorProps1: ConnectorPointProps = {
        id: props.connectorPoints[1],
        x: 0,
        y: 50,
    }
    const connectorProps2: ConnectorPointProps = {
        id: props.connectorPoints[2],
        x: 50,
        y: 25,
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
            <Text x={15} y={20} text={"XOR"}></Text>
            <ConnectorPoint {...connectorProps0}>
            </ConnectorPoint>
            <ConnectorPoint {...connectorProps1}>
            </ConnectorPoint>
            <ConnectorPoint {...connectorProps2}>
            </ConnectorPoint>
        </Group>
    )
}