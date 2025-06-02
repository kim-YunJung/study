import axios from "axios";

/*
LocalStorage
저장한 데이터를 명시적으로 지우지 않는 이상 영구적으로 보관이 가능하다. 앞서 말한대로 도메인마다 별도로 로컬 스토로지가 생성된다. Windows 전역 객체의 LocalStorage라는 컬렉션을 통해 저장과 조회가 이루어진다.

SessionStorage
SessionStorage는 데이터의 지속성과 액세스 범위에 특수한 제한이 존재한다. SessionStorage는 windows 전역 객체의 sessionStorage라는 컬렉션을 통해 저장과 조회가 이루어진다.
*/

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_PROXY}/api`,
  //baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + sessionStorage.getItem('token'),
    //authorization: "Bearer " + localStorage.getItem("token"),
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
