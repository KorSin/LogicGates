import { Group, Rect, Text } from "react-konva"
import { KonvaEventObject } from "konva/lib/Node";
import { ConnectorPoint, ConnectorPointProps } from "./ConnectorPoint"
import React from "react";

type SwitchProps = {
    x: number,
    y: number,
    connectorProps: ConnectorPointProps,
}

export const Switch = (props: SwitchProps) => {
    const [isOn, setIsOn] = React.useState(false);

    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        // const connection = props.connectorProps.connections.find((con) => con.leftConnector === props.connectorProps.id || con.rightConnector === props.connectorProps.id);
        // if (connection) {
        //     const isLeftPoint = connection.leftConnector === props.connectorProps.id;
        //     const x = event.target.absolutePosition().x + 75;
        //     const y = event.target.absolutePosition().y + 25;
        //     if (isLeftPoint) {
        //         props.connectorProps.lineDispatcher({ type: 'UPDATE_LEFT_POINT', value: { id: connection.id, x0: x, y0: y } })
        //     } else {
        //         props.connectorProps.lineDispatcher({ type: 'UPDATE_RIGHT_POINT', value: { id: connection.id, x1: x, y1: y } })
        //     }
        // } else {
        //     return;
        // }
    }

    const handleSwitchClick = () => {
        // const connectionToToggle = props.connectorProps.connections.find((c) => {
        //     return c.leftConnector === props.connectorProps.id || c.rightConnector === props.connectorProps.id;
        // });

        // if (connectionToToggle) {
        //     props.connectorProps.lineDispatcher({ type: 'TOGGLE_ACTIVATE', value: { id: connectionToToggle.id, isActivated: !isOn } })
        //     setIsOn(!isOn);
        // } else {
        //     return;
        // }

    }

    const newConnectorProps = props.connectorProps;
    newConnectorProps.x = 75;
    newConnectorProps.y = 25;

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
            <ConnectorPoint {...newConnectorProps}>
            </ConnectorPoint>
        </Group>
    )
}