import './App.css';
import {useState, useEffect} from 'react';

/**
useEffect : 함수형 컴포넌트에서 Lifecycle(생명주기)를 사용하기 위한 훅.
  컴포넌트 내부에서 발생하는 데이터 가져오기, 구독설정, 수동으로 DOM조작
  등과 같은 작업을 수행한다. 컴포넌트가 렌더링된 후 실행할 코드를 정의할때
  주로 사용한다. 
  형식]
    function 컴포넌트명(){
      useEffect(
        () => {
          컴포넌트가 렌더링 될때마다 실행될 코드;
          return () => {
            컴포넌트가 언마운트되거나 다음 useEffect가 실행되기 전에 
            실행될코드;
          }
        },
        [의존성배열]
      );
    }

    의존성배열 : 선택적으로 전달할 수 있는 배열. 이 배열에 포함된 값이
      변경될때만 useEffect가 실행된다. 만약 빈 배열을 전달하면 컴포넌트가
      마운트될때 한번만 실행되고, 의존성 배열을 생략하면 매 렌더링마다
      실행된다. 
*/

//컴포넌트 렌더링은 해당 함수가 호출된다는 의미를 가진다. 
function LifeGood(props){
  /*
  이 컴포넌트에서 제일 먼저 실행되는 코드. 즉 렌더링 전에 실행할 코드가
  있다면 이 부분에 작성하면된다.
  */
  console.log('#Life','LifeGood==>1.컴포넌트 실행(함수 호출)');

  //State생성 
  /**
  컴포넌트는 State의 상태가 변할때마다 새롭게 렌더링된다. 
  초기값은 Props로 전달된 1로 설정한다. 
   */
  var [myRandomNum, setMyRandomNum] = useState(props.initNumber);  
  var [myCount, setMyCount] = useState(1);
  
  /** 
  컴포넌트가 렌더링된 후 실행된다. 
  첫 실행에서는 마운트와 언마운트 순으로 실행된 후 마운트된다. 
  두번째 실행에서는 언마운트가 먼저 된 후 마운트된다.
   */
  useEffect(function(){    
    console.log('#Life','useEffect실행==>3.컴포넌트 마운트');
    return ()=>{
      console.log('#Life','useEffect실행==>4.컴포넌트 언마운트');
    }
  // }); //1.의존성배열 없음.
  //}, []); //2.의존성배열에 빈 배열을 할당.
  }, [myCount]); //3.의존성 배열에 State변수 할당.

  /** 
  의존성 배열 유무에 따른 실행 설명 
  1. 2개의 버튼을 누를때마다 useEffect가 실행된다. 
  2. 최초 실행에서만 useEffect가 실행되고, 그 이후에는 실행되지 않는다.
  3. myCount가 변경될때만 useEffect가 실행된다. 
   */

  /** 
  useEffect()가 먼저 선언되었지만 수명주기에서는 렌더링이 먼저 실행된다.
  즉 화면에 그림이 먼저 그려진다. 
   */
  console.log('#Life','return실행==>2.렌더링(return문))');
  return (
    <div>
      <h4>함수형 컴포넌트의 수명주기 함수</h4>
      {/* State 값 출력 부분 */}
      <p>난수 : {myRandomNum}</p>
      <p>카운트 : {myCount}</p>

      {/* 버튼을 누를때마다 0~1사이의 난수를 생성하여 State를 변경한다. */}
      <input type='button' value="난수생성" onClick={()=>{
        setMyRandomNum(Math.random());
      }}/>
      {/* 버튼을 누를때마다 1을 더한 후 State를 변경한다. */}
      <input type='button' value="카운트" onClick={()=>{
        setMyCount(myCount + 1);
      }}></input>
      {/* 위 2개의 버튼을 누를때마다 State가 변경되므로 렌더링이 지속적으로
      발생된다. */}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>React Hook - useEffect</h2>
      <LifeGood initNumber={1}></LifeGood>
    </div>
  );
}

export default App;