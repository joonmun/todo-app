import { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import CompleteList from "./CompleteList";
import { getItem, setItem } from "../utils/localStorage";

/**
 * Component that represents a to-do list. Contains and maintains
 * a list of ToDoItem components
 */
function ToDoList({ listId, nameOfList, onRename, onDelete }) {
  // Variables that each instance uses to render
  const uniqueTasksId = `tasks-${listId}`;
  const uniqueCompleteId = `completed-${listId}`;

  const [listName, setListName] = useState(`${nameOfList}`);

  const [tasks, setTasks] = useState(() => {
    const item = getItem(uniqueTasksId);
    return item || [];
  });

  const [completedTasks, setCompleted] = useState(() => {
    const item = getItem(uniqueCompleteId);
    return item || [];
  });

  const [text, setText] = useState("");

  // Save state to localStorage everytime tasks/completedTasks changes
  useEffect(() => {
    setItem(uniqueTasksId, tasks);
  }, [tasks, uniqueTasksId]);

  useEffect(() => {
    setItem(uniqueCompleteId, completedTasks);
  }, [completedTasks, uniqueCompleteId]);

  /**
   * This function is called everytime the text field is submitted
   * or whenever the 'Create Task' button is pressed
   */
  const createTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(),
      title: text,
    };
    setTasks((currTasks) => [...currTasks, newTask]);
    // Reset the text field
    setText("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const completeTask = (task) => {
    // Add task to completed tasks
    setCompleted((currTasks) => [task.title, ...currTasks]);
    // Remove task from tasks
    deleteTask(task.id);
  };

  const uncompleteTask = (task, index) => {
    // Generate new task object
    const newTask = {
      id: crypto.randomUUID(),
      title: task,
    };

    // Add task to tasks
    setTasks((currTasks) => [...currTasks, newTask]);
    // Remove task from completed tasks
    deleteCompleteTask(index);
  };

  const deleteCompleteTask = (index) => {
    const updatedTasks = completedTasks.filter((_, i) => i !== index);
    setCompleted(updatedTasks);
  };

  const moveTaskUp = (index) => {
    setTasks((prevTasks) => {
      if (index <= 0) return prevTasks;
      const updatedTasks = [...prevTasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      return updatedTasks;
    });
  };

  const moveTaskDown = (index) => {
    setTasks((prevTasks) => {
      if (index >= prevTasks.length - 1) return prevTasks;
      const updatedTasks = [...prevTasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      return updatedTasks;
    });
  };

  const renameTask = (index, value) => {
    setTasks((prev) =>
      prev.map((obj) => (obj.id === index ? { ...obj, title: value } : obj))
    );
  };

  return (
    <>
      <div className="todo-header">
        <form onSubmit={() => onRename(listId, listName)}>
          <input
            name="todo list name"
            className="todo-list-title"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            maxLength="32"
          />
        </form>
        <button className="delete-list-btn" onClick={() => onDelete(listId)}>
          🗑️
        </button>
      </div>
      <div className="add-task">
        <form onSubmit={createTask}>
          <input
            name="create task field"
            className="text-field"
            type="text"
            placeholder="Type here..."
            value={text}
            maxLength="32"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="create-button">Create Task</button>
        </form>
      </div>
      <ol className="task-list">
        <h3 className="task-list-header">Tasks</h3>
        {tasks.map((task, idx) => (
          <ToDoItem
            key={task.id}
            title={task.title}
            onDelete={() => deleteTask(task.id)}
            onComplete={() => completeTask(task)}
            onMoveUp={() => moveTaskUp(idx)}
            onMoveDown={() => moveTaskDown(idx)}
            onRename={renameTask}
            id={task.id}
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
