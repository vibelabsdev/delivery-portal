const { createSlice } = require("@reduxjs/toolkit")
const { fetchLogin } = require("actions")
const { LocalStorageService } = require("helpers")


const refreshToken = LocalStorageService.getRefreshToken()

const initialState = refreshToken 
    ? { isLoggedIn: true, loading: false, refreshToken }
    : { isLoggedIn: false,loading: false, refreshToken: null }

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        
        // [fetchLogin.fulfilled]: (state, action) => {
        //   state.isLoggedIn = true;
        //   state.refreshToken = action.payload.refreshToken;
        // },
        // [fetchLogin.rejected]: (state, action) => {
        //   state.isLoggedIn = false;
        //   state.refreshToken = null;
        // },
        
    },
  
})

const { reducer } = authSlice;
export default reducer;