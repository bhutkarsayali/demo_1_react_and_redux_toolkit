import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      console.log("ACTION====>>>>>:", action);
      //   console.log("Adding to cart:", action.payload);
      //   console.log("Updated cart items:", state.items);
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
      // ABOVE OR BELOW==>>
      const cartData = state.items.filter(
        (item) => item.id !== action.payload.id,
      );
      state.items = cartData;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateCart: (state, action) => {
      console.log("Updating cart with payload:", action.payload);
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
       console.log("Updating cart with payload:", action.payload);
      const index = state.items.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.items[index].quantity = Math.max(1, quantity); // defensive
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
