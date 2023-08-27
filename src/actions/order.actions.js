import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderService } from "services/order.service";

export const fetchListOrderByStatus = createAsyncThunk(
  "order/listOrderByStatus",
  async (params) => {
    const response = await OrderService.getListOrderByStatus({
      params,
    });
    return response.data;
  }
);

export const actionCreateOrder = async (dataReq) => {

  const response = await OrderService.createOrder(dataReq)
  return response
}

