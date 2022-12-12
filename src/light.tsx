import './light.css';
import { Rect, Circle, Group } from 'react-konva';
import { ConnectorPoint, ConnectorPointProps } from './ConnectorPoint';
import { KonvaEventObject } from 'konva/lib/Node';

type LightProps = {
    x: number,
    y: number
    lightIsOn: boolean,
    connectorProps: ConnectorPointProps,
};

export const Light = (props: LightProps) => {

    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        const connection = props.connectorProps.connections.find((con) => con.leftConnector === props.connectorProps.id || con.rightConnector === props.connectorProps.id);
        if (connection) {
            const isLeftPoint = connection.leftConnector === props.connectorProps.id;
            const x = event.target.absolutePosition().x;
            const y = event.target.absolutePosition().y + 25;
            if (isLeftPoint) {
                props.connectorProps.lineDispatcher({ type: 'UPDATE_LEFT_POINT', value: { id: connection.id, x0: x, y0: y } })
            } else {
                props.connectorProps.lineDispatcher({ type: 'UPDATE_RIGHT_POINT', value: { id: connection.id, x1: x, y1: y } })
            }
        } else {
            return;
        }
    }

    const lightColor = props.lightIsOn ? "yellow" : "white";
    const newConnectorProps = props.connectorProps;
    newConnectorProps.x = 0;
    newConnectorProps.y = 25;

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
            <ConnectorPoint {...newConnectorProps}>
            </ConnectorPoint>
        </Group>
    )
}