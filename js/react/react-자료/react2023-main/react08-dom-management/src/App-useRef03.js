import './App.css';
import { useState, useRef, useEffect } from 'react';
 
function App() {
  const [count, setCount] = useState(1);
  
  /*
  Step1 : 렌더링의 횟수를 알고싶어 이와같이 State로 처리하면 첫번째 렌더링 후
    useEffect가 실행되고, 내부에서 다시 State가 변경되니 렌더링이 지속적으로 
    되는 상태가 된다. 즉 무한루프에 빠지게된다. 
  */
  // const [renderCount, setRenderCount] = useState(1);
  // useEffect(()=>{
  //   console.log("렌더링01");
  //   setRenderCount(renderCount+1);
  // });

  /*
  Step2 : 만약 이 상황에 일반변수를 사용하면 렌더링될때마다 0으로 초기화되므로 
    횟수를 알수없게 될것이다. 따라서 변화는 감지해야 되지만 렌더링은 안되야하는
    상황에 useRef는 유용하게 사용된다. 
  */
  const renderCount = useRef(1);
  useEffect(()=>{
    console.log("렌더링02", renderCount.current);
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div className="App">
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}>Count증가</button>
    </div>
  );
}

export default App;
