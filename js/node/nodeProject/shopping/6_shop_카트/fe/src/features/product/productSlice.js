import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// 비동기 액션 생성
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (query, { rejectWithValue }) => {
    try {
                                                  //파라미터에 모든 쿼리를 보낸다.
      const response = await api.get("/product", {params : {...query}});

      if(response.status !== 200){
        throw new Error(response.error);
      }
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/product/${id}`);

      if(response.status !== 200){
        throw new Error(response.error);
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
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

      //조회화면을 다시 조회한다.
      dispatch(getProductList({page : 1}));

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
  async ({ id, ...formData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/product/${id}`, formData);
   
      if(response.status !== 200){
        throw new Error(response.error);
      }
      
      //성공메시지
      dispatch(showToastMessage({message : "상품수정이 되었습니다.", status : "success"}));
      //조회화면을 다시 조회한다.
      dispatch(getProductList({page : 1}));

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
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
      //정보를 저장하거나 수정하는 등의 작업(저장등의 작업은 Thunk에서 작업을 수행함)을 수행하지 않아
      //, reducers에서 작업을 수행한다.
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
            /* ===== */            
            .addCase(getProductList.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(getProductList.fulfilled, (state, action) => {
              state.loading = false;//로딩바 끄기
              state.error = "";//에러 초기화
     
              state.productList = action.payload.data;
              state.totalPageNum = action.payload.totalPageNum;
            })//성공
            .addCase(getProductList.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;//에러 셋팅
            })//실패
            /* ===== */            
            .addCase(editProduct.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(editProduct.fulfilled, (state, action) => {
              state.loading = false;//로딩바 끄기
              state.error = "";//에러 초기화
              state.success = true;
            })//성공
            .addCase(editProduct.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;//에러 셋팅
              state.success = false;
            })//실패
            /* ===== */                        
            .addCase(getProductDetail.pending, (state) => {
              state.loading = true;
            })//대기
            .addCase(getProductDetail.fulfilled, (state, action) => {
              state.loading = false;//로딩바 끄기
              state.error = "";//에러 초기화
              state.selectedProduct = action.payload;
            })//성공
            .addCase(getProductDetail.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;//에러 셋팅
            })//실패
  },
});

export const { setSelectedProduct, setFilteredList, clearError } =
  productSlice.actions;
export default productSlice.reducer;
