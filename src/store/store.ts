import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./fileReducer";
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: {
        file: fileReducer, // other reducers here
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Define RootState and AppDispatch based on your store setup
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


