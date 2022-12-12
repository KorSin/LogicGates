
export type ConnectionLineAction = {
    type: 'CREATE' | 'UPDATE_LEFT_POINT' | 'UPDATE_RIGHT_POINT' | 'TOGGLE_ACTIVATE' | 'DELETE',
    value: any
}

export type ConnectionLine = {
    id: number,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    isActivated: boolean,
}

type ConnectionLineState = Array<ConnectionLine>;

const initialState: ConnectionLineState = [];

export default function setConnectionLine(state: ConnectionLineState = initialState, action: ConnectionLineAction) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.value);
        case 'UPDATE_LEFT_POINT':
            return state.map((line) => {
                if (line.id === action.value.id) {
                    const newLine: ConnectionLine = {
                        id: line.id,
                        x0: action.value.x0,
                        y0: action.value.y0,
                        x1: line.x1,
                        y1: line.y1,
                        isActivated: line.isActivated
                    }
                    return newLine;
                } else {
                    return line;
                }
            });
        case 'UPDATE_RIGHT_POINT':
            return state.map((line) => {
                if (line.id === action.value.id) {
                    const newLine: ConnectionLine = {
                        id: line.id,
                        x0: line.x0,
                        y0: line.y0,
                        x1: action.value.x1,
                        y1: action.value.y1,
                        isActivated: line.isActivated
                    }
                    return newLine;
                } else {
                    return line;
                }
            });
        case 'TOGGLE_ACTIVATE':
            return state.map((line) => {
                if (line.id === action.value.id) {
                    const newLine: ConnectionLine = {
                        id: line.id,
                        x0: line.x0,
                        y0: line.y0,
                        x1: line.x1,
                        y1: line.y1,
                        isActivated: action.value.isActivated
                    }
                    return newLine;
                } else {
                    return line;
                }
            });
        case 'DELETE':
            return state.filter((line) => line.id !== action.value.id);
    }
}