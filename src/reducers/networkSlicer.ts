import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectorPointState, NetworkNode } from "./network";

export type Network = {
    nodes: NetworkNode[],
    connectorPoints: ConnectorPointState[]
}

const initialState: Network = {
    nodes: [],
    connectorPoints: [],
}


const networkSlicer = createSlice({
    name: 'Network',
    initialState: initialState,
    reducers: {
        createNetworkNode(state, action: PayloadAction<NetworkNode>) {
            state.nodes.push(action.payload);
        },
        createConnectorPoint(state, action: PayloadAction<ConnectorPointState>) {
            state.connectorPoints.push(action.payload);
        },
        activateConnectorPoint(state, action: PayloadAction<string>) {
            const point = state.connectorPoints.find(it => it.id === action.payload)
            if (point) {
                point.isActive = true
                if (point.connectedTo) {
                    const otherPoint = state.connectorPoints.find(p => p.id === point.connectedTo);
                    if (otherPoint) {
                        otherPoint.isActive = true;
                    }
                }
            }
        },
        updateConnectorPointCoords(state, action: PayloadAction<{ id: string, x: number, y: number }>) {
            const point = state.connectorPoints.find(it => it.id === action.payload.id)
            if (point) {
                point.x = action.payload.x;
                point.y = action.payload.y;
            }
        },
        connectTwoPoints(state, action: PayloadAction<{ id_1: string, id_2: string }>) {
            const point1 = state.connectorPoints.find(it => it.id === action.payload.id_1)
            const point2 = state.connectorPoints.find(it => it.id === action.payload.id_2)

            if (point1 && point2) {
                point1.connectedTo = point2.id
                point2.connectedTo = point1.id
            }
        }
    }
})

export const { createNetworkNode, createConnectorPoint, activateConnectorPoint, updateConnectorPointCoords, connectTwoPoints } = networkSlicer.actions

export default networkSlicer.reducer