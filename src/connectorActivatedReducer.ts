type ConnectorActivatedAction = {
    type: 'SET',
    value: ConnectorActivated,
}

type ConnectorActivated = {
    id: number,
    isActivated: boolean,
}

type ConnectorActivatedState = Array<ConnectorActivated>;

export default function setConnectorActivated(state: ConnectorActivatedState, action: ConnectorActivatedAction) {
    switch (action.type) {
        case 'SET':
            return state.map((a) => {
                if (a.id === action.value.id) {
                    return { id: a.id, isActivated: action.value.isActivated }
                } else {
                    return a;
                }
            })
    }
}