import './App.css';
//글쓰기에서 기본 라우터 처리를 index.js로 옮긴다. 
//import { BrowserRouter } from 'react-router-dom'
//페이지 이동을 위한 useNavigate 훅 임포트
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

const nowDate = () => {
  //현재날짜
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

function App() {

  //기존의 데이터를 state로 변경 
  const [boardData, setBoardData] = useState([
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01', contents:'React를 뽀개봅시당'},
    {no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03', contents:'Javascript는 할게 너무 많아요'},
    {no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05', contents:'Project는 뭘 만들어볼까?'},
  ]);
  //새로운 게시물의 일련번호로 사용할 State 생성 
  const [nextNo, setNextNo] = useState(4);
  //페이지 이동을 위한 Hook 
  const navigate = useNavigate();

  return (
  // <BrowserRouter>
    <div className="App">
      <Routes>
        {/* 데이터가 필요한 컴포넌트로 Props 전달  */}
        <Route path='/' element={<List boardData={boardData} />} />
        <Route path='/list' element={<List boardData={boardData} />} />
        {/* 상세보기의 경우 조회할 게시물의 일련번호가 필요하므로, 
        중첩된 라우터 구조로 정의한다. :no는 router dom에서 제공하는 
        훅을 통해 값을 얻어올 수 있다. */}
        <Route path='/view'>
          <Route path=':no' element={<View boardData={boardData} navigate={navigate} />} />
        </Route>
        {/* Write 컴포넌트 내에서 글쓰기 처리를 할 수 있도록 App에서
        생성한 모든 State와 관련함수를 Props로 전달한다.  */}
        <Route path='/write' element={<Write 
          boardData={boardData} setBoardData={setBoardData} 
          nextNo={nextNo} setNextNo={setNextNo} 
          navigate={navigate} nowDate={nowDate}
        />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  // </BrowserRouter>
  );
}

export default App;
