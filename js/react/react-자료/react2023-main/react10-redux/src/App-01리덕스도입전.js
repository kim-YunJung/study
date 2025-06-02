import './App.css';
import {useState} from 'react';

/** 부모컴포넌트 App에서 내려받은 props의 함수를 다시 자식 컴포넌트로 전달한다. 즉 함수의 기능을 그대로 내려주는 것이다. */
const Right1 = (props) => {
  return (
    <div>
      <h2>Right1</h2>
      <Right2 onMyPlus2={()=>{
        props.onMyPlus1();
      }}></Right2>
    </div>
  );
}
const Right2 = (props) => {
  return (
    <div>
      <h2>Right2</h2>
      <Right3 onMyPlus3={()=>{
        props.onMyPlus2();
      }}></Right3>
    </div>
  );
}
const Right3 = (props) => {
  return (
    <div>
      <h2>Right3</h2>
      {/* Right의 최하위 컴포넌트에서는 click이벤트를 통해 
      부모쪽에서 전달된 함수를 호출한다. 그러면 Right3->Right2..
      ->App과 같이 순서대로 호출된다. 
      즉, +버튼을 누르면 state인 number가 1 증가되면서 새롭게 
      렌더링이 된다. */}
      <input type='button' value='+' onClick={()=>{
        props.onMyPlus3();
      }}></input>
    </div>
  );
}

/** App 컴포넌트로부터 전달받은 props를 자식컴포넌트로 재전달한다. 
실제 애플리케이션은 이와같이 중첩된 구조의 UI를 가지게 되므로 여러 
Depth의 컴포넌트 구조를 가지게된다.  */
const Left1 = (props) => {  
  return (
    <div>
      <h2>Left1 : {props.number1}</h2>
      <Left2 number2={props.number1}></Left2>
    </div>
  );
}
const Left2 = (props) => {
  return (
    <div>
      <h2>Left2 : {props.number2}</h2>
      <Left3 number3={props.number2}></Left3>
    </div>
  );
}
//Left의 최하위 컴포넌트에서는 props로 전달받은 값을 출력한다.
const Left3 = (props) => {
  return (
    <div>
      <h2>Left3 : {props.number3}</h2>
    </div>
  );
}

function App() {
  //최상위 App컴포넌트에서 state를 생성
  const [number, setNumber] = useState(1);
  return (
    <div className="root">
      {/* state 값을 출력  */}
      <h2>React - Redux : {number}</h2>
      <div id='grid'>
        {/* Left컴포넌트 하위로는 number를 props로 전달 */}
        <Left1 number1={number}></Left1>
        {/* Right컴포넌트 하위로는 state를 변경하는 함수를 전달. number에 1을 더하는 기능 정의. */}
        <Right1 onMyPlus1={()=>{
          setNumber(number + 1);
        }}></Right1>
      </div>
    </div>
  );
}
 
export default App;


