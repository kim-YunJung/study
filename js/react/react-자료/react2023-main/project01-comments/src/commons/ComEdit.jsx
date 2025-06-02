import React from "react";
import {useState} from 'react';

function ComEdit(props){

  const [writer, setWriter] = useState(props.selectData.writer);
  const [comment, setcomment] = useState(props.selectData.comment);

  return (<>
    <form onSubmit={(event)=>{
      event.preventDefault();
      //폼값 가져오기
      let writer = event.target.writer.value;
      let comment = event.target.comment.value;
      //입력값 지우기
      event.target.writer.value = '';
      event.target.comment.value = '';
      //수정 처리 하기
      props.editAction(writer, comment);
    }}>
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : 
            <input type="text" name="writer" value={writer} 
              onChange={(event)=>{
                  setWriter(event.target.value);
              }}
            />
            <input type="button" value="수정취소" onClick={()=>{
              props.changeMode('list', null);
            }}></input>
          </td>
          <td rowspan="2"><input type="submit" value="댓글작성" id="btn"/></td>
        </tr>
        <tr>
          <td>
            <textarea name="comment" value={comment} 
              onChange={(event)=>{
                setcomment(event.target.value);
              }}
            ></textarea></td>
        </tr>
      </table>   
    </form>
  </>);
}

export default ComEdit;  
