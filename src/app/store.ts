import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../app/api/authApi";
import { planApi } from "../app/api/planApi";
import { courseApi } from "../app/api/courseApi";
import { userApi } from "../app/api/userApi";
import authReducer from "../features/auth/authSlice";
import { assignApi } from "./api/assignApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [assignApi.reducerPath]: assignApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(planApi.middleware)
      .concat(courseApi.middleware)
      .concat(userApi.middleware)
      .concat(assignApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
