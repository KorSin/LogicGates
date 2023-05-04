import './light.css';
import React from 'react';
import { Rect, Group } from 'react-konva';
import { ConnectorPoint, ConnectorPointProps } from './ConnectorPoint';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch } from './hooks';
import { updateConnectorPointCoords } from './reducers/networkSlicer';

export type SplitterProps = {
    id: string,
    x: number,
    y: number,
    connectorPoints: string[],
};


export const Splitter: React.FC<SplitterProps> = (props) => {
    const dispatch = useAppDispatch()

    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        dispatch(updateConnectorPointCoords(
            {
                id: props.connectorPoints[0],
                x: event.currentTarget.absolutePosition().x,
                y: event.target.absolutePosition().y + 25,
            }
        ))
        dispatch(updateConnectorPointCoords(
            {
                id: props.connectorPoints[1],
                x: event.currentTarget.absolutePosition().x + 50,
                y: event.target.absolutePosition().y,
            }
        ))
        dispatch(updateConnectorPointCoords(
            {
                id: props.connectorPoints[2],
                x: event.currentTarget.absolutePosition().x + 50,
                y: event.target.absolutePosition().y + 50,
            }
        ))
    }

    const connectorProps0: ConnectorPointProps = {
        id: props.connectorPoints[0],
        x: 0,
        y: 25
    }
    const connectorProps1: ConnectorPointProps = {
        id: props.connectorPoints[1],
        x: 50,
        y: 0
    }
    const connectorProps2: ConnectorPointProps = {
        id: props.connectorPoints[2],
        x: 50,
        y: 50,
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
            <ConnectorPoint {...connectorProps0}>
            </ConnectorPoint>
            <ConnectorPoint {...connectorProps1}>
            </ConnectorPoint>
            <ConnectorPoint {...connectorProps2}>
            </ConnectorPoint>
        </Group>
    )
}