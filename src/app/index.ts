import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "./features/favouriteReducer";

const store = configureStore({
  reducer: {
    favourite: favouriteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
