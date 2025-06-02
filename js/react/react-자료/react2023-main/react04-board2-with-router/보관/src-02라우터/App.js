import './App.css';
import { BrowserRouter } from 'react-router-dom'
import {Routes, Route, Link} from 'react-router-dom';

function List(props) {
  return (<>
    <header>
      <h2>게시판-목록</h2>
    </header>
    <nav>
      {/* <a href="/write">글쓰기</a> */}
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
          <tr>
            <td class="cen">1</td>
            <td><Link to="/view">오늘은 React공부하는날</Link></td>
            <td class="cen">낙짜쌤</td>
            <td class="cen">2030-05-05</td>
          </tr>
          <tr>
            <td class="cen">2</td>
            <td><Link to="/view">오늘은 Javascript공부하는날</Link></td>
            <td class="cen">홍길동</td>
            <td class="cen">2030-05-05</td>
          </tr>
          <tr>
            <td class="cen">3</td>
            <td><Link to="/view">오늘은 JSP공부하는날</Link></td>
            <td class="cen">전우치</td>
            <td class="cen">2030-05-05</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}
function View(props) {
  return (<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      {/* <a href="/list">목록</a>&nbsp;&nbsp;
      <a href="/edit">수정</a>&nbsp;&nbsp;
      <a href="/delete">삭제</a> */}
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
  </>);
}

function Write(props) {
  return (<>
    <header>
      <h2>게시판-작성</h2>
    </header>
    <nav>
      {/* <a href="/list">목록</a> */}
      <Link to="/list">목록</Link>
    </nav>
    <article>
    <form>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer" /></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title" /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" rows="3"></textarea></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="전송" />
    </form>    
    </article>
  </>);
}

function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. ㅜㅜ <br/>
        <Link to="/list">Home</Link>
      </p>
    </div>
  );
}

/** 라우터 처리를 위한 BrowserRouter 컴포넌트는 App.js에서 최상위 
엘리먼트를 감싸는 형식으로 사용할 수 있다. 
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<List></List>} />
          <Route path='/list' element={<List></List>} />
          <Route path='/view'element={<View></View>} />
          <Route path='/write' element={<Write></Write>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



