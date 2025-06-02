import React from "react";

function WriteComponent(){
  return (<>
    <header>
        <h2>게시판-작성</h2>
    </header>
    <nav>
        <a href="/">목록</a>
    </nav>
    <article>
    <form>
      <table border='1'>
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
            <td><textarea name="contents" rows='3'></textarea></td>
          </tr>
        </tbody>
      </table>
      {/* JSX는 HTML과 비슷한 유사HTML 문법을 사용하므로 태그는 반드시 쌍(Pair)을
      이뤄야한다. 따라서 <input> 태그도 아래와같이 작성하는것이 좋다.  */}
      <input type="submit" value="전송"></input>
    </form>    
    </article>
  </>);
}

export default WriteComponent;