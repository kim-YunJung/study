import React from 'react';
import Home from './basic/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Param from './basic/Param';
import Param2 from './basic/Param2';

function App() {
  return (
    <div className="App">
      {/*
      <Basic01 />
      <Basic02 />
      <Basic03 />
      */}
      {/*JSX 주석*/}

      {/*
      BrowserRouter - 동적인 페이지를 제작할 때에는 BrowserRouter가 보편적으로 쓰임
      Route - 요청받은 pathname에 해당하는 컴포넌트를 렌더링
      Link - 링크를 생성
      */}
      <BrowserRouter>
          <Home />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/param/:id' element={<Param />} />
            <Route path='/param' element={<Param2 />} />
          </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
