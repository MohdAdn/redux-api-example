import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchItems,
  addItem,
  UpdateItem,
  deleteItem,
  updateItem,
} from "./cartApi";

const initialState = {
  items: [],
  status: "idle",
};

export const productsAsync = createAsyncThunk("cart/fetchItems", async () => {
  const response = await fetchItems();
  return response.data;
});

export const addItemAsync = createAsyncThunk("cart/addItem", async (item) => {
  const { title, id, price, brand, thumbnail } = item;
  const response = await addItem({
    title,
    id,
    price,
    brand,
    thumbnail,
    quantity: 1,
  });
  return response.data;
});
export const deleteItemAsync = createAsyncThunk(
  "cart/deleteItem",
  async (id) => {
    await deleteItem(id);
    return id;
  }
);
export const updateItemAsync = createAsyncThunk(
  "cart/updateItem",
  async ({ id, change }) => {
    const response = await updateItem(id, change);
    return response.data;
  }
);
export const cartSlice = createSlice({
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
        state.items = action.payload;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        state.items.splice(index, 1, action.payload);
      });
  },
});

//export const {t } = productsSlice.actions;
export default cartSlice.reducer;
