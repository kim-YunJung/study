import './App.css';
import { useState, useMemo } from 'react';

/*
함수형 컴포넌트의 특징
-컴포넌트가 렌더링될때 정의된 함수가 호출된다. 
-이때 함수 내부의 모든 변수가 초기화된다. 
-즉 렌더링될때마다 컴포넌트 내부의 모든 코드가 실행되는 구조를 가진다.

메모이제이션(Memoization)
: 자주 필요한 값을 캐시에 저장해서 필요할때마다 꺼내쓰는 기법.
이를 위해 React에서는 useMemo, useCallback 훅을 제공한다. 
 */

//호출시 시간이 매우 많이 걸리는 로직을 수행하는 함수 
const longTimeCalculate = (number) => {
  console.log('시간이 많이 걸리는 계산');
  for(let i=0 ; i<1234567890 ; i++){}
  return number + 10000;
}

//간단한 계산 함수 
const simpleCalculate = (number) => {
  console.log('금방 끝나는 계산');
  return number + 1;
}

function App() {
  //State 생성
  const [longTimeNum, setLongTimeNum] = useState(1);
  const [simpleNumber, setSimpleNumber] = useState(1);

  //Step1 : App컴포넌트(함수)가 호출되면 아래 2개의 함수를 무조건 호출한다.
  // const longTimeSum = longTimeCalculate(longTimeNum);    
  // const simpleSum = simpleCalculate(simpleNumber);
  /** Step1에서는 State가 변경될때마다 재 렌더링되어 Long과 Short가 한번씩
  호출된다. 따라서 Short만 변경하더라도 실행시간이 오래 걸리게된다. 
   */

  //Step2
  /* 시간이 많이 걸리는 함수를 호출 후 반환되는 값을 useMemo를 통해 
  캐시에 저장한다. 이 값은 longTimeNum이 변경될때만 다시 함수를 호출하므로
  Short을 눌렀을때는 호출되지 않는다. 즉 불필요한 렌더링을 줄일 수 있다. */
  const longTimeSum = useMemo(()=>{
    return longTimeCalculate(longTimeNum);
  }, [longTimeNum]);
  const simpleSum = simpleCalculate(simpleNumber);

  return (
    // <input>의 스핀박스를 누를때마다 각 함수를 호출한다. 그리고 입력값을
    //통해 State를 변경한다. 
    <div className="App">
      <h2>Long Time 계산기</h2>
      <input type="number" value={longTimeNum}
        onChange={(e)=>setLongTimeNum(parseInt(e.target.value))} 
      />
      <span> + 10000 = {longTimeSum}</span>
      
      <h2>Short Time 계산기</h2>    
      <input type="number" value={simpleNumber}
        onChange={(e)=>setSimpleNumber(parseInt(e.target.value))} 
      />
      <span> + 1 = {simpleSum}</span>
    </div>
  );
}

export default App;


