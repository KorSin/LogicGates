import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConnectorPoint = {
    id: string,
    x: number,
    y: number,
}

const connectorPointSlicer = createSlice({
    name: 'connectorPoint',
    initialState: [{
        id: "Light1_1",
        x: 250,
        y: 250 + 25,
    }, {
        id: "Light2_1",
        x: 250,
        y: 250 + 25,
    }
    ],
    reducers: {
        createConnectorPoint(state, action: PayloadAction<ConnectorPoint>) {
            state.push(action.payload)
        },
        updateConnectorPoint(state, action: PayloadAction<ConnectorPoint>) {
            const point = state.find(it => it.id === action.payload.id)
            if (point) {
                point.x = action.payload.x
                point.y = action.payload.y
            }
        }
    }
})

export const { createConnectorPoint, updateConnectorPoint } = connectorPointSlicer.actions

export default connectorPointSlicer.reducer