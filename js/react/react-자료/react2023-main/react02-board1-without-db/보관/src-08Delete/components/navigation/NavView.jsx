import React from "react";

function NavView(props){    
  return (
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>{" "}
      <a href="/" onClick={function(event){
        event.preventDefault();
        /** HTML에서는 confirm함수 앞에 window객체를 생략하지만 JSX에서는
        반드시 추가해야한다. */
        if(window.confirm('삭제할까요?')){
          props.onChangeMode('delete');
        }
      }}>삭제</a>
    </nav>
  )
}

export default NavView;  