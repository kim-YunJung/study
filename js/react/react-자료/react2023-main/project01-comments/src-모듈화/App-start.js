import './App.css';

function ReadSkin(props){
  return (
  <>
    <h2>읽기(Read) - 댓글작성</h2>
    <form name="writeFrm">
    <input type="hidden" name="num" value="1" />
    <table id="boardTable">
        <tr>
            <th>번호</th>
            <td>100</td>
            <th>작성자</th>
            <td>낙짜쌤</td>
        </tr>
        <tr>
            <th>작성일</th>
            <td>2020.02.22</td>
            <th>조회수</th>
            <td>99</td>
        </tr>
        <tr>
            <th>제목</th>
            <td colspan="3" className="subject">오늘은 리엑트로 정했다.</td>
        </tr>
        <tr> 
            <th>내용</th>
            <td colspan="3" className="subject">
                읽기 부분은 구현하지 않습니다. <br/>
                아래 댓글 부분을 구현하면 됩니다. 
            </td>            
        </tr>
        <tr>
            <td colspan="4" align="center">
                <button type="button" onclick="">수정하기</button>							
                <button type="button" onclick="">삭제하기</button>
                <button type="button" onclick="">리스트</button>
            </td>
        </tr>
    </table>	
    </form>
  </>
  );
}

function Comments(props){
  return (
  <>
    <table id="boardTable">
        <tr>
            <td>10</td>
            <td>Writer:국자샘</td>
            <td>
                Date:2023-01-01 09:30
                <button type="button" onclick="">수정</button>							
                <button type="button" onclick="">삭제</button>
            </td>
        </tr>
        <tr>
            <td colspan="3" className="subject">블라블라 블라블라..</td>
        </tr>
    </table>
    <form>
        <table>
            <tr>
                <td>Writer : <input type="text" size="40" /></td>
                <td rowspan="2"><input type="submit" value="댓글작성" id="btn" /></td>
            </tr>
            <tr>
                <td><textarea name="" cols="51" rows="5"></textarea></td>
            </tr>
        </table>        
    </form>
  </>
  );
}

function App() {
  return (
    <div classNameName="App">
      <ReadSkin></ReadSkin>
      <Comments></Comments>
    </div>
  );
}

export default App;
