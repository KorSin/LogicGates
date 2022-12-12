export type Connection = {
    id: number,
    leftConnector: number,
    rightConnector: number,
}

export type ConnectionAction = {
    type: 'CREATE' | 'DELETE',
    connection: Connection
}

type ConnectionState = Array<Connection>;

export default function setConnection(state: ConnectionState, action: ConnectionAction) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.connection);
        case 'DELETE':
            return state.filter((c) => {
                return c.id !== action.connection.id;
            });
    }
}