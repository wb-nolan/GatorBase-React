import { configureStore } from "@reduxjs/toolkit";
import entriesReducer from './entriesSlice';
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: {
        entries: entriesReducer, // other reducers here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;