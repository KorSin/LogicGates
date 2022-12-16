import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./reducers/connectionSlicer"
import connectorPointReducer from "./reducers/connectorPointSlicer";
import isDrawingReducer from "./reducers/currentDrawingSlicer";

const store = configureStore({
    reducer: {
        connection: connectionReducer,
        currentDrawing: isDrawingReducer,
        connectorPoints: connectorPointReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
