import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../feature/counterSlice";

export default configureStore({
  reducer: { counterReducer },
});
