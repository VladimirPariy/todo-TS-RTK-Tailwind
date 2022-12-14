import {configureStore} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import {persistedReducer} from "./reduxPersistor";


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)