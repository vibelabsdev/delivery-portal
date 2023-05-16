
import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreService } from "services/store.service";


export const fetchListStore = createAsyncThunk(
    'store/list_store',
    async (params) => {
        const response = await StoreService.getListStores({
            params
        })
        return response.data
    }
)
