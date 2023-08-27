import axiosClient from "./axiosClient";

export const OrderService = {
  getListOrderByStatus: (params) => {
    if(params.params.store_id) {
      return axiosClient.get("/delivery-service/order/orders", params);
    } else {
      return axiosClient.get("/delivery-service/order/order-all", params);
    }
  },

  createOrder: (dataReq) => {
    return axiosClient.post('/delivery-service/order/order-cr', dataReq)
  },
};
