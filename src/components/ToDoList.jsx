import { useState, useEffect, use } from "react";
import ToDoItem from "./ToDoItem";
import CompleteList from "./CompleteList";
import { getItem, setItem } from "../utils/localStorage";

/**
 * Component that represents a to-do list. Contains and maintains
 * a list of ToDoItem components
 */
function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const item = getItem("tasks");
    return item || [];
  });
  const [completedTasks, setCompleted] = useState(() => {
    const item = getItem("completedTasks");
    return item || [];
  });
  const [text, setText] = useState("");

  // Save state to localStorage everytime tasks/completedTasks changes
  useEffect(() => {
    setItem("tasks", tasks);
  }, [tasks]);
  useEffect(() => {
    setItem("completedTasks", completedTasks);
  }, [completedTasks]);

  /**
   * This function is called everytime the value inside the text field
   * is updated. It will update the value of text using setText
   */
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  /**
   * This function is called everytime the text field is submitted
   * or whenever the 'Create Task' button is pressed
   */
  const createTask = (e) => {
    e.preventDefault();
    setTasks((currTasks) => [...currTasks, text]);
    // Reset the text field
    setText("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completeTask = (task, index) => {
    // Add task to completed tasks
    setCompleted((currTasks) => [task, ...currTasks]);
    // Remove task from tasks
    deleteTask(index);
  };

  const uncompleteTask = (task, index) => {
    // Add task to tasks
    setTasks((currTasks) => [...currTasks, task]);
    // Remove task from completed tasks
    deleteCompleteTask(index);
  };

  const deleteCompleteTask = (index) => {
    const updatedTasks = completedTasks.filter((_, i) => i !== index);
    setCompleted(updatedTasks);
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  return (
    <>
      <div className="todo-header">
        <h2>Grocery List</h2>
      </div>
      <div className="add-task">
        <form onSubmit={createTask}>
          <input
            className="text-field"
            type="text"
            placeholder="Type here..."
            value={text}
            maxLength="30"
            onChange={handleTextChange}
          />
          <button className="create-button">Create Task</button>
        </form>
      </div>
      <ol className="task-list">
        <h3 className="task-list-header">Tasks</h3>
        {tasks.map((task, idx) => (
          <ToDoItem
            key={idx}
            title={task}
            onDelete={() => deleteTask(idx)}
            onComplete={() => completeTask(task, idx)}
            onMoveUp={() => moveTaskUp(idx)}
            onMoveDown={() => moveTaskDown(idx)}
          />
        ))}
      </ol>
      <CompleteList
        tasks={completedTasks}
        onDelete={deleteCompleteTask}
        onUncomplete={uncompleteTask}
      />
    </>
  );
}

export default ToDoList;
