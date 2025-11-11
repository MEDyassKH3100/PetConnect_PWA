import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import petsReducer from "./petsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
