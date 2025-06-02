/* eslint-disable */ 
//터미널의 WARNING를 안뜨게 해준다.

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let text = 'text';

  /* 
  자료를 잠깐 보관하고 싶을 경우 state 
  -> 자주 변경될 거 같은 내용에서 적용한다.
  (변동시 자동으로 html에 반영되게 만들고 싶을 때)
  a - state 사용시 / b - state 변경을 도와주는
  */
  let [a, b] = useState('텍스트!');
  let [textBox, textChange] = useState(['텍스트01', '텍스트02', '텍스트03']);
  let [count, clickPlus] = useState(0);

  return (
    <div className="App">
      /* JSX */
      <div className='nav'>
        <h3 style={{color: 'red', fontSize : '16px'}}>{text}</h3>

        <h4>{a}</h4>
        
        /* 기존 state == 신규 state의 경우 변경을 하지 않는다. */
        <button onClick={()=>{
          let copyText = [...textBox];
          copyText[0] = 'text01';

          textChange(copyText);
        }}>글 수정</button>

        <h4>{textBox[0]}</h4>
        <h4>{textBox[1]}</h4>
        <h4>{textBox[2]}</h4>

        <h4><span onClick={ () => clickPlus( count+1 ) }>버튼</span> {count}</h4>
      
        <Modal></Modal>
        <Modal/>
      </div>
    </div>
  );
}

/* 
컴포넌트를 사용시 좋을 때,
  반복적인 html
  큰 페이지
  자주변경되는 것들 

컴포넌트 만들기 - 다른 함수 밖에 선언한다.
첫글자는 대문자로 선언한다.
return() 안에 html을 넣는다. - 하나의 태그로 시작해서 하나의 태그로 끝난다.

<div></div>
<div></div>
두개의 div가 있을 경우 오류가 발생한다.

해경방법 
<div>
  <div></div>
  <div></div>
</div>

또는

<>
  <div></div>
  <div></div>
</>

function Modal(){
  return(
    <div className='modal'>
      <h2>제목</h2>
      <p>내용</p>
    </div>
  )
}
*/
//let Modal = () => {
const Modal = () => {
  return(
    <div className='modal'>
      <h2>제목</h2>
      <p>내용</p>
    </div>
  )
}

export default App;
