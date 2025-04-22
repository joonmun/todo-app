import { useState } from "react";

function ToDoItem({ title, onComplete, onDelete, onMoveUp, onMoveDown }) {
  return (
    <div className="todo-item">
      <div className="left-buttons">
        <button className="move-up-btn" onClick={onMoveUp}>
          🔼
        </button>
        <button className="move-down-btn" onClick={onMoveDown}>
          🔽
        </button>
      </div>
      <div className="todo-item-name">
        <h3>{title}</h3>
      </div>
      <div className="right-buttons">
        <button className="complete-btn" onClick={onComplete}>
          ✅
        </button>
        <button className="delete-btn" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default ToDoItem;
