import React from "react";

export default class DraggableObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            originalX: 0,
            originalY: 0,
            translateX: 0,
            translateY: 0,
            lastTranslateX: 0,
            lastTranslateY: 0,
        };
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    handleMouseDown( {clientX, clientY}) {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        this.setState({
            originalX: clientX,
            originalY: clientY,
            isDragging: true,
        });
    }

    handleMouseMove({clientX, clientY}) {
        const { isDragging } = this.state;

        if (!isDragging) {
            return;
        }

        this.setState(prevState => ({
            translateX: clientX - prevState.originalX + prevState.lastTranslateX,
            translateY: clientY - prevState.originalY + prevState.lastTranslateY,
        }));
    }

    handleMouseUp(event) {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        if (this.props.propagateCoordinates) {
            this.props.propagateCoordinates(this.state.translateX, this.state.translateY);
        }

        this.setState({
            originalX: 0,
            originalY: 0,
            lastTranslateX: this.state.translateX,
            lastTranslateY: this.state.translateY,
            isDragging: false
        });
    }


    render() {
        const {translateX, translateY} = this.state;
        return (
            <div className={this.props.className}
            onMouseDown={(event) => this.handleMouseDown(event)}
            style={{transform: 'translate(' + translateX + 'px, ' + translateY + 'px)'}}>
                {this.props.children}
            </div>
        )
    }
}
