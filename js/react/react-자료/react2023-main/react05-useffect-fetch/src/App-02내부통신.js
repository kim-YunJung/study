import './App.css';
import {useState, useEffect} from 'react';

//목록을 출력하는 컴포넌트 
const GlobalTop = (props) => {
  //컴포넌트가 마운트될때 제일 먼저 실행되는 코드 
  console.log('#Life','GlobalTop==>1.컴포넌트실행');
  //State생성. myList의 초기값은 빈 배열로 설정.
  var [myList, setMyList] = useState([]); 

  //return문이 실행된 후, 즉 렌더링이 완료된후 실행되는 LifeCycle훅 
  useEffect(function(){    
    console.log('#Life','LifeGood==>3.useEffect실행1');
    /** 
    이 컴포넌트가 렌더링된 후 내부에 있는 json파일을 get방식으로 요청한다. 
     */
    fetch('./json/myData.json')
      .then((result)=>{
        /** 
        요청에 성공하면 json파일의 데이터가 매개변수로 콜백된다. 콜백데이터는
        Text형식이므로 JSON형식으로 변환 후 반환한다. 
         */
        return result.json();
      })
      .then((json)=>{
        /**
         첫번째 then절에서 반환해준 값은 두번째 then절로 넘어온다. 
         이 값을 받은 후 State를 변경한다. 
         */
        console.log(json);      
        //State가 변경되면 화면은 새롭게 렌더링된다. 
        setMyList(json);
      });
    return ()=>{
      /** 
      컴포넌트가 언마운트될때 필요한 코드가 있다면 여기에 작성한다. 
       */
      console.log('#Life','LifeGood==>4.useEffect실행2');
    }
  }, []);
  /**
  의존성 배열로 빈배열을 추가해놓는다. 이렇게 하면 최초 한번만 실행되고
  그 이상 실행되지 않는다. 
  만약 의존성 배열을 생략하면 무한히 로딩되는 현상이 발생된다. 
   */

  var listTag = [];
  //State로 선언된 배열변수의 크기만큼 반복
  for(var i=0 ; i<myList.length ; i++){    
    var data = myList[i];
    console.log('데이터', data.id, data.num);
    //각 항목을 <li>태그로 만든 후 순서대로 추가한다. 
    listTag.push(
      /* <li>태그와 같이 반복되는 요소에는 중복되지 않는 key prop을 
      지정해야한다. */
      <li key={data.id}>
        {/* data-id 속성에 설정된 값은 이벤트 객체의 target속성 하위의 
        dataset.id를 통해 얻어올 수 있다. 이부분에 게시물의 일련번호인
        num을 설정하고 있다.  */}
        <a href={data.id} data-id={data.num} onClick={(e)=>{
          e.preventDefault();
          console.log("이벤트객체", e);
          /* Props로 전달된 함수를 호출한다. 이때 선택한 게시물의 num값을
          부모 컴포넌트로 전달한다.  */
          props.myLinkClick(e.target.dataset.id);
        }}>{data.id}</a>
      </li>
    );
  }
  
  console.log('#Life','LifeGood==>2.return실행(render와동일)');  
  return (
    <nav>
      <ul>
        {listTag}
      </ul>
    </nav>
  );
}

//Props로 전달된 객체의 값을 화면에 출력하는 컴포넌트 
const ContentBody = (props)=>{
  return (
    <div>
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>num : {props.myResult.num}</li>
        <li>id : {props.myResult.id}</li>
        <li>cell : {props.myResult.cell}</li>
        <li>description : {props.myResult.description}</li>
      </ul>        
    </div>
  );
}

function App() {  
  //State생성. dto.json의 내용을 저장할 것이므로 빈 객체를 초기값으로 지정. 
  var [myResult, setMyResult] = useState({});  

  return (
    <div className="App">
      <h2>React - 내부서버통신</h2>
      {/* 클릭시 내부에 저장된 dto.json파일을 get방식으로 요청한 후 콜백 
      데이터를 받을수있는 기능의 함수를 Props로 전달한다. */}
      <GlobalTop myLinkClick={(num)=>{
        //선택한 게시물의 일련번호가 매개변수로 전달 
        console.log('클릭', num);
        //num에 해당하는 dto파일을 요청 
        fetch('./json/dto'+num+'.json')
          .then((result)=>{
            /**  요청 성공시 콜백데이터가 첫번째 then절로 반환된다. */
            console.log('결과1', result);
            return result.json();
          })
          .then((json)=>{
            /* JSON형식으로 변환된 데이터가 두번째 then절로 넘어오면 
            이 값으로 State를 변경한다. */
            console.log('결과2', json);
            setMyResult(json);
          });
      }}></GlobalTop>
      {/* 상세내용을 출력하는 컴포넌트로 초기값은 빈 객체이므로 아무 내용도 
      출력되지 않는다. 통신이 끝난 후 해당 내용을 출력한다. */}
      <ContentBody myResult={myResult}></ContentBody>
    </div>
  );
}

export default App;
