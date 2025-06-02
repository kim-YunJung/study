import React from "react";

function ViewComponent(){
  return (<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      <a href="/">목록</a>&nbsp;&nbsp;
      <a href="/">수정</a>&nbsp;&nbsp;
      <a href="/">삭제</a>
    </nav>
    <article>
      <table border='1'>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 React공부하는날</td>
          </tr>
          <tr>
            <th>작성일</th>
            <td>2023-05-05</td>
          </tr>
        </tbody>
      </table> 
    </article>
  </>);
}

export default ViewComponent;