import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import { setItem, getItem, removeItem } from "./utils/localStorage";

function App() {
  const [toggleList, setToggleList] = useState(() => {
    const item = getItem("toggleList");
    return item || 0;
  });

  const [listObjects, setListObjects] = useState(() => {
    const item = getItem("listObjects");
    return item || [];
  });

  const [nextId, setNextId] = useState(() => {
    const item = getItem("nextId");
    return item || 0;
  });

  useEffect(() => {
    setItem("toggleList", toggleList);
  }, [toggleList]);

  useEffect(() => {
    setItem("listObjects", listObjects);
  }, [listObjects]);

  useEffect(() => {
    setItem("nextId", nextId);
  }, [nextId]);

  const makeNewList = () => {
    setListObjects((prev) => [...prev, { id: nextId, name: `List ${nextId}` }]);
    setToggleList(nextId);
    setNextId(nextId + 1);
  };

  const switchList = (id) => {
    // setToggleList to input
    setToggleList(id);
  };

  const renameList = (id, value) => {
    setListObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, name: value } : obj))
    );
  };

  const deleteList = (id) => {
    const temp = listObjects;
    setListObjects((prev) => prev.filter((item) => item.id !== id));
    // Reap child data from localStorage
    removeItem(`tasks-${id}`);
    removeItem(`completed-${id}`);
    // Toggle to first list or next list
    const newIdx = temp[0].id === id ? 1 : 0;
    setToggleList(listObjects[newIdx].id);
  };

  return (
    <>
      {listObjects.length === 0 ? (
        // Home Page
        <div className="home-page">
          <h2 className="welcome-header">Welcome!</h2>
          <h4 className="welcome-message">
            Click the 'Create List' button to get started
          </h4>
          <button className="create-list-btn" onClick={() => makeNewList()}>
            Create List
          </button>
        </div>
      ) : (
        <>
          <div className="list-nav-bar">
            {listObjects.map(({ id, name }) => (
              // List navigation bar logic
              <button
                key={id}
                onClick={() => switchList(id)}
                style={{
                  fontWeight: toggleList === id ? "bold" : "normal",
                  border: "2px solid black",
                  borderRadius: "8%",
                  padding: "5px",
                  marginRight: "1px",
                }}
              >
                <h4>{name}&nbsp;</h4>
              </button>
            ))}
            <button className="create-list-btn" onClick={() => makeNewList()}>
              <span>+</span>
            </button>
          </div>
          <div>
            {listObjects.map(
              // Conditional rendering logic
              ({ id, name }) =>
                id === toggleList && (
                  <ToDoList
                    key={id}
                    listId={id}
                    nameOfList={name}
                    onRename={renameList}
                    onDelete={deleteList}
                  />
                )
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
