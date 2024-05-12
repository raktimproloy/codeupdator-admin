import layout, { profileSlice } from "./layout";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  layout,
  profile: profileSlice.reducer,
});
