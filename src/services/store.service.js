import axiosClient from './axiosClient';

export const StoreService = {
    
    getListStores: (params) => {
        return axiosClient.get('/delivery-service/store/stores', params ) 
    },
}

