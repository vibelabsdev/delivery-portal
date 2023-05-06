import { combineReducers } from '@reduxjs/toolkit'
import session from './sessionSlice'
import user from './userSlice'
import authReducer from "../../slices/auth";
const reducer = combineReducers({
    session,
    user,
    authReducer,
})

export default reducer
