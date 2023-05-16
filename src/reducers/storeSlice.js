// import { createSlice } from "@reduxjs/toolkit"
// import { fetchListStore } from "actions/store.actions"

// const initialState = {
//     loading: false,
//     items: [],
//     num_of_page: 0
// }

// console.log('------store slice has work-----')
// console.log('----initialState----', initialState)

// const storeSlice = createSlice({
//   name: "store",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) =>
//       builder
//         .addCase(fetchListStore.pending, (state, action) => {
//           console.log('-------hello--pending-')
//           state.loading = true
//         })
//         .addCase(fetchListStore.fulfilled, (state, action) => {
//           console.log('-------hello--pending-')
//           state.items = action.payload.items;
//           state.loading = false
//         })
//         .addCase(fetchListStore.rejected, (state, action) => {
//           state.items = [];
//           state.loading = false
//         }),
// })

// export default storeSlice.reducer

// // export const { } = storeSlice.actions;
// export const selectListStores = (state) => state.store || [];
