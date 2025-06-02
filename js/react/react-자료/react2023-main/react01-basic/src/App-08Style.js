import './App.css';

/**
JSX에서 스타일을 적용하는 방법
: JSX는 HTML이 아닌 유사HTML 이므로 style을 기존의 방법대로 적용할 수
없다. 
-class 속성은 className으로 변경해야한다. JS에서는 이미 class를
예약어로 사용하고 있기 때문이다. 
-id속성은 그대로 사용할 수 있다. 
-style속성을 통해 부여할때는 컬리브레이스(콧수염괄호)를 사용하여
JSON 객체 형태로 기술해야 한다. 
-외부 CSS 파일에 스타일을 정의한 후 적용할 수 있다. 
 */
function App() {
  //JSON 객체로 스타일을 정의 
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Verdana"
  };
  return (
    <div className="App">
      <h2>React - Style지정하기</h2>
      <ol>
        {/* style 속성을 직접 부여할때는 아래와 같이 컬리브레이스를
        사용한다. */}
        <li style={{color : "red"}}>프론트앤드</li>
          {/* JSON객체로 정의한 속성을 부여한다. */}
          <ul style={mystyle}>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Javascript</li>
            <li>jQuery</li>
          </ul>
        {/* App.css에 정의한 스타일시트 적용 */}
        <li className='backEnd'>백앤드</li>
          <ul>
            <li id='backEndSub'>Java</li>
            {/* class 속성을 사용하면 에러가 발생하진 않으나 경고가 
            뜨므로 React의 권고사항대로 className을 사용하도록 한다. */}
            <li class='warnings'>Oracle</li>
            <li>JSP</li>
            <li>Spring Boot</li>
          </ul>
      </ol>
    </div>
  );
}

export default App;
