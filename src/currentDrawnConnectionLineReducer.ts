export type CurrentDrawnConnectionLine = {
    id: number,
    leftConnector: number
}

export type CurrentDrawnConnectionLineAction = {
    type: 'SET'
    value: CurrentDrawnConnectionLine
}

export default function setCurrentDrawnLine(state: CurrentDrawnConnectionLine, action: CurrentDrawnConnectionLineAction) {
    switch (action.type) {
        case 'SET':
            return action.value;
    }
}