import axiosClient from './axiosClient';

export const OrderService = {
    
    getListOrderByStatus: (params) => {
        return axiosClient.get('/delivery-service/order/order-all', params ) 
    },
}

