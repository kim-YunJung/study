import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LogoutButton from "../components/LogoutButton";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const response = await api.get('/tasks');

    setTodoList(response.data.data);
  }

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {task : todoValue, isComplete : false});

      if(response.status === 200){
        console.log('성공');
        getTasks();
      }else{
        throw new Error('not be added');
      }

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
        getTasks();
      }else{
        throw new Error('not be deleted');
      }

      console.log('del res ', response);

    } catch (error) {
      console.log('delete error >>> ', error);
    }
  }
  const updateTask = async (_id) => {    
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
      <Row className="add-item">
        <LogoutButton />
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTask} className="button-add">
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteItem={deleteTask}
        updateTask={updateTask}
      />
    </Container>
  );
};

export default TodoPage;
