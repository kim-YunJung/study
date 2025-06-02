import { useReducer, useState } from 'react';
import './App.css';

//Action에서 사용할 값을 상수로 선언 
const ActionTypes = {
  depo : 'deposit',
  with : 'withdraw'
}

//리듀서 함수 
const myReducer = (nowState, myAction) => {
  console.log("리듀서 함수 호출", nowState, myAction);  
  //Action을 분석해서 입출금 처리 
  //return값을 통해 State 업데이트 
  switch (myAction.mode){
    case ActionTypes.depo:
      return nowState + myAction.amount;
    case ActionTypes.with:
      return nowState - myAction.amount;
    default:
      return nowState;
  }
}

function App() {
  //State선언 
  const [number, setNumber] = useState(0);
  //Reducer선언. money는 0으로 초기화. 디스패치와 리듀서 선언.
  const [money, myDispatch] = useReducer(myReducer, 0);

  return (
    <div className="App">
      <h2>useReducer App</h2>
      <p>잔고 : {money}원</p>
      {/* 스핀박스를 통해 1000씩 증감 */}
      <input type="number" value={number} step={1000} 
        onChange={(e) => {
          setNumber(parseInt(e.target.value));
        }
      } />
      {/* 앞에서 선언한 문자 상수를 통해 Action전달  */}
      <button type='button' onClick={() => {
        myDispatch({mode:ActionTypes.depo, amount:number});        
      }}>입금</button>
      <button type='button' onClick={() => {
        myDispatch({mode:ActionTypes.with, amount:number});        
      }}>출금</button>
    </div>
  );
}

export default App;


