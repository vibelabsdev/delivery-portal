import { createAsyncThunk } from "@reduxjs/toolkit";
import { DashboardService } from "services/dashboard.service";



export const fetchDataDashboard = createAsyncThunk(
    'dashboard/fetchDataDashboard',
    async (params) => {
        const response = await DashboardService.getReportByAdmin({
            params
        })
        console.log('-----fetchDataDashboard---res----', response)
        return response.data
    }
)
