import { useState } from "react";

function ToDoItem({
  id,
  title,
  onComplete,
  onDelete,
  onMoveUp,
  onMoveDown,
  onRename,
}) {
  const [inputValue, setInputValue] = useState(title);

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
      <div className="todo-item-title-container">
        <form onSubmit={() => onRename(id, inputValue)}>
          <input
            name="todo item name"
            className="todo-item-title"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="32"
            maxLength="32"
          />
        </form>
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
