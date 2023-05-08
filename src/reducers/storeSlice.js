import { fetchListCHAINS } from "@/actions/nftActions"
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./rootReducer"


const initialState = {
    loading: false,
    items: [],
    itemKeyTypes: [],
    num_of_page: 0
}

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    save(state, action) {
      const { value, key } = action.payload
      state[key] = value
    }
  },
  extraReducers: (builder) => {
    builder
      /**
       * * fetchReviewVideo
       */
      .addCase(fetchListCHAINS.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchListCHAINS.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.itemKeyTypes = getItemKeys(action.payload.items)
      })
      .addCase(fetchListCHAINS.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export default storeSlice.reducer

// export const {} = videoSlice.actions

export const selectListChainNFT = (state) => state.store.items || [];
