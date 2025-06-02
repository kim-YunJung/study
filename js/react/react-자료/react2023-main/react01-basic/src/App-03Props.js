import './App.css';

/**
props(프롭스)
: React에서 상태를 저장하기 위한 값으로 부모 컴포넌트가 자식 컴포넌트로
전달하는 읽기전용 데이터를 말한다. 전달시에는 HTML의 속성처럼 기술한다.
형식]
  <컴포넌트명 props속성명={속성값} />
  => 이렇게 전달하면 해당 컴포넌트에서는 "props.속성명"과 같이 사용할 
  수 있다. 
 */

/**  App컴포넌트에서 2개의 props를 전달하고 있으므로 매개변수 props로
한꺼번에 받은 후 사용할 수 있다.  */  
function MyBody(props){
  //빈 배열을 생성 
  const liTag1 = [], liTag2 = [];

  /** propData1로 전달된 프론트앤드 관련 데이터는 일반for문을 통해
  길이만큼 반복한다. */
  for(let i=0 ; i<props.propData1.length ; i++){
    //웹브라우저의 개발자도구에서 확인할 수 있는 로그를 출력 
    console.log("프론트앤드Data", props.propData1[i]);
    //각 루프에서 liTag1 배열에 새로운 항목을 하나씩 추가한다.
    liTag1.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }
  /** React에서는 게시판의 목록과 같이 반복적으로 출력되는 항목에
  중복되지 않는 key라는 이름의 prop을 쓰도록 권고하고 있다. 
  따라서 위와같이 배열의 인덱스나 중복되지 않는 번호를 부여해야한다. 
  그렇지 않으면 경고(Warning)이 발생된다. 
   */

  /** 백앤드 관련 props는 for ~ of문을 통해 반복 삽입한다. 
  이 for문은 배열의 크기만큼 자동으로 반복하는 기능이 있다. */
  let keyCnt=0;
  for(let row of props.propData2){
    liTag2.push(
      <li key={keyCnt++}>{row}</li>
    );
  }

  /** 앞에서 생성한 배열변수를 렌더링을 위한 return문장에 변수형태로
  삽입한다. */
  return (
    <ol>
      <li>프론트앤드</li>
      <ul>
        {liTag1}
      </ul>
      <li>백앤드</li>
      <ul>
        {liTag2}
      </ul>
    </ol>
  );
}
 
function App() {
  //props로 사용할 배열 변수 선언 
  const myData1 = ['HTML5', 'CSS3', 'Javascript', 'jQuery','dddd'];
  const myData2 = ['Java', 'Oracle', 'JSP', 'Spring Boot'];

  //UI를 렌더링 하는 부분
  return (
    <div className="App">
      <h2>React - Props 전달하기</h2>
      {/*  MyBody 컴포넌트로 2개의 props를 전달한다. 전달시에는 
      HTML의 속성과 같이 기술하면된다. 만약 변수가 아닌 일반적인
      문자열을 전달할때는 propData1="가나다"와 같이 더블쿼테이션을
      사용하면된다. */}
      <MyBody propData1={myData1} propData2={myData2}></MyBody>
    </div>
  );
}

export default App;
