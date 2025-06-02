import React from "react";
import {useState} from 'react';

function ComEdit(props){
  return (<>
    <form>
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : <input type="text" name="writer" value="홍길동" /></td>
          <td rowspan="2"><input type="submit" value="댓글수정" id="btn"/></td>
        </tr>
        <tr>
          <td><textarea name="comment" value="블라블라"></textarea></td>
        </tr>
      </table>        
    </form>
  </>);
}

export default ComEdit;  
