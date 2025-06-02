import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const down = () => {
    setCount(count - 1);
  }
  const up = () => {
    setCount(count + 1);
  }
  const reset = () => {
    setCount(0);
  }

  return (
    <div className="App">
      <h2>useReducer 훅 사용하기</h2>
      <div>
        <input type="button" value="-" onClick={down} />
        <input type="button" value="0" onClick={reset} />
        <input type="button" value="+" onClick={up} />
        <span>{count}</span>
      </div> 
    </div>
  );
}

export default App;

