import { createSlice } from "@reduxjs/toolkit";
import { fetchListOrderByStatus } from "actions/order.actions";
import { fetchListStore } from "actions/store.actions";

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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orderLists: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateOrderList: (state, action) => {
      state.orderLists = action.payload;
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
      .addCase(fetchListOrderByStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchListOrderByStatus.fulfilled, (state, action) => {
        state.orderLists = action.payload.orders;
        state.tableData.total = action.payload.order_total;
        state.loading = false;
      })
      .addCase(fetchListOrderByStatus.rejected, (state, action) => {
        state.orderLists = [];
        state.loading = false;
      }),
});

export default orderSlice.reducer;

export const { updateOrderList, setTableData, setFilterData } =
  orderSlice.actions;

export const selectListOrders = (state) => state.order.orderLists || [];
export const selectTableData = (state) => state.order.tableData || [];
export const selectFilterData = (state) => state.order.filterData || [];
export const selectListOrderStatus = (state) => state.order.loading || false;
