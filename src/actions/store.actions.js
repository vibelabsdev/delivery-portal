import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListStore = createAsyncThunk(
    'delivery/list-store',
    async (params, { dispatch, getState }) => {
        const response = await NFTService.getChainSupport(params)
        return response.data
    }
)