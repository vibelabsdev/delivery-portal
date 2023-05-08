import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
import { store } from "./storeSlice";

const rootReducer = combineReducers({
  auth,
  store,
});

export default rootReducer;
