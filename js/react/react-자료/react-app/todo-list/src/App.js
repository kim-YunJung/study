/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import TodoBoard from './compontens/TodoBoard';

/* 
1. 인풋창이 있고 버튼이 있다.
2. 인풋창에 값을 입력하고 버튼을 클릭, 아이템이 추가된다.
3. 아이템 삭제 버튼을 누르면 삭제가 가능하다.
*/
function App() {
  //input에 입력된 내용
  const [inputValue, setInputValue] = useState('');

  //추가된 내용들을 배열로 받는다.
  const [todoList, setTodoList] = useState([]);

  //button누를 때 마다 내용이 추가
  const addItem = () => {
    //console.log("add > ", inputValue);

    //기존의 내용은 유지하되 새로운 내용을 추가해준다.
    setTodoList([...todoList, inputValue])
    //입력 후 텍스트를 비워준다.
    setInputValue('');
  };

  const addEnter = e => {
    if (e.key === 'Enter') {
      addItem(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onRemove = (id) => {
    setTodoList(todoList.filter((item, idx) => idx !== id));    
  }

  return (
    <div className="App">
      <input value={inputValue} type='text' 
      onChange={(event)=>{
        setInputValue(event.target.value);
        //console.log("event > ", event.target.value);
      }}
      
      onKeyDown={addEnter}
      />
      <button onClick={addItem}>추가</button>

      <TodoBoard todoList={todoList} onRemove={onRemove} />
    </div>
  );
}

export default App;
