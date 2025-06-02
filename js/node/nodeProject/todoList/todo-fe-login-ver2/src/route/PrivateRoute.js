import React from 'react'
import { Navigate } from "react-router-dom";

//rafce 단축키 기본틀 생성
const PrivateRoute = ({user, children}) => {
    /*
    user 있으면 ? Todopage : redirect to /login

    user? <TodoPage /> : <Navigator to='/login' />
    todopaage로 고정을 할경우 각 상황에 따라 PrivateRoute를 추가로 생성 해야하나,
    children으로 설정할 경우 PrivateRoute 아래의 태그를 상황에 따라 불러올 수 있다.
    */

  return (
      user? children : <Navigate to='/login' />  
  )
}

export default PrivateRoute