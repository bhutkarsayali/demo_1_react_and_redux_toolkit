import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const data = await fetch("https://dummyjson.com/products");
    const json = await data.json();
    console.log(json.products);
    return json.products;
  },
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    status: "idle",
    items: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("products/fetchProducts/pending", (state) => {
        state.status = "loading";
      })
      .addCase("products/fetchProducts/fulfilled", (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase("products/fetchProducts/rejected", (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default productsSlice.reducer;
