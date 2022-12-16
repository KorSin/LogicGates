import React from 'react';
import { Line } from 'react-konva';

export type ConnectionLineProps = {
    x0: number,
    y0: number,
    x1: number,
    y1: number,
}

const computeIntermediatePoints = ({ x0, y0, x1, y1 }: ConnectionLineProps) => {

    const xmid = (x1 + x0) / 2;

    return [x0, y0, xmid, y0, xmid, y1, x1, y1];
}

export const ConnectorLine = (props: ConnectionLineProps) => {
    const isActivated = React.useState(false)
    const linePoints = computeIntermediatePoints(props);

    const lineColor = isActivated ? "black" : "yellow";
    return (
        <Line points={linePoints}
            stroke={lineColor}
            strokeWidth={10}
            lineJoin="round"
            lineCap="round">
        </Line >
    )
}