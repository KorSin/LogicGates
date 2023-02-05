import { configureStore } from "@reduxjs/toolkit";
import isDrawingReducer from "./reducers/currentDrawingSlicer";
import networkReducer from "./reducers/networkSlicer";

const store = configureStore({
    reducer: {
        currentDrawing: isDrawingReducer,
        network: networkReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
