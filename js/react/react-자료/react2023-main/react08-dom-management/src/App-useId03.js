import { useEffect, useId, useRef, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <MyInput1 />
    </div>
  );
}

function MyInput1(){
  /*
  만약 Math.random()으로 아이디를 생성한다면 렌더링될때마다 새로운 값을
  생성하게된다. 이 경우 스크린리더가 웹페이지를 읽을때마다 엘리먼트의 아이디가
  바뀌게되므로 같은 내용을 반복적으로 읽는 경우가 발생하게된다. 
  useId() 훅을 사용하면 렌더링 되더라도 아이디가 변경되지 않아 안정성이 높아진다.

  하이드레이션 : 상호작용이 가능한 웹페이지로 렌더링한다??
  */
  const myId = useId();
  const myRef = useRef();

  useEffect(() => {
    const button1 = document.getElementById('btn');
    const button2 = myRef.current;
    console.log('버튼1', button1);
    console.log('버튼2', button2);
  }, []);

  function btn1Clicked(){
    const button1 = document.getElementById('btn');
    if(button1.style.backgroundColor==='black'){
      button1.style.backgroundColor = 'white';
      button1.style.color = 'black';
    }
    else{
      button1.style.backgroundColor = 'black';
      button1.style.color = 'white';
    }
  }

  const [btnStyle, setBtnStyle] = useState({
    'background-color':'yellow',
    'color':'red',
  });
  const btn2Clicked = () => {
    if(btnStyle.color==='red'){
      setBtnStyle({
        'background-color':'blue',
        'color':'white',
      });
    }
    else{
      setBtnStyle({
        'background-color':'yellow',
        'color':'red',
      });
    }
  }

  return (
    <div>
      <button id='btn' onClick={btn1Clicked}>버튼1</button>
      <button id={myId} ref={myRef} onClick={btn2Clicked} style={btnStyle}>버튼2</button>
    </div>
  );
} 

export default App;
