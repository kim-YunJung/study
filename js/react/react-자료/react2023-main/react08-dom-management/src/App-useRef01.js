import './App.css';
import { useState, useRef } from 'react';

/* 
useRef
  : 컴포넌트의 생명주기 안에서 값을 유지한다. 즉 새롭게 렌더링 되더라도
  값이 변하지 않고 유지한다. 
  state와 동일하게 값을 마음대로 변경할 수 있지만, 값이 변경될때 렌더링은
  되지 않는다. 즉 변경시 렌더링을 하지 않아야 할 상황에 유용하다. 
  또한 Javascript의 getElementById()와 유사하게 DOM요소에 접근할 수 
  있다. 
*/
 
function App() {
  console.log("렌더링됨..!!");

  //State생성
  const [count, setCount] = useState(0);
  //useRef를 통해 변수 생성 
  const countRef = useRef(0);
  /*
  useRef를 통해 생성한 값은 current라는 Key를 가진 객체가 반환된다.
  */
  console.log('countRef', countRef); 

  //State인 count를 1증가시키는 함수 
  const increaseCountState = () => {
    setCount(count + 1);
  }

  //Ref로 선언된 값을 1증가시키는 함수 
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log('Ref', countRef.current);
  }

  return (
    <div className="App">
      <p>State : {count}</p>      
      <p>Ref : {countRef.current}</p>
      {/* 버튼을 누를때마다 State가 변경되므로 화면이 새롭게 렌더링된다.
       */}
      <button onClick={increaseCountState}>State증가</button>
      {/* 버튼을 누르면 Ref의 값이 변경되긴 하지만 화면은 렌더링되지
      않는다. */}
      <button onClick={increaseCountRef}>Ref증가</button>
    </div>
  );
}

export default App;
