import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsApi";

const initialState = {
  products: [],
  status: "idle",
};

export const productsAsync = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

//export const {t } = productsSlice.actions;
export default productsSlice.reducer;
