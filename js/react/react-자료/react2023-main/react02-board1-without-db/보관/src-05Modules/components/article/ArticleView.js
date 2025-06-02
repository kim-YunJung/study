import React from "react";

function ArticleView(props){
	return (
	<article>
    <table id="boardTable">
      <colgroup>
        <col width="20%" /><col width="*" />
      </colgroup>
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
          <th>날짜</th>
          <td>2023-05-05</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>열심히 해봅시당<br/>열공 합시당</td>
        </tr>
      </tbody>
    </table> 
  </article>
	);
}

export default ArticleView;  