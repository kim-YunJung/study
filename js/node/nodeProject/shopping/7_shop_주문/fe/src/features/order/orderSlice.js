import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartQty } from "../cart/cartSlice";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// Define initial state
const initialState = {
  orderList: [],
  orderNum: "",
  selectedOrder: {},
  error: "",
  loading: false,
  totalPageNum: 1,
};

// Async thunks
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/order`, payload);

      if(response.status !== 200){
        throw new Error(response.error);
      }

      dispatch(getCartQty());

      return response.data.data;
    } catch (error) {
      dispatch(showToastMessage({message : error.message, status : "error"}));
      return rejectWithValue(error.message)
    }
  }  
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      
    } catch (error) {
      
    }
  }
);

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      
    } catch (error) {
      
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, status }, { dispatch, rejectWithValue }) => {
    try {
      
    } catch (error) {
      
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder 
           .addCase(createOrder.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(createOrder.fulfilled, (state, action) => {
              state.loading = false;
              state.error = "";

              state.orderNum = action.payload;
            })//성공
            .addCase(createOrder.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })//실패
            /* ===== */      
  },
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
