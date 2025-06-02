import './App.css';
import { useRef, useEffect } from 'react';
 
function App() {
  const inputRef = useRef();

  useEffect(() => {
    console.log(inputRef);
    //화면의 랜더링이 끝난 후 포커스가 이동된다.
    inputRef.current.focus();
  }, []);

  const login = () => {
    //<input>의 DOM에 접근해서 value을 얻어온다.
    alert(`환영합니다. ${inputRef.current.value}`);
    //빈값을 할당한다. 
    inputRef.current.value = '';
    //포커스를 이동한다. 
    inputRef.current.focus();
  }

  return (
    <div className="App">
      {/* 앞에서 생성한 Ref를 input의 속성으로 추가한다. */}
      <input type='text' placeholder='아이디' ref={inputRef}/>
      <button onClick={login}>로그인</button>
    </div>
  );
}

export default App;
