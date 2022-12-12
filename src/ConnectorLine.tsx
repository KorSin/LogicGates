import { Line } from 'react-konva';
import { ConnectionLine } from './connectionlinereducer';

const computeIntermediatePoints = ({ x0, y0, x1, y1 }: ConnectionLine) => {

    const xmid = (x1 + x0) / 2;

    return [x0, y0, xmid, y0, xmid, y1, x1, y1];
}

export const ConnectorLine = (props: ConnectionLine) => {
    const linePoints = computeIntermediatePoints(props);
    const lineColor = props.isActivated ? "yellow" : "black";
    return (
        <Line points={linePoints}
            stroke={lineColor}
            strokeWidth={10}
            lineJoin="round"
            lineCap="round">
        </Line >
    )
}