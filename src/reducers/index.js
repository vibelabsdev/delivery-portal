import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
// import storeSlice from "./storeSlice";

const rootReducer = combineReducers({
  auth,
  // storeSlice,
});

export default rootReducer;
