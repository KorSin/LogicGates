import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./reducers/connectionSlicer"
import connectorPointReducer from "./reducers/connectorPointSlicer";
import isDrawingReducer from "./reducers/currentDrawingSlicer";
import networkReducer from "./reducers/networkSlicer";

const store = configureStore({
    reducer: {
        connection: connectionReducer,
        currentDrawing: isDrawingReducer,
        connectorPoints: connectorPointReducer,
        network: networkReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
