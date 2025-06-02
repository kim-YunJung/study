import './App.css';
import { useReducer, useState } from 'react';

/**
useReducer
  -useState와 유사하게 상태를 관리한다. 
  -여러개의 하위값을 가진 State를 관리할때 유용하다.
  -컴포넌트에서 상태를 업데이트하는 로직을 분리할 수 있다. 
  형식]
    Dispatch(Action) ==> Reducer(State, Action)
    즉 디스패치를 통해 리듀서 함수를 호출하고, 파라미터로 전달된
    Action에 따라 State를 업데이트한다. 
 */

//Reducer함수 : State를 업데이트하는 역할을 한다.     
const countReducer = (prevCount, action) => {
  //매개변수로 전달된 Action을 통해 State를 변경한다. 
  if(action.mode === 'up'){
    return prevCount + action.number;
  }
  else if(action.mode === 'down'){
    return prevCount - action.number;
  }
  else if(action.mode === 'reset'){
    return 0;
  }
  //여기서 반환되는 값으로 State가 업데이트된다. 
}

function App() {
  /**
  const [State변수명, 디스패치] = useReducer(Reducer함수, 변수의초기값);
   */
  const [count, countDispatch] = useReducer(countReducer, 0);
  //number의 초기값은 1로 설정  
  const [number, setNumber] = useState(1);

  //<input>의 값을 변경
  const changeNumber = (event) => {
    setNumber(Number(event.target.value));
  }
  //각 버튼을 누르면 디스패치를 통해 리듀서 함수를 호출 
  const down = () => {
    //호출시 Action을 객체형태로 전달한다. 
    countDispatch({ mode:'down', number:number });
  }
  const up = () => {
    countDispatch({ mode:'up', number:number });
  }
  const reset = () => {
    countDispatch({ mode:'reset', number:number });
  }

  return (
    <div className="App">
      <h2>useReducer 훅 사용하기</h2>
      <div>
        <input type="button" value="-" onClick={down} />
        <input type="button" value="0" onClick={reset} />
        <input type="button" value="+" onClick={up} />
        <input type="number" value={number} onChange={changeNumber} />
        <span>{count}</span>
      </div> 
    </div>
  );
}

export default App;
