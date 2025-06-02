import './App.css';
import { useState, useEffect, useMemo } from 'react';

function App() {
  //State 생성 
  const [number, setNumber] = useState(0);//정수
  const [switching, setSwitching] = useState(true);//boolean

  //일반 상수(Step1) : 초기값은 true이므로 'On'이 할당됨
  // const switchMode = switching ? 'On(켜짐^^)' : 'Off(꺼짐ㅜㅜ)';

  //상수를 객체로 변경(Step2)
  /* Javascript에서 객체는 선언할때마다 새로운 참조값을 할당받게된다.
  즉 새로운 렌더링을 위해 App컴포넌트가 호출될때마다 참조값이 변경된다. 
  따라서 useEffect()가 지속적으로 호출된다. */
  // const switchMode = {
  //   nowState : switching ? 'On(켜짐^^)' : 'Off(꺼짐ㅜㅜ)'
  // };

  //Step3 : useMemo를 적용하여 switching이 변경될때만 실행되게한다.
  const switchMode = useMemo(()=>{
    return {nowState : switching ? 'On(켜짐^^)' : 'Off(꺼짐ㅜㅜ)'};
  }, [switching])


  //Step1 : switchMode가 변경될때만 호출되도록 설정 
  useEffect(()=>{
    console.log("useEffect() 호출됨");
  }, [switchMode]);

  return (
    <div className="App">
      <h2>정수 카운터</h2>
      {/* 스핀박스를 누르면 정수 State를 변경  */}
      <input type="number" value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <hr />
      <h2>토글 스위치</h2>
      
      {/* <p>스위치상태(Step1) : {switchMode}</p> */}
      <p>스위치상태(Step2) : {switchMode.nowState}</p>

      {/* 버튼을 누르면 boolean State를 변경 */}
      <button onClick={() => setSwitching(!switching)}>
        스위치조작</button>
    </div>
  );
}

export default App;
