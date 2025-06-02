import './App.css';
import { useState } from 'react';

import { ThemeContext } from './context/ThemeContext';
import { SimpleContext } from './context/SimpleContext';

import Page from "./components/Page";

function App() {
  //상태 전환을 위한 state 생성
  const [isDark, setIsDark] = useState(false);

  /**  ThemeContext 생성 후 최상위 컴포넌트인 App을 Provider로 감싼다. 
  그러면 App 하위의 모든 컴포넌트는 useContext 훅을 통해 데이터를 받을 수 있다. 
  전달할 값은 value 라는 props를 사용한다. 
  */
  return (
  // <SimpleContext.Provider value={'Welcome 헝딜동'}>
    <ThemeContext.Provider value={{isDark, setIsDark}}>
      <div className="App">
        <Page></Page>
      </div>
    </ThemeContext.Provider>
  // </SimpleContext.Provider>
  );
 
}

export default App;
