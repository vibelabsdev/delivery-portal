import axiosClient from './axiosClient';

export const StoreService = {
    
    getListStores: (params) => {
        return axiosClient.get('/delivery-service/store/stores', params ) 
    },

    createStores: (dataReq) => {
        // return axiosClient.get('/delivery-service/store/stores', params ) 
        console.log('----dataReq------', dataReq)
        return axiosClient.post('/delivery-service/store/store-cr', dataReq)
    },
}
