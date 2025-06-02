import './App.css';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [countNumber, setCountNumber] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  /* 
  State변경에 의해 컴포넌트가 새롭게 랜더링 되면 해당 함수는 그때마다
  새롭게 할당된다. 즉 참조값이 계속 바뀌게 되므로 useEffect가 그때마다
  실행되게된다. 
  이유는 Javascript에서 함수는 객체이기 때문이다. 
  */
  //Step1 : 
  // const somethingGood = () => {
  //   console.log(`somethingGood호출 : ${countNumber}, ${randomNumber}`);
  //   return;
  // }

  const somethingGood = useCallback(() => {
    console.log(`somethingGood호출 : ${countNumber}, ${randomNumber}`);
    return;
  // }, []); //Step2
  }, [countNumber]); //Step3
  /**
  Step2 : useCallback을 적용하여 렌더링시 단 한번만 함수를 캐시에 저장한다. 
    하지만 의존성배열을 빈값을 주면 딱 한번만 실행되므로 State의 변경을
    감지할 수 없게된다. 최초 실행시의 초기값만 가진 상태이기 때문이다.
  
  Step3 : countNumber가 변경될때만 새롭게 메모이제이션 하므로 변경된 State를
    감지할 수 있다. 단 randomNumber는 값이 다를 수 있다. 
  */ 

  useEffect(() => {
    console.log('somethingGood() or randomGood() 변경됨');
  }, [somethingGood]);

  return (
    <div className="App">
      <h2>useCallback()</h2>
      <input type='number' value={countNumber}
        onChange={(e) => setCountNumber(e.target.value)}
      />
      <button onClick={() => { 
        setRandomNumber(Math.random());
      }}>
        난수 : {randomNumber}
      </button>
      <br />
      <button onClick={somethingGood}>somethingGood호출</button>      
    </div>
  );
}

export default App;
