//컴포넌트 모듈화를 위해 제일 먼저 필요한 React 임포트 선언 
import React from "react";

//함수형 컴포넌트 생성 
function ListComponent(props){
  /**
  컴포넌트에서 실제 표현해야하는 UI를 return문 내부에 기술한다. 
  기존 클래스형 컴포넌트에서는 render() 함수가 있었는데, 함수형에서는 return이 그 역할을 대신한다. 
   */
  return (
    /** JSX를 표현할때 최상위 엘리먼트는 반드시 하나여야 한다. 여기서는 3개의 엘리먼트가 있으므로 빈 꺽쇄괄호(<></>)를 사용한다.  */
    <>
    <header>
        <h2>게시판-목록</h2>
    </header>
    <nav>
      <a href="/" onClick={(event) => {
          event.preventDefault();
          props.changeMode('write');
      }}>글쓰기</a>
    </nav>
    <article>
      <table id="boardTable">
          <thead>
            <tr>
                <th>No</th>
                <th>Title</th>
                <th>Writer</th>
                <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>
                  {/* 부모에서 전달된 props를 아래와 같이 호출해서 mode를
                  view로 변경한다. */}
                  <a href="/" onClick={(event) => {
                        event.preventDefault();
                        props.changeMode('view');
                  }}>오늘은 React공부하는날</a>
                </td>
                <td>낙짜쌤</td>
                <td>2023-01-01</td>
            </tr>
          </tbody>
        </table>
    </article>
    </>
  );
}

/** 외부 파일에서 해당 컴포넌트를 import 하려면 export default로 먼저 내보내기 해야한다. */
export default ListComponent;