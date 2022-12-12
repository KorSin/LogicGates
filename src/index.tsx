import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Light } from './light';
import { Stage, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { ConnectorLine } from './ConnectorLine';
import { ConnectorPoint, ConnectorPointProps } from './ConnectorPoint';
import setConnectionLine from './connectionlinereducer';
import setCurrentDrawnLine from './currentDrawnConnectionLineReducer';
import setIsDrawing from './isDrawingReducer';
import setConnection from './connectionreducer';
import { Switch } from './switch';

const App = () => {
  const [lightIsOn, setLightIsOn] = React.useState(false);
  const [isDrawing, isDrawingDispatcher] = React.useReducer(setIsDrawing, false);
  const [currentLineConnection, currentLineConnectionDispatcher] = React.useReducer(setCurrentDrawnLine, { id: -1, leftConnector: -1 });
  const [connections, connectionsDispatcher] = React.useReducer(setConnection, []);
  const [connectionLines, connectionLinesDispatcher] = React.useReducer(setConnectionLine, []);

  const handleMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) {
      return;
    }
    const { x, y } = event.currentTarget.getRelativePointerPosition();
    connectionLinesDispatcher({ type: 'UPDATE_RIGHT_POINT', value: { id: currentLineConnection.id, x1: x, y1: y } });
  }

  const conPoint1: ConnectorPointProps = {
    id: 0,
    x: 200,
    y: 300,
    isDrawingLine: isDrawing,
    currentLine: currentLineConnection,
    connections: connections,
    lineDispatcher: connectionLinesDispatcher,
    currentLineDispatcher: currentLineConnectionDispatcher,
    connectionDispatcher: connectionsDispatcher,
    isDrawingDispatcher: isDrawingDispatcher,
  };
  const conPoint2: ConnectorPointProps = {
    id: 1,
    x: 400,
    y: 300,
    isDrawingLine: isDrawing,
    currentLine: currentLineConnection,
    connections: connections,
    lineDispatcher: connectionLinesDispatcher,
    currentLineDispatcher: currentLineConnectionDispatcher,
    connectionDispatcher: connectionsDispatcher,
    isDrawingDispatcher: isDrawingDispatcher,
  };
  const conPoint3: ConnectorPointProps = {
    id: 2,
    x: 200,
    y: 600,
    isDrawingLine: isDrawing,
    currentLine: currentLineConnection,
    connections: connections,
    lineDispatcher: connectionLinesDispatcher,
    currentLineDispatcher: currentLineConnectionDispatcher,
    connectionDispatcher: connectionsDispatcher,
    isDrawingDispatcher: isDrawingDispatcher,
  };
  const conPoint4: ConnectorPointProps = {
    id: 3,
    x: 500,
    y: 500,
    isDrawingLine: isDrawing,
    currentLine: currentLineConnection,
    connections: connections,
    lineDispatcher: connectionLinesDispatcher,
    currentLineDispatcher: currentLineConnectionDispatcher,
    connectionDispatcher: connectionsDispatcher,
    isDrawingDispatcher: isDrawingDispatcher,
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}
      // onClick={(event) => handleClick(event)}
      onMouseMove={handleMove} >
      <Layer>

        {connectionLines.map(points => {
          return (
            <ConnectorLine {...points}></ConnectorLine>
          );
        })}
        <ConnectorPoint {...conPoint1}></ConnectorPoint>
        <ConnectorPoint {...conPoint2}></ConnectorPoint>
        {/* <ConnectorPoint {...conPoint3}></ConnectorPoint> */}
        {/* <ConnectorPoint {...conPoint4}></ConnectorPoint> */}
        <Switch x={500} y={500} connectorProps={conPoint4}></Switch>
        <Light x={250} y={250} lightIsOn={lightIsOn} connectorProps={conPoint3}></Light>
      </Layer>
    </Stage>
  )
}



// ========================================

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);
