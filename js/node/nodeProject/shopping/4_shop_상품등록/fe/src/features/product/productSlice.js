import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// 비동기 액션 생성
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get("/product");

      if(response.status !== 200){
        throw new Error(response.error);
      }

      return response.data.list;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id, { rejectWithValue }) => {}
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/product", formData);

      if(response.status !== 200){
        throw new Error(response.error);
      }

      dispatch(showToastMessage({message : "상품등록이 되었습니다.", status : "success"}));

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch, rejectWithValue }) => {}
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, ...formData }, { dispatch, rejectWithValue }) => {}
);

// 슬라이스 생성
const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    selectedProduct: null,
    loading: false,
    error: "",
    totalPageNum: 1,
    success: false,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilteredList: (state, action) => {
      state.filteredList = action.payload;
    },
    clearError: (state) => {
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    /* -- 리덕스에서 나온 결과물을 저장 -- */
    builder 
           .addCase(createProduct.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(createProduct.fulfilled, (state) => {
              state.loading = false;//로딩바 끄기
              state.error = "";//에러 초기화

              //상품 생성 성공 시, 다이얼로그 닫음
              //상품 생성 실패 시, 다이얼 로그 닫지 않음
              state.success = true;
            })//성공
            .addCase(createProduct.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;//에러 셋팅

              state.success = false;
            })//실패

            .addCase(getProductList.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(getProductList.fulfilled, (state, action) => {
              state.loading = false;//로딩바 끄기
              state.error = "";//에러 초기화
     
              state.productList = action.payload;
            })//성공
            .addCase(getProductList.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;//에러 셋팅
            })//실패
  },
});

export const { setSelectedProduct, setFilteredList, clearError } =
  productSlice.actions;
export default productSlice.reducer;
