import { useState } from "react";
import CompleteItem from "./CompleteItem";

// This component displays a list of completed tasks
function CompleteList({ tasks, onDelete, onUncomplete }) {
  return (
    <ol className="complete-list">
      <h3 className="completed-tasks-header">Completed Tasks</h3>
      {tasks.map((task, idx) => (
        <CompleteItem
          key={idx}
          title={task}
          onDelete={() => onDelete(idx)}
          onUncomplete={() => onUncomplete(task, idx)}
        ></CompleteItem>
      ))}
    </ol>
  );
}

export default CompleteList;
