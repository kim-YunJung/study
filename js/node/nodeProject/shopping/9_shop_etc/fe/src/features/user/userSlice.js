import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";
import { initialCart } from "../cart/cartSlice";

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      /* -- 작업내용 -- */
      const response = await api.post("/auth/login", {email, password});
      
      //성공      
      //---> 토큰 정보를 저장
      sessionStorage.setItem("token", response.data.token);

      //---> 메인페이지 이동(로그인 페이지에서 처리)
      return response.data;
    
    } catch (error) {
      //---> 실패시 생긴 에러값을 redqucer에 저장
      return rejectWithValue(error.message)

    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/google", {token});
      sessionStorage.setItem("token", response.data.token);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("token");
  window.location.reload();
}

/*createAsyncThunk - 상태를 알아서 3가지 상태로 전달 

pending
비동기 작업을 시작했을 때 상태
fulfilled
비동기 작업이 끝났을 때 상태
rejected
오류가 생겨서 중단됐을 때 상태*/
export const registerUser = createAsyncThunk(
  "user/registerUser",//액션이름 - api 주소? 
  async (
    { email, name, password, navigate },//파라미터
    { dispatch, rejectWithValue }//thunk에서 필요한 함수 가져옴
  ) => {
    /* -- 작업내용 -- */
    /* Redux
    https://wonit.tistory.com/344
    
    createStore는 함수로 데이터를 넣어주는 저장소의 역할
    dispatch : action을 발생시켜 state를 변하게 만드는 장본인
    subscribe : state 값이 변하는지 감시하는 cctv 격
    getState : state를 얻을 수 있게 하는 getter 함수

    Redux는 본래 동기(Synchronous)적으로 작업이 처리 된다.
    action ➡️ dispatch(action) ➡️ reducer ➡️ store
    데이터의 흐름이 항상 단방향이기 때문에 쉽게 제어할 수 있다

    리덕스
    https://velopert.com/3528
    https://velopert.com/3533
    https://ko.redux.js.org/introduction/getting-started/

    Provider 는 react-redux 라이브러리에 내장되어있는, 리액트 앱에 store 를 손쉽게 연동 할 수 있도록 도와주는 컴포넌트
    */
    try {
      const response = await api.post("/user", {email, name, password});

      //성공
      //---> 성공 메시지 보여주기
      //액션을 호출한다. 
      dispatch(showToastMessage({message : "회원가입을 성공했습니다.", status : "success"}));

      //---> 로그인 페이지로 이동
      navigate('/login');

      //성공한 상황에 대한 값을 저장을 통해 리덕스에서 값을 사용을 위해
      return response.data.data;
    } catch (error) {
      //실패
      //---> 실패 메시지 보여주기
      dispatch(showToastMessage({message : "회원가입을 실패했습니다.", status : "error"}));
      
      //---> 에러값 저장
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {
    try {
      //headers > authorization로 보내기때문에 req로 보낼 필요가 없다.
      const response = await api.get("/user/me");

      return response.data;
    } catch (error) {
      //---> 에러값 저장
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  reducers: {//직접적으로 아이템을 호출
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {//외부의 함수를 통해서 아이템을 호출
    /* -- 리덕스에서 나온 결과물을 저장 -- */
    builder 
           .addCase(registerUser.pending, (state) => {
            //userSlice > initialState값을 변경한다.
            state.loading = true;
            })//대기
            .addCase(registerUser.fulfilled, (state) => {
              state.loading = false;//로딩바 끄기
              state.registrationError =null;//에러 초기화
            })//성공
            .addCase(registerUser.rejected, (state, action) => {
              state.loading = false;
              state.registrationError = action.payload;//에러 셋팅
            })//실패

            .addCase(loginWithEmail.pending, (state) => {
              state.loading = true;
            })
            .addCase(loginWithEmail.fulfilled, (state, action) => {
              state.loading = false; 
              state.loginError = null;

              state.user = action.payload.user;//유저 값을 저장한다.
            })
            .addCase(loginWithEmail.rejected, (state, action) => {
              state.loading = false;

              state.loginError = action.payload;
            })
           
            .addCase(loginWithToken.fulfilled, (state, action) => {
              state.user = action.payload.user;
            })

            .addCase(loginWithGoogle.pending, (state) => {
              state.loading = true;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
              state.loading = false; 
              state.loginError = null;

              state.user = action.payload;//유저 값을 저장한다.
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
              state.loading = false;

              state.loginError = action.payload;
            })
  },
});
export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
