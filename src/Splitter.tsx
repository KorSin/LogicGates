
import './light.css';
import React from 'react';
import { Rect, Circle, Group } from 'react-konva';
import { ConnectorPoint, ConnectorPointProps } from './ConnectorPoint';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch, useAppSelector } from './hooks';
import { activateConnectorPoint, updateConnectorPoint } from './reducers/connectorPointSlicer';

export type SplitterProps = {
    id: string,
    x: number,
    y: number,
    connectorIds: string[],
};


export const Splitter: React.FC<SplitterProps> = (props) => {
    const dispatch = useAppDispatch()
    const isActivated = useAppSelector(state => {
        const point = state.connectorPoints.find(it => it.id === props.connectorIds[0])
        if (point) {
            return point.isActivated;
        }
        return false;
    })

    if (isActivated) {
        dispatch(activateConnectorPoint({ id: props.connectorIds[1] }))
    }


    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        dispatch(updateConnectorPoint(
            {
                id: props.connectorIds[0],
                x: event.currentTarget.absolutePosition().x,
                y: event.target.absolutePosition().y + 25,
            }
        ))
        dispatch(updateConnectorPoint(
            {
                id: props.connectorIds[1],
                x: event.currentTarget.absolutePosition().x + 50,
                y: event.target.absolutePosition().y,
            }
        ))
        dispatch(updateConnectorPoint(
            {
                id: props.connectorIds[2],
                x: event.currentTarget.absolutePosition().x + 50,
                y: event.target.absolutePosition().y + 50,
            }
        ))
    }

    const connectorProps0: ConnectorPointProps = {
        id: props.connectorIds[0],
        x: 0,
        y: 25
    }
    const connectorProps1: ConnectorPointProps = {
        id: props.connectorIds[1],
        x: 50,
        y: 0
    }
    const connectorProps2: ConnectorPointProps = {
        id: props.connectorIds[2],
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