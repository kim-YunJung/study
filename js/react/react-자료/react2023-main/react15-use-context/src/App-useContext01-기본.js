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

    <div className="App">
      <h3>Props를 통한 데이터 전달</h3>
      <CompState1 propData={'Props로 전달되는 데이터'} myNumber={myNumber} />
    </div>  

    <div className="App">
      <h3>useContext 적용</h3>
      <CompContext1a />
    </div>  

    <SimpleContext.Provider value={{str:'Provider의 초기값', num:myNumber}}>
    <div className="App">
      <h3>useContext 적용 및 Provider 래핑</h3>
      <CompContext1b />
    </div>  
    </SimpleContext.Provider>
  </>); 
}

export default App;

