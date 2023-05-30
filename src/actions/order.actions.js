import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderService } from "services/order.service";

export const fetchListOrderByStatus = createAsyncThunk(
  "order/list_orders",
  async (params) => {
    const response = await OrderService.getListOrderByStatus({
      params,
    });
    return response.data;
  }
);
