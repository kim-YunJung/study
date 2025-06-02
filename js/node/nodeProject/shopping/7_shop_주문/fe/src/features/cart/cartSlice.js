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
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get(`/cart`);

      if(response.status !== 200){
        throw new Error(response.error);
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

/* https://hackmd.io/@oW_dDxdsRoSpl0M64Tfg2g/HkP4v_H53 */
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/cart/${id}`);

      if(response.status !== 200){
        throw new Error(response.error);
      }

      dispatch(getCartQty());
      dispatch(getCartList());

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const updateQty = createAsyncThunk(
  "cart/updateQty",
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/${id}`, {qty : value});

      if(response.status !== 200){
        throw new Error(response.error);
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const getCartQty = createAsyncThunk(
  "cart/getCartQty",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/cart/qty");

      if (response.status !== 200) 
        throw new Error(response.error);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
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
            .addCase(getCartList.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(getCartList.fulfilled, (state, action) => {
              state.loading = false;
              state.error = "";

              state.cartList = action.payload;             
              state.totalPrice = action.payload.reduce((total, item) => 
                total + item.productId.price * item.qty, 0)              
            })//성공
            .addCase(getCartList.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })//실패
            /* ===== */  
            .addCase(deleteCartItem.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(deleteCartItem.fulfilled, (state, action) => {
              state.loading = false;
              state.error = "";
            })//성공
            .addCase(deleteCartItem.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })//실패
            /* ===== */ 
            .addCase(updateQty.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(updateQty.fulfilled, (state, action) => {
              state.loading = false;
              state.error = "";

              state.totalPrice = action.payload.reduce((total, item) => 
                total + item.productId.price * item.qty, 0)             
              state.cartList = action.payload;
            })//성공
            .addCase(updateQty.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })//실패
            /* ===== */ 
            .addCase(getCartQty.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(getCartQty.fulfilled, (state, action) => {
              state.loading = false;
              state.error = "";

              state.cartItemCount = action.payload;
            })//성공
            .addCase(getCartQty.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })//실패
  },
});

export default cartSlice.reducer;
export const { initialCart } = cartSlice.actions;
