import './App.css';
/** 현재 문서에서 useState 리엑트훅을 사용하겠다는 의미. 외부의 
기능을 현재 문서에 포함시킨다. */
import { useState } from 'react';

//Top컴포넌트 정의 
function Top(props){
  return (
    <h2><a href='/' onClick={(event)=>{
      //이벤트 객체를 통해 화면의 새로고침 차단
      event.preventDefault();
      /** props로 전달된 함수를 호출한다. 이때 인수로 'both'를 
      전달하면 state가 해당값으로 변경된다. 
       */
      props.myModeChange('both');
    }}>React - State 변경하기</a></h2>
  );
}

function MyCont1(props){
  return (
    <>
    <li><a href='/' onClick={(event)=>{
      event.preventDefault();
      props.myModeChange('front');
    }}>프론트앤드</a></li>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Javascript</li>
        <li>jQuery</li>
      </ul>
    </>
  );
}

function MyCont2(props){
  return (
    <>
      <li><a href='/' onClick={(event)=>{
        event.preventDefault();
        props.myModeChange('back');
      }}>백앤드</a></li>
        <ul>
          <li>Java</li>
          <li>Oracle</li>
          <li>JSP</li>
          <li>Spring Boot</li>
        </ul>
    </>
  );
}

/** 
React Hook(훅) 
: React 16.8부터 새로 추가된 기능으로 함수형 컴포넌트에서 state와
수명주기(Life Cycle)을 연동할 수 있게 해주는 특수한 함수를 말한다.
훅은 import를 먼저 진행할 후 useXXX()와 같은 패턴의 함수를 아래와
같이 사용하면된다. 

useState() : 리엑트에서 상태값을 가지는 state의 값을 변경하거나
  초기값을 부여할때 사용한다. 이 함수의 반환값은 배열인데
  0번 요소는 state의 값을 저장하는 변수로 사용하고
  1번 요소는 이 값을 변경하는 함수로 사용한다. 
  const myState = useState('99');
  const getTs = myState[0]; => 초기값인 99를 변수에 할당한다. 
  const setTs = myState[1]; => 값을 변경할수 있는 함수로 지정된다.
  ==>
    위 문법을 '구조분해할당'을 통해 축약하면 다음과 같다. 
    const [getTs, setTs] = useState('99');
*/
function App() {

  /** UI의 전환을 위한 state를 생성한다. state 변수명은 mode이고
  초기값은 'both'로 설정한다. 이를 변경하기 위한 함수는 setMode()로 
  지정한다. 
   */
  const [mode, setMode] = useState('both');
  /** state의 값은 임의로 변경할 수 있으나 그럴경우 화면이 재 랜더링 
  되지않는다. 따라서 화면의 전환을 위해서는 반드시 변환함수를 통해서
  값을 변경해야 한다. 
   */

  //컴포넌트를 저장하기 위한 변수 선언 
  let contents = '';
  if(mode==='front'){
    //mode의 값이 front이면 MyCont1 컴포넌트만 렌더링한다.
    contents = <>
      <MyCont1 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont1>
    </>
  }
  else if(mode==='back'){
    contents = <>
      <MyCont2 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont2>
    </>
  }
  else{
    contents = <>
      <MyCont1 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont1>
      <MyCont2 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont2>
    </>
  }

  return (
    <div className="App">
      {/* 부모컴포넌트인 App에서 자식컴포넌트인 Top으로 props를 통해
      함수를 전달한다. 매개변수 mode를 통해 데이터를 받은 후 state를
      변경할수 있는 함수를 호출하는 기능을 가지고 있다.  */}
      <Top myModeChange={(mode)=>{
          setMode(mode);
      }}></Top>
      <ol>
        {/* 위에서 if문을 통해 mode가 어떤값인지에 따라 설정된 
        컴포넌트를 이 위치에 렌더링한다. */}
        {contents}
      </ol>
    </div>
  );
}

export default App;
