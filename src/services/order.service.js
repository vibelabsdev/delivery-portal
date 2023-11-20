import axiosClient from "./axiosClient";

export const OrderService = {
  
  getListOrderByStatus: (params) => {
    
    const userRole = localStorage.getItem('role')

    if(userRole === 'store') {
      return axiosClient.get("/delivery-service/order/orders", params);
    } else {
      return axiosClient.get("/delivery-service/order/order-all", params);
    }
  },

  createOrder: (dataReq) => {
    return axiosClient.post('/delivery-service/order/order-cr', dataReq)
  },

  getOrderById: (params) => {
    return axiosClient.get("/delivery-service/order/detail", params)
  }
};
