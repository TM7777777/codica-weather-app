import { configureStore } from "@reduxjs/toolkit";
import { townsReducer } from "./slices/townsSlice";
import { hoursTownReducer } from "./slices/hoursTownSlice";

export const store = configureStore({
  reducer: {
    townsReducer,
    hoursTownReducer,
  },
});
