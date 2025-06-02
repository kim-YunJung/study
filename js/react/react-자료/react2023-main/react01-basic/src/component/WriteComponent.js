import React from "react";

function WriteComponent(props){
  return (
    <>
    <header>
        <h2>게시판-작성</h2>
    </header>
    <nav>
      <a href="/" onClick={(event) => {
            event.preventDefault();
            props.changeMode('list');
      }}>목록</a>
    </nav>
    <article>
    {/* 현재 <form> 태그에는 submit 관련 이벤트처리가 되어있지
     않으므로 '전송' 버튼을 눌렀을때 폼값이 전송되어 화면이 
     새로고침된다. 이때 목록화면으로 전환된다. 이 부분은 차후 
     CRUD앱에서 처리할 예정이다. */}
    <form>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type='text' name="writer" /></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type='text' name="title"/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" cols='22' rows='3'></textarea></td>
          </tr>
        </tbody>
      </table>
      {/* JSX는 HTML과 비슷한 유사HTML 문법을 사용하므로 태그는 반드시 쌍(Pair)을 이뤄야 한다. 따라서 <input>태그도 아래와같이 작성하는게 좋다. */}
      <input type="submit" value="전송"></input>
    </form>    
    </article>
    </>
  );
}

export default WriteComponent;