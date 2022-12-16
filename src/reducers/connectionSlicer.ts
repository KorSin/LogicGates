import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Connection = {
    leftConnector: string,
    rightConnector: string,
}

const connectionSlice = createSlice({
    name: 'connection',
    initialState: [] as Connection[],
    reducers: {
        createConnection(state, action: PayloadAction<Connection>) {
            state.push(action.payload);
        }
    }
})

export const { createConnection } = connectionSlice.actions

export default connectionSlice.reducer