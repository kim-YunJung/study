import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import api from "./utils/api"

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const response = await api.get('/tasks');

    //console.log('res ', response);

    setTodoList(response.data.data);
  }

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {task : todoValue, isComplete : false});

      if(response.status === 200){
        console.log('성공');
        
      }else{
        throw new Error('not be added');
      }

      getTasks();
      setTodoValue('');
    } catch (error) {
      console.log('post error >>> ', error);
    }
  }

  const deleteTask = async (_id) => {
    try {
      console.log(`delete`, _id);
  
      const response = await api.delete(`/tasks/${_id}`);

      if(response.status === 200){
        console.log('삭제 성공');
      }else{
        throw new Error('not be deleted');
      }

      getTasks();
      console.log('del res ', response);

    } catch (error) {
      console.log('delete error >>> ', error);
    }
  }
  const updateTask = async (_id) => {
    console.log(`updateTask id ${_id.id} -  isComplete ${_id.isComplete}`);
    
    try {
      const response = await api.put(`/tasks/${_id.id}`, {isComplete : _id.isComplete});

      console.log('update res ', response);
      getTasks();

    } catch (error) {
      console.log('update error >>> ', error);
    }
    
  }

  useEffect(()=>{
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event)=>setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask} updateTask={updateTask}/>
    </Container>
  );
}

export default App;
