import React from 'react';

function TodoItem({item, idx, onRemove}) {
    //console.log("todoItem ", item)

    return(
        <div className="todo-item">
            {item}

            <button onClick={() => onRemove(idx)}>삭제</button>
        </div>
    )
}

export default TodoItem;