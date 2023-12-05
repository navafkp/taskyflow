import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userdataSlice from "./userdataSlice";
import { combineReducers } from "@reduxjs/toolkit";
import userslistSlice from './userslistSlice'
import loadingSlice from "./loadingSlice";
import notificationSlice from "./notificationSlice";


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    usertoken: authSlice,
    userData: userdataSlice,
    users : userslistSlice,
    loading: loadingSlice,
    notification:notificationSlice,
});

const persistRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistRootReducer,

});

const persistor = persistStore(store)
export { store, persistor };
