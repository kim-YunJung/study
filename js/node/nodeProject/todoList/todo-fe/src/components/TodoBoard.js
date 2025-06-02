import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({todoList, deleteTask, updateTask}) => {
  return (
    <div>
      <h2>Todo List</h2>
      {/* <TodoItem/> will be here once we get the todoList */}
      {todoList.length > 0 ? 
        todoList.map((item)=><TodoItem item={item} key={item._id} deleteTask={deleteTask} updateTask={updateTask}/>)
        : <h2>There is no Item to show</h2> }      
    </div>
  );
};

export default TodoBoard;
