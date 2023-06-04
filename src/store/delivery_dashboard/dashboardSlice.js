import { createSlice } from "@reduxjs/toolkit"
import { fetchDataDashboard } from "actions/dashboard.actions"
import { fetchListOrderByStatus } from "actions/order.actions"
import { fetchListStore } from "actions/store.actions"

export const initialDashboardData = {

    order_wait: 0,
    order_fail: 0,
    order_success: 0,
    total_order: 0,
    order_cancel: 0,
    total_amount: 0,
    order_delivering: 0,
    order_partial_success: 0,
    ship: 0,
}

export const initialFilterData = {
  name: '',
  category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
  status: [0, 1, 2],
  productStatus: 0,
}


const dashboardSlice = createSlice({
  name: "order",
  initialState: {
      loading: false,
      dashboardData: initialDashboardData,
  },
  reducers: {
    
  },
  extraReducers: (builder) =>
      builder
        .addCase(fetchDataDashboard.pending, (state, action) => {
          state.loading = true
        })
        .addCase(fetchDataDashboard.fulfilled, (state, action) => {
            state.dashboardData.total_order = action.payload.total_order;
            state.dashboardData.order_fail = action.payload.order_fail;
            state.dashboardData.order_success = action.payload.order_wait;
            state.dashboardData.order_partial_success = action.payload.order_partial_success;
            
            state.dashboardData.order_cancel = action.payload.order_cancel;
            state.dashboardData.total_amount = action.payload.total_amount;
            state.dashboardData.ship = action.payload.ship;
            state.loading = false
        })
        .addCase(fetchDataDashboard.rejected, (state, action) => {
          state.orderLists = [];
          state.loading = false
        }),
})

export default dashboardSlice.reducer

export const {

} = dashboardSlice.actions


export const selectDashboardData = (state) => state.dashboard.dashboardData || [];
export const selectDashboardStatus = (state) => state.dashboard.loading || false;
