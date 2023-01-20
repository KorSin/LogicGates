import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConnectorPoint = {
    id: string,
    x: number,
    y: number,
    isActivated: boolean
}

const connectorPointSlicer = createSlice({
    name: 'connectorPoint',
    initialState: [] as ConnectorPoint[],
    reducers: {
        createConnectorPoint(state, action: PayloadAction<ConnectorPoint>) {
            state.push(action.payload)
        },
        updateConnectorPoint(state, action: PayloadAction<{ id: string, x: number, y: number }>) {
            const point = state.find(it => it.id === action.payload.id)
            if (point) {
                point.x = action.payload.x
                point.y = action.payload.y
            }
        },
        activateConnectorPoint(state, action: PayloadAction<{ id: string }>) {
            const point = state.find(it => it.id === action.payload.id)
            if (point) {
                point.isActivated = true;
            }
        },
        deactivateConnectorPoint(state, action: PayloadAction<{ id: string }>) {
            const point = state.find(it => it.id === action.payload.id)
            if (point) {
                point.isActivated = false;
            }
        }
    }
})

export const { createConnectorPoint, updateConnectorPoint, activateConnectorPoint, deactivateConnectorPoint } = connectorPointSlicer.actions

export default connectorPointSlicer.reducer