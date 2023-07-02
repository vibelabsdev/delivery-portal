import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    avatar: '',
    name: '',
    email: '',
    phone: '',
    store_id: '',
    authority: [],
}

export const userSlice = createSlice({
    name: 'auth/user',
    initialState,
    reducers: {
        setUser: (_, action) => action.payload,
        userLoggedOut: () => initialState,
        request: (state, {payload}) => {
            return {
                ...state,
                loading: true,
            };
        },
        success: (state, {payload}) => {
            return {
                ...state,
                loading: false,
                dataLogin: action.payload,
                error: null,
            };
        }
    },
})

export const { setUser, request } = userSlice.actions

export default userSlice.reducer
