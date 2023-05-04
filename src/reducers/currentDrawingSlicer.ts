import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrentDrawProperties = {
    isDrawing: boolean,
    currentConnector: string,
}

const initialState: CurrentDrawProperties = {
    isDrawing: false,
    currentConnector: "",
}

const currentDrawingSlicer = createSlice({
    name: 'isDrawing',
    initialState: initialState,
    reducers: {
        setCurrentDrawing(state, action: PayloadAction<CurrentDrawProperties>) {
            return action.payload
        }
    }
})

export const { setCurrentDrawing } = currentDrawingSlicer.actions

export default currentDrawingSlicer.reducer