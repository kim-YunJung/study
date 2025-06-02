import './App.css';
import {Routes, Route, Link, NavLink} from 'react-router-dom';
import {Outlet, useLocation, useSearchParams} from "react-router-dom";

/**
NavLink 컴포넌트는 <a>태그와 같이 하이퍼링크를 걸때 사용한다. 
단 <a>태그에 preventDefault()가 적용된 형태로 화면의 깜빡임 없이 
페이지에 대한 이동을 할 수 있다. 
링크를 클릭했을때 active라는 클래스 속성을 자동으로 추가해준다. 
 */
const TopNavi = ()=>{
  return (
    <nav>
      <NavLink to="/">HOME</NavLink>&nbsp;
      <NavLink to="/intro">인트로</NavLink>&nbsp;
      <NavLink to="/intro/router">Router관련Hook</NavLink>&nbsp;
      <NavLink to="/xyz">잘못된URL</NavLink>&nbsp;
    </nav>
  );
}

/**
Outlet컴포넌트
: 웹사이트 제작시 공통으로 사용되는 레이아웃에서 특정 요청에 따른 페이지만 
변경해야 할때 사용한다. 
 */
const CommonLayout = () => {
  return (
    <div>
      <header style={{ background:'lightgray', padding:'10px' }}>
        Outlet 컴포넌트 알아보기
      </header>
      <article>
          {/* 각 페이지의 컴포넌트가 보여지는 부분에 설정한다. */}
          <Outlet />
      </article>
      <footer style={{ background:'lightgray', padding:'10px' }}>
        공통 레이아웃 
      </footer>
    </div>
  );
};

const Home = () => {
  return (<>
    <h2>React Home</h2>
    <p>
      React Router에 대해 학습합니다.
    </p>
  </>);
}

/** 
/intro 경로가 요청될때 Outlet 위치에 렌더링 되는 컴포넌트 
*/
const LayoutIndex = () => {
  return (<>
    <h2>레이아웃 인덱스 페이지</h2>
    <ul>
      <li>Outlet 컴포넌트 위치에 출력됩니다.</li>
      <li>Route 설정시 index로 지정합니다.</li>
    </ul>
  </>);
}

/** 
/intro/router 경로가 요청되었을때 Outlet에 렌더링 되는 컴포넌트 
*/
const RouterHooks = ()=>{
  /**  
  useLocation 
    : React Router를 통해 라우팅된 페이지에서 현재 URL과 관련된
    정보를 얻는데 사용된다. URL경로, 쿼리스트링 등의 관련 정보를 제공한다.
  useSearchParams 
    : 현재 URL의 쿼리스트링을 얻어오거나 조작할때 사용된다. 
   */
  const location = useLocation();  
  //쿼리스트링에 대한 정보를 얻어오기 위한 변수와 변경을 위한 함수를 선언 
  const [searchParams, setSearchParams] = useSearchParams();
  //쿼리스트링에서 파라미터를 얻어온다. 첫 진입시에는 둘다 null이 된다.
  const mode = searchParams.get('mode');
  const pageNum = searchParams.get('pageNum');

  //파라미터 mode의 값을 토글 시킨다. 
  const changeMode = () => {
    const nextMode = (mode==='list') ? 'view' : 'list';
    /** 파라미터 중 mode는 값을 토글해서 설정한다. pageNum의 경우 값이 지정되지
    않았으므로 기존의 값을 그대로 유지한다. */
    setSearchParams({ 
      mode : nextMode, 
      pageNum 
    });
  }

  //다음페이지로 이동하기 위한 파라미터 조작 
  const nextPage = () => {
    //페이지번호가 없다면 1페이지로 지정하고, 아니면 +1 증가시킨다. 
    let pageTemp = (pageNum===null || isNaN(pageNum)) ? 1 : parseInt(pageNum) + 1;
    //최대 10페이지로 지정한다. 
    if(pageTemp===11) {
      pageTemp = 10;
      window.alert('마지막 페이지 입니다.');
    }
    //mode는 고정된 상태에서 pageNum만 변경한다. 
    setSearchParams({
      mode, 
      pageNum : pageTemp
    });
  }
  const prevPage = () => {
    let pageTemp = (pageNum===null || isNaN(pageNum)) ? 1 : parseInt(pageNum) - 1;
    if(pageTemp===0) {
      pageTemp = 1;
      window.alert('첫번째 페이지 입니다.');
    }
    setSearchParams({
      mode, 
      pageNum : pageTemp
    });
  }
  
  return (<>
    <h2>라우터 관련 Hook</h2>
    <div>
      <ul>
        {/* useLocation 훅을 통해 얻어온 정보 출력 */}
        <li>URL : {location.pathname}</li>
        <li>쿼리스트링 : {location.search}</li>
        <li>mode : {mode}</li>
        <li>pageNum : {pageNum}</li>
      </ul>

      {/* 함수명을 통해 이벤트 처리를 한다. */}
      <button onClick={changeMode}>mode변경</button>
      <button onClick={prevPage}>이전Page</button>
      <button onClick={nextPage}>다음Page</button>
    </div>
  </>);
}

/** Link 컴포넌트도 NavLink와 동일하게 하이퍼링크를 설정한다. 단 class를 
추가하는 기능은 없다. */
const NotFound = ()=>{
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. ㅜㅜ <br/>
        <Link to='/'>Home</Link>
      </p>
    </div>
  ); 
}

function App() {  
  return (
    <div className="App">
      {/* 라우터 처리가 필요없는 컴포넌트는 전체페이지에서 공통으로 출력되는
      용도로 주로 사용된다. */}
      <TopNavi></TopNavi>
      {/* 라우터 처리가 필요한 컴포넌트는 아래와 같이 path, element Props를
      통해 경로와 렌더링할 컴포넌트를 지정한다.  */}
      <Routes>
        <Route path='/' element={<Home></Home>} />
        {/* 하위 경로가 필요한 경우에는 '중첩라우터'를 사용한다. */}
        <Route path='/intro' element={<CommonLayout />}>
          <Route index element={<LayoutIndex />} />          
          <Route path="router" element={<RouterHooks />} />
        </Route>
        {/* 지정되지 않은 모든 경로에 대해서는 404처리를 한다. */}
        <Route path='*' element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;