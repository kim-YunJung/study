import './App.css';

//컴포넌트 임포트
import CompState1 from './commons/CompProps1';
import CompContext1a from './commons/CompConext1a';
import CompContext1b from './commons/CompConext1b';
//컨텍스트 임포트 
import { SimpleContext } from './context/SimpleContext';
import { useState } from 'react';

function App() {
  const [myNumber, setMyNumber] = useState(1);

  return (<>
    <h2>최상위 컴포넌트</h2>
    <input type="number" value={myNumber} onChange={(e) => {
      setMyNumber(e.target.value);
    }} />

    {/* 컴포넌트간 데이터 전달에는 Props가 사용된다. Top-down 방식이므로 각 컴포넌트를 거쳐서 전달해야한다  */}
    <div className="App">
      <h3>Props를 통한 데이터 전달</h3>
      <CompState1 propData={'Props로 전달되는 데이터'} myNumber={myNumber} />
    </div>  

    {/* createContext를 통해 컨텍스트 변수를 생성하면 전역적으로 사용할 수 있다. 변수를 생성한 후 사용할 컴포넌트에서 useContext 훅을 사용해서 값을 얻어올 수 있다. */}
    <div className="App">
      <h3>useContext 적용</h3>
      <CompContext1a />
    </div>  

    {/* Provider로 데이터를 공유할 모든 컴포넌트를 감싸준다. 공유할 데이터는 value 프로퍼티를 사용한다. useContext 훅으로 값을 얻어오는것은 동일하다. */}
    <SimpleContext.Provider value={{str:'Provider의 초기값', num:myNumber}}>
    <div className="App">
      <h3>useContext 적용 및 Provider 래핑</h3>
      <CompContext1b />
    </div>  
    </SimpleContext.Provider>
  </>); 
}

export default App;
