import { createSlice } from "@reduxjs/toolkit";
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

console.log("------store slice has work-----");
// console.log('----initialState----', initialState)

const storeSlice = createSlice({
  name: "store",
  initialState: {
    loading: false,
    storeLists: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateStoreList: (state, action) => {
      state.storeLists = action.payload;
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
      .addCase(fetchListStore.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchListStore.fulfilled, (state, action) => {
        state.storeLists = action.payload.stores;
        state.tableData.total = action.payload.store_total;
        state.loading = false;
      })
      .addCase(fetchListStore.rejected, (state, action) => {
        state.storeLists = [];
        state.loading = false;
      }),
});

export default storeSlice.reducer;

export const { updateStoreList, setTableData, setFilterData } =
  storeSlice.actions;

export const selectListStores = (state) => state.store.storeLists || [];
export const selectTableData = (state) => state.store.tableData || [];
export const selectFilterData = (state) => state.store.filterData || [];
export const selectListStoresStatus = (state) => state.store.loading || false;
