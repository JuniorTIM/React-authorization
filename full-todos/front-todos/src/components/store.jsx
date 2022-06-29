import { configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "./Reducer";

export const store = configureStore({
    reducer: todosSlice
  })