import axiosClient from './axiosClient';

export const DashboardService = {
    
    getReportByAdmin: ({params}) => {
        return axiosClient.post('/delivery-service/store/report-admin', params ) 
    },
}
