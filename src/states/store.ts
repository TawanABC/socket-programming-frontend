/* eslint-disable @typescript-eslint/no-explicit-any */
// Import reducers
import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import { chatReducer } from "./features/chatSlice";
import { authReducer } from './features/authSlices';
import { userReducer } from './features/userSlice';

export const resetState = createAction("resetState");

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === resetState.type) {
        storage.removeItem("persist:root");
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }),
})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;