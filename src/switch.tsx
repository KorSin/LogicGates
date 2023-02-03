import { Group, Rect, Text } from "react-konva"
import { KonvaEventObject } from "konva/lib/Node";
import { ConnectorPoint, ConnectorPointProps } from "./ConnectorPoint"
import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { activateConnectorPoint, updateConnectorPointCoords } from "./reducers/networkSlicer";

export type SwitchProps = {
    id: string,
    x: number,
    y: number,
    connectorPoints: string[],
}

export const Switch: React.FC<SwitchProps> = (props) => {
    const dispatch = useAppDispatch()

    const [isOn, setIsOn] = React.useState(false);
    const connectorPoints = useAppSelector(state => {
        return state.network.connectorPoints.filter(point => props.connectorPoints.includes(point.id))
    })


    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        dispatch(updateConnectorPointCoords(
            {
                id: connectorPoints[0].id,
                x: event.currentTarget.absolutePosition().x + 75,
                y: event.target.absolutePosition().y + 25,
            }
        ))
    }

    const handleSwitchClick = () => {
        setIsOn(!isOn);
        dispatch(activateConnectorPoint(connectorPoints[0].id))
    }

    const connectorProps: ConnectorPointProps = {
        id: connectorPoints[0].id,
        x: 75,
        y: 25,
    }

    const switchLabel = isOn ? "ON" : "OFF";
    const switchColor = isOn ? "green" : "red";

    return (
        <Group draggable={true} x={props.x} y={props.y} onDragMove={onDragMove}>
            <Rect
                width={75}
                height={50}
                stroke="black"
                cornerRadius={10}>
            </Rect>
            <Rect
                x={5}
                y={12.5}
                width={50}
                height={25}
                stroke="black"
                cornerRadius={10}
                fill={switchColor}
                onClick={handleSwitchClick}>
            </Rect>
            <Text
                x={20}
                y={20}
                text={switchLabel}
                onClick={handleSwitchClick}></Text>
            <ConnectorPoint {...connectorProps}>
            </ConnectorPoint>
        </Group>
    )
}