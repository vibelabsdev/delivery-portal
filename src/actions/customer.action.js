import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerService } from "services/customer.service";

export const fetchListCustomerByStore = createAsyncThunk(
    "customer/listCustomerByStore",
    async (params) => {
      const response = await CustomerService.getListCustomes({
        params,
      });
      return response.data;
    }
  );

export const actionGetUserByPhone = async (dataReq) => {

    const response = await CustomerService.getCustomerByPhone(dataReq);
    return response
}

export const actionCreateCustomer = async (dataReq) => {
    const response = await CustomerService.createCustomerByStore(dataReq)
    return response
}