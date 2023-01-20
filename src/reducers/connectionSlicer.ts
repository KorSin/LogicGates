import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Connection = {
    leftConnector: string,
    rightConnector: string,
    isActivated: boolean,
}

const connectionSlice = createSlice({
    name: 'connection',
    initialState: [] as Connection[],
    reducers: {
        createConnection(state, action: PayloadAction<Connection>) {
            state.push(action.payload);
        },
        activateConnection(state, action: PayloadAction<string>) {
            const connection = state.find(it => it.leftConnector === action.payload || it.rightConnector === action.payload)
            if (connection) {
                connection.isActivated = true
            }
        },
        deactivateConnection(state, action: PayloadAction<string>) {
            const connection = state.find(it => it.leftConnector === action.payload || it.rightConnector === action.payload)
            if (connection) {
                connection.isActivated = false
            }
        }
    }
})

export const { createConnection, activateConnection, deactivateConnection } = connectionSlice.actions

export default connectionSlice.reducer