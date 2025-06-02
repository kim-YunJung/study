import './App.css';

/** 컴포넌트 만들기
: React에서는 함수형 컴포넌트와 클래스형 컴포넌트를 사용할 수 있다.
초기버전에서는 클래스형만 사용했었지만, React Hook(훅)이 출시된
16.8버전 이후에는 함수형을 기본으로 사용하고 있다.
형식]
  1.일반함수
    function 컴포넌트명(){
      return(
        렌더링할 UI를 JSX로 작성
      );
    }
  2.화살표함수
    let 컴포넌트명 = () => {
      return (
        렌더링할 UI를 JSX로 작성
      );
    }

위에서 만든 컴포넌트를 적용할때는 HTML태그와 같은 형태로 사용한다.
<컴포넌트명/> 혹은 <컴포넌트명></컴포넌트명> 과 같이 반드시
종료태그가 함께 기술되어야 한다.
*/
function MyBody(){
  return (
  <>
    <h2>React-기본</h2>    
    <ol>
        <li>프론트앤드</li>
        <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Javascript</li>
            <li>jQuery</li>
        </ul>
        <li>백앤드</li>
        <ul>
            <li>Java</li>
            <li>Oracle</li>
            <li>JSP</li>
            <li>Spring Boot</li>
        </ul>
    </ol>
  </>    
  );
}

/** React에서 최상위 컴포넌트가 App이다. 해당 컴포넌트 하위에
자식 컴포넌트를 추가하면서 UI를 구성하게 된다. 
 */
function App() {
  return (
    // className속성은 HTML에서 사용하는 class속성이라 생각하면
    //된다. JS에는 이미 class라는 예약어가 있으므로 사용시
    //Warning이 발생된다. 
    <div className="App">
      <MyBody></MyBody>
    </div>
  );
}

export default App;
