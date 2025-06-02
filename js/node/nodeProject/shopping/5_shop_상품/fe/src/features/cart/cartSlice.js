import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

const initialState = {
  loading: false,
  error: "",
  cartList: [],
  selectedItem: {},
  cartItemCount: 0,
  totalPrice: 0,
};

// Async thunk actions
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, size }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`/cart`, {productId : id, size, qty:1});

      if(response.status !== 200){
        throw new Error(response.error);
      }

      dispatch(showToastMessage({message : "장바구니에 등록 되었습니다.", status : "success"}));

      return response.data.cartItemQty;
    } catch (error) {
      dispatch(showToastMessage({message : error.message, status : "error"}));
      return rejectWithValue(error.message)
    }
  }
);

export const getCartList = createAsyncThunk(
  "cart/getCartList",
  async (_, { rejectWithValue, dispatch }) => {}
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id, { rejectWithValue, dispatch }) => {}
);

export const updateQty = createAsyncThunk(
  "cart/updateQty",
  async ({ id, value }, { rejectWithValue }) => {}
);

export const getCartQty = createAsyncThunk(
  "cart/getCartQty",
  async (_, { rejectWithValue, dispatch }) => {}
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initialCart: (state) => {
      state.cartItemCount = 0;
    },
    // You can still add reducers here for non-async actions if necessary
  },
  extraReducers: (builder) => {    
    builder 
           .addCase(addToCart.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(addToCart.fulfilled, (state, action) => {
              state.loading = false;
              state.error = "";

              state.cartItemCount = action.payload;
            })//성공
            .addCase(addToCart.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })//실패
            /* ===== */            
  },
});

export default cartSlice.reducer;
export const { initialCart } = cartSlice.actions;
