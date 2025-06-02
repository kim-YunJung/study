//App컴포넌트에서 사용하는 스타일시트 
import './App.css';
//state를 관리하기 위한 useState 훅 임포트 
import {useState} from 'react';

/** 각각의 컴포넌트를 js 혹은 jsx 파일로 생성한 후 모듈화한다. 
import 시 저장된 경로와 컴포넌트명까지만 기술하고 확장자는 생략한다.
 */
import ListComponent from './component/ListComponent';
import ViewComponent from './component/ViewComponent';
import WriteComponent from './component/WriteComponent';

function App() {
  /** state를 정의한 후 초기값은 list를 할당한다. 이 state를 변경할 수 
  있는 함수는 setMode()로 정의한다. */
  const [mode, setMode] = useState('list');

  //각 컴포넌트를 저장하기 위한 변수 
  let contents = '';
  
  /**  각 mode에 따라 컴포넌트를 변수에 할당한다. 
  3가지 mode에서 공통으로 props를 통해 state를 변경할 수 있는 기능의 
  화살표 함수를 정의하고 있다. 자식 컴포넌트에서는 changeMode()를 호출해서
  해당 기능을 실행할 수 있다. */
  if(mode==="view"){
    contents = <ViewComponent changeMode={(pmode)=>{setMode(pmode)}}>
      </ViewComponent>;
  }
  else if(mode==="write"){
    contents = <WriteComponent changeMode={(pmode)=>{setMode(pmode)}}>
      </WriteComponent>;
  }
  else {
    contents = <ListComponent changeMode={(pmode)=>{setMode(pmode)}}>
      </ListComponent>;
  }
  
  //최종적으로 컴포넌트를 렌더링 한다. 
  return (
    <div className="App">
      <h2>React - 모듈화</h2>
      {contents}
    </div>
  );
}

export default App;