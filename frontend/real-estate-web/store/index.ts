import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
