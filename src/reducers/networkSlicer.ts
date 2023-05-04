import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrGate } from "../OrGate";
import { ConnectorPointState, NetworkNode } from "./network";

export type Network = {
    nodes: Record<string, NetworkNode>,
    connectorPoints: Record<string, ConnectorPointState>
}

const initialState: Network = {
    nodes: {},
    connectorPoints: {},
}

type UpdateAction = {
    id: string,
    toggle: boolean,
}

const networkSlicer = createSlice({
    name: 'Network',
    initialState: initialState,
    reducers: {
        createNetworkNode(state, action: PayloadAction<NetworkNode>) {
            state.nodes[action.payload.id] = action.payload;
        },
        createConnectorPoint(state, action: PayloadAction<ConnectorPointState>) {
            state.connectorPoints[action.payload.id] = action.payload;
        },
        toggleConnectorPoint(state, action: PayloadAction<string>) {
            const pointsToUpdate: UpdateAction[] = [{ id: action.payload, toggle: !state.connectorPoints[action.payload].isActive }]
            while (pointsToUpdate.length) {
                const nextAction = pointsToUpdate.pop()
                if (!nextAction) {
                    break
                }

                const nextPoint = state.connectorPoints[nextAction.id]
                nextPoint.isActive = nextAction.toggle
                if (nextPoint.connectedTo) {
                    const otherPoint = state.connectorPoints[nextPoint.connectedTo]
                    otherPoint.isActive = nextPoint.isActive
                    const node = state.nodes[otherPoint.networkNode]
                    updateNetorkNode(node, state.connectorPoints, pointsToUpdate)
                }
            }
        },
        updateConnectorPointCoords(state, action: PayloadAction<{ id: string, x: number, y: number }>) {
            const point = state.connectorPoints[action.payload.id]
            if (point) {
                point.x = action.payload.x;
                point.y = action.payload.y;
            }
        },
        connectTwoPoints(state, action: PayloadAction<{ id_1: string, id_2: string }>) {
            const point1 = state.connectorPoints[action.payload.id_1]
            const point2 = state.connectorPoints[action.payload.id_2]

            if (point1 && point2) {
                point1.connectedTo = point2.id
                point2.connectedTo = point1.id
            }
        }
    }
})

const updateNetorkNode = (node: NetworkNode, connectorPoints: Record<string, ConnectorPointState>, pointsToUpdate: UpdateAction[]) => {
    const nodePoints = node.connectorPoints.map(point => connectorPoints[point])
    if (node.type === "Splitter") {
        pointsToUpdate.push({ id: node.connectorPoints[1], toggle: !nodePoints[1].isActive })
        pointsToUpdate.push({ id: node.connectorPoints[2], toggle: !nodePoints[2].isActive })
    } else if (node.type === "AndGate") {
        if (nodePoints[0].isActive && nodePoints[1].isActive) {
            if (!nodePoints[2].isActive) {
                pointsToUpdate.push({ id: node.connectorPoints[2], toggle: true })
            }
        }
        else if (!nodePoints[0].isActive || !nodePoints[1].isActive) {
            if (nodePoints[2].isActive) {
                pointsToUpdate.push({ id: node.connectorPoints[2], toggle: false })
            }
        }
    } else if (node.type === "OrGate") {
        if (nodePoints[0].isActive || nodePoints[1].isActive) {
            if (!nodePoints[2].isActive) {
                pointsToUpdate.push({ id: node.connectorPoints[2], toggle: true })
            }
        }
        else if (!nodePoints[0].isActive && !nodePoints[1].isActive) {
            if (nodePoints[2].isActive) {
                pointsToUpdate.push({ id: node.connectorPoints[2], toggle: false })
            }
        }
    } else if (node.type === "XorGate") {
        if ((nodePoints[0].isActive && !nodePoints[1].isActive) || (!nodePoints[0].isActive && nodePoints[1].isActive)) {
            if (!nodePoints[2].isActive) {
                pointsToUpdate.push({ id: node.connectorPoints[2], toggle: true })
            }
        } else {
            if (nodePoints[2].isActive) {
                pointsToUpdate.push({ id: node.connectorPoints[2], toggle: false })
            }
        }
    }
}


export const { createNetworkNode, createConnectorPoint, toggleConnectorPoint, updateConnectorPointCoords, connectTwoPoints } = networkSlicer.actions

export default networkSlicer.reducer