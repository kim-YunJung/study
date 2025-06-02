import React from "react";

//쓰기 컴포넌트 
function ComWrite(props){
  return (<>
    <form onSubmit={(event)=>{
      event.preventDefault();
      //이벤트 객체를 통해 폼값 가져오기
      let writer = event.target.writer.value;
      let comment = event.target.comment.value;
      /* 입력값 지우기. React는 화면의 새로고침이 없으므로 화면전환이 없는
      경우에는 이와같이 빈값을 지정하여 입력값을 지워야 한다. */
      event.target.writer.value = '';
      event.target.comment.value = '';
      //입력 처리 하기
      props.writeAction(writer, comment);
    }}>
    {/* JSX에서는 아래의 속성들이 소문자로 작성되면 Warning을 출력한다. 
        rowspan => rowSpan
        colspan => colSpan
        onclick => onClick (이처럼 Camel case로 작성해야한다.)
        또한 <table>의 경우 <tbody>가 없는 경우에도 Warning이 뜨게된다. 
    */}
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : <input type="text" name="writer"/></td>
          <td rowspan="2"><input type="submit" value="댓글작성" id="btn"/></td>
        </tr>
        <tr>
          <td><textarea name="comment"></textarea></td>
        </tr>
      </table>   

    </form>
  </>);
}

export default ComWrite;  
