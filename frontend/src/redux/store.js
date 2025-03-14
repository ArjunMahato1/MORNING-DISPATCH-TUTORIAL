import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // Corrected import
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
    user: userReducer,  // Make sure the reducer name matches
});
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
