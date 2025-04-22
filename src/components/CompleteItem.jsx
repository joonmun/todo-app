import { useState } from "react";

function CompleteItem({ title, onDelete, onUncomplete }) {
  return (
    <div className="complete-item">
      <div>
        <button className="uncomplete-btn" onClick={onUncomplete}>
          ↩
        </button>
      </div>
      <div className="complete-item-name">
        <h3>{title}</h3>
      </div>
      <div>
        <button className="delete-btn" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default CompleteItem;
