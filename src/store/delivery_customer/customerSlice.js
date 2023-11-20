import { createSlice } from "@reduxjs/toolkit";
import { fetchListCustomerByStore } from "actions/customer.action";

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 5,
  query: "",
  sort: {
    order: "",
    key: "",
  },
};

export const initialFilterData = {
  name: "",
  category: ["bags", "cloths", "devices", "shoes", "watches"],
  status: [0, 1, 2],
  productStatus: 0,
};

// const initialState = {
//     loading: false,
//     items: [],
//     num_of_page: 0
// }


const customerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    customerLists: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateCustomerList: (state, action) => {
      state.customerLists = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchListCustomerByStore.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchListCustomerByStore.fulfilled, (state, action) => {
        state.customerLists = action.payload.customers;
        state.tableData.total = action.payload.customer_total;
        state.loading = false;
      })
      .addCase(fetchListCustomerByStore.rejected, (state, action) => {
        state.customerLists = [];
        state.loading = false;
      }),
});

export default customerSlice.reducer;

export const { updateCustomerList, setTableData, setFilterData } =
customerSlice.actions;

export const selectListCustomers = (state) => state.customer.customerLists || [];
export const selectTableData = (state) => state.customer.tableData || [];
export const selectFilterData = (state) => state.customer.filterData || [];
export const selectListCustomersStatus = (state) => state.customer.loading || false;
