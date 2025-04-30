function CompleteItem({ title, onDelete, onUncomplete }) {
  return (
    <div className="complete-item">
      <div>
        <button className="uncomplete-btn" onClick={onUncomplete}>
          ↩
        </button>
      </div>
      <div className="complete-item-name">
        <del className="strikethrough-item">{title}</del>
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
