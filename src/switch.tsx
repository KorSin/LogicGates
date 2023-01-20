import { Group, Rect, Text } from "react-konva"
import { KonvaEventObject } from "konva/lib/Node";
import { ConnectorPoint, ConnectorPointProps } from "./ConnectorPoint"
import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { activateConnectorPoint, deactivateConnectorPoint, updateConnectorPoint } from "./reducers/connectorPointSlicer";
import { activateConnection, deactivateConnection } from "./reducers/connectionSlicer";

export type SwitchProps = {
    id: string,
    x: number,
    y: number,
    connectorId: string,
}

export const Switch: React.FC<SwitchProps> = (props) => {
    const dispatch = useAppDispatch()
    const [isOn, setIsOn] = React.useState(false);
    const connectionLine = useAppSelector(state => state.connection)

    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        dispatch(updateConnectorPoint(
            {
                id: props.connectorId,
                x: event.currentTarget.absolutePosition().x + 75,
                y: event.target.absolutePosition().y + 25,
            }
        ))
    }

    const handleSwitchClick = () => {
        setIsOn(!isOn);
        const connection = connectionLine.find(it => it.leftConnector === props.connectorId || it.rightConnector === props.connectorId)
        if (connection) {
            if (!isOn) {
                dispatch(activateConnection(props.connectorId))
                dispatch(activateConnectorPoint({ id: connection.rightConnector }))
                dispatch(activateConnectorPoint({ id: connection.leftConnector }))
            } else {
                dispatch(deactivateConnection(props.connectorId))
                dispatch(deactivateConnectorPoint({ id: connection.rightConnector }))
                dispatch(deactivateConnectorPoint({ id: connection.leftConnector }))
            }
        }
    }

    const connectorProps: ConnectorPointProps = {
        id: props.connectorId,
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