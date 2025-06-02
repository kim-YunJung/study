import React from "react";

function ComList(props){
  return (<>
    <table id="boardTable">
      <tr>
        <td>10</td>
        <td>Writer:낙짜샘</td>
        <td>
          Date:2023-01-01 09:30
          <button type="button" onclick="">수정</button>							
          <button type="button" onclick="">삭제</button>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="subject">블라블라 블라블라..</td>
      </tr>
    </table>
  </>);
}

export default ComList;  
