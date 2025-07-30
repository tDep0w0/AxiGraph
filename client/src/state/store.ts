import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import resultPanelReducer from "./resultPanelSlice";

export const store = configureStore({
  reducer: { data: dataReducer, panel: resultPanelReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
