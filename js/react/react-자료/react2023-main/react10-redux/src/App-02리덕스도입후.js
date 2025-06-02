import './App.css';
//리덕스 스토어를 생성하기 위한 패키지 임포트 
import { legacy_createStore as createStore } from 'redux';
/** 
리덕스를 적용할 컴포넌트를 감싸주는 Provider 컴포넌트와
리덕스 관련 Hook을 위한 패키지 임포트 
 */
import { Provider, useSelector, useDispatch } from 'react-redux';

/**
Redux(리덕스)란..??
  : React로 제작한 애플리케이션의 상태관리를 위한 라이브러리로 React와
  함께 사용되지만 써드파티로 제공되기 때문에 별도로 설치해야한다. 

Provider
  : 어떤 컴포넌트에 State를 제공할지를 결정하는 Wrapper컴포넌트로, 
  여기서는 App컴포넌트 하위의 <Left>, <Right> 컴포넌트를 감싸준다.
  그러면 하위 컴포넌트에서는 Store를 사용할 수 있다. 
*/

/**
Store 생성시 주입할 Reducer(리듀서)를 먼저 생성한다. 
리듀서는 Store에 있는 State를 변경하기 위한 코드를 실행부로 정의한다. 
파라미터는 2개가 필요하다. 
  currentState : 현재 State 값
  action : State 변경에 필요한 요청 파라미터. 2개 이상의 값을 전달할
    수 있어야 하므로 JSON객체를 주로 사용한다. 
 */
function reducer(currentState, action){

  /** 만약 State가 정의되지 않았다면 number를 1로 설정한다. 
  기존의 앱은 App 컴포넌트에서 useState 훅을 통해 생성했지만, 
  Redux가 도입되면 Store에서 State를 생성한 후 관리한다. 
   */
  if(currentState===undefined){
    return {
      number : 1,
    };
  }

  //현재 State의 복사본을 스프레드 연산자를 이용해서 생성한다. 
  const newState = { ...currentState };

  //요청(Action)을 분석한 후 상태(State)를 변경한다. 
  if(action.type==='PLUS'){
    newState.number ++;
  }

  //변경된 State를 반환한다. 
  return newState;
}
//앞에서 생성한 Reducer함수를 인자로 Store(스토어)를 생성한다. 
const store = createStore(reducer);

/**
Store가 도입되면 Right, Left에서 Props를 통해 전달하던 값이나 함수는
더이상 필요없다. 모든 State는 Store를 통해 관리/전달되기 때문이다. 
 */
function Right1(){
  return (
    <div>
      <h2>Right1</h2>
      <Right2></Right2>
    </div>
  );
}
function Right2(){
  return (
    <div>
      <h2>Right2</h2>
      <Right3></Right3>
    </div>
  );
}
/** 
useDispatch훅 
  : State값을 변경할 때 Reducer 함수를 호출하는 역할을 한다. 
 */
function Right3(){
  /**
  type을 PLUS로 설정하여 Store에 정의된 Reducer함수를 호출한다. 
  JSON객체로 생성하면되고, 이 객체를 Action이라고 한다. 
   */
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Right3</h2>
      <input type='button' value='+' onClick={()=>{
        dispatch({ type : 'PLUS' });
      }}></input>
    </div>
  );
}
const Left1 = () => {
  return (
    <div>
      <h2>Left1</h2>
      <Left2></Left2>
    </div>
  );
}
const Left2 = () => {
  return (
    <div>
      <h2>Left2</h2>
      <Left3></Left3>
    </div>
  );
}

/**
useSelector
  : State 값을 선택할때 사용되는 Hook 
 */
const Left3 = () => {
  /** 
  Store에 정의된 여러 State중 어떤값을 받을지 정의한 함수 f를
  useSelector 훅의 인자로 전달한다. 
   */
  // function f(state){
  //   return state.number;
  // }
  // const number = useSelector(f);

  /**
  위의 정의를 아래와 같이 변경할 수 있다. 화살표 함수로 변경한 후
  인수를 사용한다. 즉 여러개의 State중 이 컴포넌트에서 필요한 값을
  선택해야 하므로 간단한 커스텀 함수를 정의해서 사용해야한다. 
   */
  const number = useSelector((state)=>{ return state.number });
  return (
    <div>
      <h2>Left3 : {number}</h2>
    </div>
  );
}
function App() {

  //Store가 있으므로 App에서 State를 관리하지 않는다. 
  //const [number, setNumber] = useState(1);

  return (
    <div className="root">
      <h2>React - Redux </h2>
      <div id='grid'>
        {/* 하위 컴포넌트를 Wrapping(감싸기) 하면 Store를 사용할
        수 있게된다. 이때 앞에서 생성한 Store를 Props로 사용해야
        한다.  */}
        <Provider store={store}>
          {/* App이 State를 관리하지 않으므로 렌더링시 Props를 통해
          전달할 필요가 없어진다. 모든 데이터를 Store를 통해 가져다
          사용하면된다.  */}
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}
 
export default App;
