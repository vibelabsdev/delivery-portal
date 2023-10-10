import { createAsyncThunk } from "@reduxjs/toolkit";
import { DashboardService } from "services/dashboard.service";



export const fetchDataDashboard = createAsyncThunk(
    'dashboard/fetchDataDashboard',
    async (params) => {
        
        if ('store_id' in params ) {
            params['_id'] = params['store_id'];
            const response = await DashboardService.getReportByStore({
                params
            })
            return response.data
        } else {
            const response = await DashboardService.getReportByAdmin({
                params
            })
            
            return response.data
            
        }
                
    }
)
