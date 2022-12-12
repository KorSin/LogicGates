
export type IsDrawingAction = {
    type: 'SET',
    value: boolean
}

export default function setIsDrawing(state: boolean, action: IsDrawingAction) {
    switch (action.type) {
        case 'SET':
            return action.value;
    }
}