import axiosClient from "./axiosClient";

export const CustomerService = {

    getListCustomes: (params) => {
        return axiosClient.get('/delivery-service/customer/get-customer', params ) 
    },

    getCustomerByPhone: (dataReq) => {
        return axiosClient.post("/delivery-service/customer/get-by-phone", dataReq)
    },

    createCustomerByStore: (dataReq) => {
        return axiosClient.post("/delivery-service/customer/create", dataReq)
    }
};
