import './App.css';
import {useState, useReducer} from 'react';

const Student = ({name, dispatch, id, isHere}) => {
  return (<>
    <div>
      <span style={{}}
        onClick={() => {
          alert('출석처리');
        }}>{name}</span>
      <button onClick={() => {
        alert('삭제');
      }}>삭제</button>
    </div>
  </>);
}

const reducer = (state, action) => {
  switch(action.type){
    case 'add':
      const name = action.param.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false,
      }
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      }
    case 'delete':
      return {
        
      }
    case 'mark':
      return {
        
      }
    default:
  }
}

const initialState = {
  count :1,
  students : [
    {
      id: Date.now(), name: '김철수', isHere: false,
    },
  ],
}

function App() {
  const [name, setName] = useState('');
  const [studentInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <p>총학생수 : {studentInfo.count}</p>
      <input type="text" placeholder='이름을입력하세요' 
        value={name} onChange={(e) => { 
          setName(e.target.value)
        }} />
      <button onClick={() => {
        dispatch({type:'add', param:{name}});
      }}>추가</button>
      {
        studentInfo.students.map((student) => {
          return <Student key={student.id} name={student.name} 
            dispatch={dispatch} id={student.id} 
            isHere={student.isHere} />
        })
      }
    </div>
  );
}

export default App;

