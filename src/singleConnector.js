import React from "react";
import DraggableObject from "./draggableObject";
import './singleConnector.css'

export default class SingleConnector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineStartX: 50,
            lineStartY: 25,

            lineEndX: 0,
            lineEndY: 0,

            boxPositionX: 0,
            boxPositionY: 0,

            showLine: false,

            lineAngle: 0,
            lineDistance: 0,
        };

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleDraggingEnded = this.handleDraggingEnded.bind(this);
    }

    handleMouseDown(event) {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        this.computeAngle();
        
        this.setState({
            lineEndX: event.clientX,
            lineEndY: event.clientY,
            showLine: true,
        });


        event.stopPropagation();
    }

    handleMouseMove({clientX, clientY}) {
        this.setState(({
            lineEndX: clientX,
            lineEndY: clientY,
        }));

        this.computeAngle();
    }

    handleMouseUp(event) {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        this.setState({
            lineEndX: 0,
            lineEndY: 0,
            showLine: true
        });
    }

    handleDraggingEnded(x, y) {
        console.log(x);
        this.setState({
            boxPositionX: x,
            boxPositionY: y,
        });
    }

    computeAngle() {
        const x1 = this.state.lineStartX;
        const y1 = this.state.lineStartY;
        const x2 = this.state.lineEndX - this.state.boxPositionX - 25;
        const y2 = this.state.lineEndY - this.state.boxPositionY - 25;

        const dist = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
        
        const angle = Math.atan2(y2-y1, x2-x1)*180/Math.PI;

        this.setState({
            lineDistance: dist,
            lineAngle: angle,
        });
    }

    render() {
        return (
            <DraggableObject className="single-connector-square"
            propagateCoordinates={this.handleDraggingEnded}> 
                <button className="single-connector-circle"
                onMouseDown={(event) => this.handleMouseDown(event)}>
                </button>
            <div className='line'
                style={{
                    width: this.state.lineDistance + 'px',
                    transform: 'rotate(' + this.state.lineAngle + 'deg)',
                    display: this.state.showLine ? 'inline' : 'none',
                    top: this.state.lineStartY,
                    left: this.state.lineStartX,
                }}>
                </div>
            </DraggableObject>                
        )
    }
}