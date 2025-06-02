import React from "react";
import { Link } from 'react-router-dom';

function List(props) {
  /** Props를 통해 전달된 객체형 배열을 map() 함수를 통해 크기만큼 
  반복한다. map에 사용된 배열과 동일한 크기의 배열을 반환해 주므로
  lists에는 반복되는 <tr>태그가 저장된다. 
   */
  const lists = props.boardData.map((row, idx)=>{
    return (
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><Link to={"/view/"+row.no}>{row.title}</Link></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>  
    );
  });
  
  return (<>
    <header>
      <h2>게시판-목록</h2>
    </header>
    <nav>
      <Link to="/write">글쓰기</Link>
    </nav>
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>
  </>);
}

export default List;
