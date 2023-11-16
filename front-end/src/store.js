import productSlice from "./features/productSlice";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import appApi from "./services/appApi";
import { combineReducers } from "redux";
import userSlice from "./features/userSlice";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath, "products"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
});

export default store;
