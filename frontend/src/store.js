import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['register']
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer
  },
  middleware: [...getDefaultMiddleware({ serializableCheck: false })]
});

const persistor = persistStore(store);

export { store, persistor };
