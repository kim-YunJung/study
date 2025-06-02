import React from "react";
import { Link, useParams } from 'react-router-dom';

function View(props) {
  /** 
  useParams : 컴포넌트를 라우터 처리할때 중첩된 구조내에서 :no 와 같이 
    사용된 파라미터의 값을 얻어올 수 있는 Hook 
  */
  var params = useParams();
  console.log("파라미터", params.no);

  //reduce() 함수는 배열의 크기만큼 반복하여 조건에 맞는 하나의 값을 반환한다.
  let vi = props.boardData.reduce((prev, curr)=>{
    /**  
    조회할 게시물의 일련번호와 일치하는 객체를 찾아 prev에 저장한 후 반환한다. 
    즉 초기값으로 주어진 빈 객체는 조회할 게시물이 저장된다. 
    */
    if(curr.no===Number(params.no)){
      prev = curr;
    }
    return prev;
  }, {});
  
  let readNum = Number(params.no);
  let prevNum = 0, nextNum = 0;
    
  if(readNum-1===0){
    //1페이지로 고정
    prevNum = 1;  
  }
  else{
    prevNum = Number(params.no) - 1;
  }

  nextNum = readNum + 1;
  let isNextNum = props.boardData.reduce((prev, curr) => {
    if(curr.no===nextNum){
      prev = true;
    }
    return prev;
  }, false);
  if(isNextNum===false){
    //현재페이지로 고정
    nextNum = readNum;    
  }

  const goPrev = () => {
    if(readNum-1===0){
      //1페이지로 고정
      prevNum = 1;  
      alert('이전 페이지가 없습니다');
    }
    else{
      prevNum = Number(params.no) - 1;
    }
    console.log('prevNum', prevNum);
    props.navigate("/view/"+prevNum);
  }

  const goNext = () => {
    nextNum = readNum + 1;
    let isNextNum = props.boardData.reduce((prev, curr) => {
      if(curr.no===nextNum){
        prev = true;
      }
      return prev;
    }, false);
    if(isNextNum===false){
      //현재페이지로 고정
      nextNum = readNum;
      alert('다음 페이지가 없습니다');
    }
    console.log('nextNum', nextNum);
    props.navigate("/view/"+nextNum);
  }

  return (<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp; 
      <Link to="/edit">수정</Link>&nbsp; 
      <Link to="/delete">삭제</Link>
    </nav>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%" /><col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{vi.writer}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{vi.title}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{vi.date}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{vi.contents}</td>
          </tr>
        </tbody>
      </table> 
      <Link to={"/view/"+prevNum}>이전글1</Link>
      <Link to={"/view/"+nextNum}>다음글1</Link>      
      
      <a href="/" onClick={(e) => {
          e.preventDefault();
          goPrev();
      }}>이전글2</a>
      <a href="/" onClick={(e) => {
          e.preventDefault();
          goNext();
      }}>다음글2</a>
    </article>
  </>);
}

export default View;
